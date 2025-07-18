// server.js - Express backend
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load healthcare knowledge base
let healthcareDB = {};
try {
  const dbPath = path.join(__dirname, 'healthcare-db.json');
  healthcareDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  console.log('Healthcare database loaded successfully');
} catch (error) {
  console.error('Error loading healthcare database:', error);
  healthcareDB = { providers: [], hospitals: [], urgent_care: [], specialties: [] };
}

// Provider search functionality
const searchProviders = (query) => {
  const { specialty, location, insurance, language, accepting_new } = query;
  
  let results = healthcareDB.providers || [];
  
  // Filter by specialty
  if (specialty) {
    results = results.filter(provider => 
      provider.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
      (provider.subspecialties && provider.subspecialties.some(sub => 
        sub.toLowerCase().includes(specialty.toLowerCase())
      ))
    );
  }
  
  // Filter by location (city or state)
  if (location) {
    results = results.filter(provider => 
      provider.location.city.toLowerCase().includes(location.toLowerCase()) ||
      provider.location.state.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  // Filter by insurance
  if (insurance) {
    results = results.filter(provider => 
      provider.insurance_accepted.some(ins => 
        ins.toLowerCase().includes(insurance.toLowerCase())
      )
    );
  }
  
  // Filter by language
  if (language) {
    results = results.filter(provider => 
      provider.languages.some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  }
  
  // Filter by accepting new patients
  if (accepting_new === true) {
    results = results.filter(provider => provider.accepting_new_patients === true);
  }
  
  return results.slice(0, 5); // Return top 5 results
};

// Hospital search functionality
const searchHospitals = (query) => {
  const { service, location, emergency } = query;
  
  let results = healthcareDB.hospitals || [];
  
  if (service) {
    results = results.filter(hospital =>
      hospital.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
    );
  }
  
  if (location) {
    results = results.filter(hospital =>
      hospital.location.city.toLowerCase().includes(location.toLowerCase()) ||
      hospital.location.state.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (emergency) {
    results = results.filter(hospital => hospital.emergency_room === true);
  }
  
  return results.slice(0, 3);
};

// Enhanced AI prompt with search capabilities
const createEnhancedPrompt = (userMessage, searchResults = null) => {
  let searchContext = '';
  
  if (searchResults) {
    searchContext = `\n\nRELEVANT PROVIDER/HOSPITAL SEARCH RESULTS:
${JSON.stringify(searchResults, null, 2)}

Use this information to provide specific recommendations with names, locations, and contact details.`;
  }
  
  return `You are HealthNavigator AI, a specialized healthcare system navigation assistant. You help people understand and navigate the complex US healthcare system.

CORE EXPERTISE AREAS:
1. Insurance & Benefits Navigation
2. Healthcare Provider Search & Selection (with access to provider database)
3. Appointment Scheduling & Preparation
4. Mental Health Resources & Access
5. Medication Management & Pharmacy Navigation
6. Medical Billing & Claims Understanding
7. Care Coordination Between Providers

PROVIDER SEARCH CAPABILITIES:
When users ask to find doctors, specialists, or hospitals, you have access to a comprehensive database of healthcare providers. You can search by:
- Specialty (cardiology, dermatology, mental health, etc.)
- Location (city, state)
- Insurance accepted
- Languages spoken
- Availability for new patients

RESPONSE GUIDELINES:
• Be conversational, warm, and empathetic
• Provide specific, actionable steps
• Use bullet points and clear formatting
• Include practical tips and insider knowledge
• When recommending providers, include full contact details
• Always remind users this is navigation help, not medical advice
• Focus on empowering users to advocate for themselves

AVOID:
• Medical diagnosis or treatment advice
• Emergency medical guidance (redirect to appropriate resources)
• Legal advice about medical issues

RESPONSE FORMAT:
• Start with empathy/acknowledgment
• Provide 3-5 specific action steps
• Include helpful tips or "insider knowledge"
• When providers are found, format them clearly with contact info
• End with a follow-up question or offer for more help

USER QUESTION: "${userMessage}"${searchContext}

Respond as HealthNavigator AI with helpful, specific guidance:`;
};

// Analyze user message to determine if search is needed
const analyzeUserIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Provider search intent
  if (lowerMessage.includes('find') && (
    lowerMessage.includes('doctor') || 
    lowerMessage.includes('specialist') ||
    lowerMessage.includes('therapist') ||
    lowerMessage.includes('psychiatrist') ||
    lowerMessage.includes('cardiologist') ||
    lowerMessage.includes('dermatologist') ||
    lowerMessage.includes('orthopedist') ||
    lowerMessage.includes('primary care')
  )) {
    return { type: 'provider_search', message };
  }
  
  // Hospital search intent
  if (lowerMessage.includes('hospital') || lowerMessage.includes('emergency room') || lowerMessage.includes('urgent care')) {
    return { type: 'hospital_search', message };
  }
  
  return { type: 'general', message };
};

// Extract search parameters from user message
const extractSearchParams = (message, type) => {
  const lowerMessage = message.toLowerCase();
  const params = {};
  
  // Extract specialty
  const specialties = ['cardiology', 'dermatology', 'mental health', 'orthopedics', 'primary care', 'therapy', 'psychiatrist'];
  specialties.forEach(specialty => {
    if (lowerMessage.includes(specialty)) {
      params.specialty = specialty;
    }
  });
  
  // Extract location indicators
  const cities = ['san francisco', 'los angeles', 'san diego', 'san jose'];
  cities.forEach(city => {
    if (lowerMessage.includes(city)) {
      params.location = city;
    }
  });
  
  // Extract insurance
  const insurances = ['blue cross', 'aetna', 'united', 'kaiser', 'cigna', 'anthem'];
  insurances.forEach(insurance => {
    if (lowerMessage.includes(insurance)) {
      params.insurance = insurance;
    }
  });
  
  // Check for new patient requirement
  if (lowerMessage.includes('accepting new') || lowerMessage.includes('new patient')) {
    params.accepting_new = true;
  }
  
  return params;
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    database_loaded: Object.keys(healthcareDB).length > 0,
    providers_count: healthcareDB.providers?.length || 0,
    hospitals_count: healthcareDB.hospitals?.length || 0
  });
});

// AI chat endpoint with search integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Analyze user intent and perform search if needed
    const intent = analyzeUserIntent(message);
    let searchResults = null;
    
    if (intent.type === 'provider_search') {
      const searchParams = extractSearchParams(message, 'provider');
      searchResults = {
        type: 'providers',
        results: searchProviders(searchParams),
        query: searchParams
      };
    } else if (intent.type === 'hospital_search') {
      const searchParams = extractSearchParams(message, 'hospital');
      searchResults = {
        type: 'hospitals', 
        results: searchHospitals(searchParams),
        query: searchParams
      };
    }

    const enhancedPrompt = createEnhancedPrompt(message, searchResults);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API Error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get AI response',
        details: errorData 
      });
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    res.json({ 
      response: aiResponse,
      search_performed: searchResults !== null,
      search_results: searchResults
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Search endpoint (optional - for direct searches)
app.post('/api/search', (req, res) => {
  try {
    const { type, query } = req.body;
    
    let results = [];
    
    if (type === 'providers') {
      results = searchProviders(query);
    } else if (type === 'hospitals') {
      results = searchHospitals(query);
    }
    
    res.json({ results, query });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Providers loaded: ${healthcareDB.providers?.length || 0}`);
  console.log(`Hospitals loaded: ${healthcareDB.hospitals?.length || 0}`);
});

module.exports = app;