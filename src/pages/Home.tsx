import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, FileText, Pen,  X, Check, RotateCcw, ChevronLeft, ChevronRight,  Send, Calendar, User, Building, Type, Link, Eye} from 'lucide-react';

// Supabase Configuration
const SUPABASE_URL = 'https://gaxzaskncmqbtpimzypw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheHphc2tuY21xYnRwaW16eXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3OTI2MjYsImV4cCI6MjA2ODM2ODYyNn0.D2tLT4edbdVT7Sdu_4gpS8sa-tsdFsXBmJPbGlUp0Yk';

// Debug logging
console.log('API Key length:', SUPABASE_ANON_KEY.length);
console.log('API Key starts with:', SUPABASE_ANON_KEY.substring(0, 20));
console.log('Is API key configured?', SUPABASE_ANON_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheHphc2tuY21xYnRwaW16eXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3OTI2MjYsImV4cCI6MjA2ODM2ODYyNn0.D2tLT4edbdVT7Sdu_4gpS8sa-tsdFsXBmJPbGlUp0Yk');

// Simple Supabase client using standard fetch
class SupabaseClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(url: string, key: string) {
    this.baseUrl = url;
    this.apiKey = key;
  }

  private async request(method: string, path: string, body?: any) {
    const response = await fetch(`${this.baseUrl}/rest/v1${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': method === 'POST' ? 'return=representation' : method === 'PATCH' ? 'return=minimal' : ''
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status} ${response.statusText}`);
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) return null;
    
    try {
      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }

  async upsert(table: string, data: any) {
    const response = await fetch(`${this.baseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Upsert error: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  }

  async select(table: string, query: string = '*') {
    return this.request('GET', `/${table}?select=${query}`);
  }

  async insert(table: string, data: any) {
    return this.request('POST', `/${table}`, data);
  }

  async update(table: string, data: any, filter: string) {
    return this.request('PATCH', `/${table}?${filter}`, data);
  }

  async uploadFile(bucket: string, path: string, file: File) {
    const response = await fetch(`${this.baseUrl}/storage/v1/object/${bucket}/${path}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'apikey': this.apiKey,
      },
      body: file
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  getPublicUrl(bucket: string, path: string) {
    return `${this.baseUrl}/storage/v1/object/public/${bucket}/${path}`;
  }
}

// Only create client if API key is configured
const isApiKeyConfigured = SUPABASE_ANON_KEY.length > 50 && SUPABASE_ANON_KEY.startsWith('eyJ');
console.log('Creating Supabase client...', { 
  isApiKeyConfigured, 
  hasApiKey: !!SUPABASE_ANON_KEY,
  keyLength: SUPABASE_ANON_KEY.length,
  startsCorrectly: SUPABASE_ANON_KEY.startsWith('eyJ')
});

const supabase = isApiKeyConfigured 
  ? new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

console.log('Supabase client created:', !!supabase);

interface DocumentField {
  id: string;
  type: 'signature' | 'text' | 'date' | 'name' | 'company';
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
  label: string;
  required: boolean;
  value?: string;
  signatureData?: string;
}

interface Document {
  id: string;
  name: string;
  fields: DocumentField[];
  status: 'draft' | 'sent' | 'completed';
  clientLink?: string;
  pdfUrl?: string;
  signedPdfUrl?: string;
  created_at?: string;
  updated_at?: string;
}

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}

interface TextInputModalProps {
  isOpen: boolean;
  field: DocumentField | null;
  onClose: () => void;
  onSave: (value: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    
    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Create Your Signature</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Draw your signature in the box below:</p>
          <canvas
            ref={canvasRef}
            width={452}
            height={150}
            className="border-2 border-gray-200 rounded-lg cursor-crosshair bg-gray-50"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw size={16} />
            Clear
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveSignature}
              disabled={!hasDrawn}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              <Check size={16} />
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextInputModal: React.FC<TextInputModalProps> = ({ isOpen, field, onClose, onSave }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (field?.value) {
      setValue(field.value);
    } else {
      setValue('');
    }
  }, [field]);

  const handleSave = () => {
    onSave(value);
    setValue('');
  };

  if (!isOpen || !field) return null;

  const getPlaceholder = () => {
    switch (field.type) {
      case 'name': return 'Enter your full name';
      case 'company': return 'Enter your company name';
      case 'date': return 'MM/DD/YYYY';
      case 'text': return 'Enter text';
      default: return 'Enter value';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">{field.label}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          {field.type === 'date' ? (
            <input
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!value.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Check size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AmplifirmDocumentPlatform() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // App state
  const [mode, setMode] = useState<'admin' | 'client'>('admin');
  const [loading, setLoading] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Document state
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  console.log(documents);
  
  // PDF rendering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageScale] = useState(1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Field placement and manipulation
  const [selectedFieldType, setSelectedFieldType] = useState<DocumentField['type'] | null>(null);
  const [placingField, setPlacingField] = useState(false);
  const [selectedField, setSelectedField] = useState<DocumentField | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fieldSettings, setFieldSettings] = useState({
    fontSize: 12,
    signatureSize: { width: 200, height: 60 },
    textSize: { width: 200, height: 40 }
  });
  
  // Modals
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [activeField, setActiveField] = useState<DocumentField | null>(null);

  // Debounce utility function
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'AMPLIFIRMCONTRACTSOFTWARE' && loginForm.password === 'MASHALLAH123') {
      setIsAuthenticated(true);
      setLoginError('');
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentDocument(null);
    setMode('admin');
  };

  // Test Supabase connection
  

  // Save document to Supabase
  const saveDocumentToDatabase = async (doc: Document, skipLocalUpdate = false) => {
    if (!supabase) {
      console.log('Supabase not configured, working in local mode');
      if (!skipLocalUpdate) {
        setDocuments(prev => [...prev.filter(d => d.id !== doc.id), doc]);
      }
      return;
    }

    try {
      console.log('Saving document to Supabase:', doc.id);
      
      const docData = {
        id: doc.id,
        name: doc.name,
        status: doc.status,
        fields: JSON.stringify(doc.fields),
        pdf_url: doc.pdfUrl || null,
        signed_pdf_url: doc.signedPdfUrl || null,
        client_link: doc.clientLink || null,
        updated_at: new Date().toISOString()
      };

      console.log('Document data to save:', docData);
      
      // Use upsert for reliable save
      await supabase.upsert('documents', docData);
      console.log('Document saved successfully with upsert');
      
      if (!skipLocalUpdate) {
        setDocuments(prev => [...prev.filter(d => d.id !== doc.id), doc]);
      }
    } catch (err) {
      console.error('Error saving document:', err);
      // Still update local state
      if (!skipLocalUpdate) {
        setDocuments(prev => [...prev.filter(d => d.id !== doc.id), doc]);
      }
    }
  };

  // Auto-save function with debouncing
  const autoSaveDocument = useCallback(
    debounce(async (doc: Document) => {
      if (doc) {
        console.log('Auto-saving document changes...');
        setAutoSaving(true);
        try {
          await saveDocumentToDatabase(doc, true);
          setLastSaved(new Date());
          console.log('Auto-save completed');
        } catch (err) {
          console.error('Auto-save failed:', err);
        } finally {
          setAutoSaving(false);
        }
      }
    }, 2000),
    []
  );

  // Load document from Supabase
  const loadDocumentFromDatabase = async (docId: string) => {
    if (!supabase) {
      console.log('Supabase not configured, cannot load document from database');
      return null;
    }

    try {
      setLoading(true);
      console.log('Loading document from Supabase:', docId);
      
      const docs = await supabase.select('documents', '*');
      console.log('Documents from database:', docs);
      
      const doc = docs.find((d: any) => d.id === docId);
      
      if (doc) {
        console.log('Found document:', doc);
        const loadedDoc: Document = {
          id: doc.id,
          name: doc.name,
          status: doc.status,
          fields: JSON.parse(doc.fields || '[]'),
          pdfUrl: doc.pdf_url,
          signedPdfUrl: doc.signed_pdf_url,
          clientLink: doc.client_link
        };
        
        setCurrentDocument(loadedDoc);
        
        // Load PDF from URL
        if (doc.pdf_url) {
          const response = await fetch(doc.pdf_url);
          const arrayBuffer = await response.arrayBuffer();
          
          // @ts-ignore
          const loadingTask = window.pdfjsLib.getDocument(arrayBuffer);
          const pdf = await loadingTask.promise;
          
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setCurrentPage(1);
        }
        
        return loadedDoc;
      } else {
        console.log('Document not found in database');
      }
    } catch (err) {
      console.error('Error loading document:', err);
      setError('Failed to load document from database.');
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Client Functions
  const loadClientDocument = async (docId: string) => {
    const doc = await loadDocumentFromDatabase(docId);
    if (doc) {
      setMode('client');
    }
  };

  // Load PDF.js and PDF-lib
  useEffect(() => {
    // Load PDF.js
    const pdfScript = document.createElement('script');
    pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    pdfScript.onload = () => {
      // @ts-ignore
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    };
    document.head.appendChild(pdfScript);

    // Load PDF-lib for PDF manipulation
    const pdfLibScript = document.createElement('script');
    pdfLibScript.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
    document.head.appendChild(pdfLibScript);

    return () => {
      document.head.removeChild(pdfScript);
      document.head.removeChild(pdfLibScript);
    };
  }, []);

  // Check for client mode in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('doc');
    const urlMode = urlParams.get('mode');
    
    if (docId && urlMode === 'client') {
      setMode('client');
      setIsAuthenticated(true); // Auto-authenticate for client mode
      loadClientDocument(docId);
    }
  }, []);

  useEffect(() => {
    // Test Supabase connection on mount if configured
    console.log('useEffect running - checking Supabase client...');
    console.log('supabase exists:', !!supabase);
    console.log('SUPABASE_URL:', SUPABASE_URL);
    console.log('API key first 10 chars:', SUPABASE_ANON_KEY.substring(0, 10));
    
    if (supabase) {
      console.log('✅ Supabase client initialized successfully');
    } else {
      console.log('❌ Supabase client not initialized - working in local mode');
    }
  }, []);

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;
    
    const page = await pdfDoc.getPage(pageNum);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const viewport = page.getViewport({ scale: pageScale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
  }, [pdfDoc, pageScale]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, renderPage]);

  // Generate PDF with embedded signatures and form data
  const generateSignedPDF = async (doc: Document): Promise<Uint8Array> => {
    try {
      // @ts-ignore
      const { PDFDocument, rgb } = window.PDFLib;
      
      let pdfBytes: Uint8Array;
      
      if (doc.pdfUrl) {
        // Load the original PDF from URL
        const response = await fetch(doc.pdfUrl);
        pdfBytes = new Uint8Array(await response.arrayBuffer());
      } else if (pdfFile) {
        // Use the local file
        pdfBytes = new Uint8Array(await pdfFile.arrayBuffer());
      } else {
        throw new Error('No PDF source available');
      }

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // Process each field
      for (const field of doc.fields) {
        if (!field.value && !field.signatureData) continue;
        
        const page = pages[field.page - 1];
        if (!page) continue;

        const { width: pageWidth, height: pageHeight } = page.getSize();
        console.log(pageWidth)
        
        // Fix coordinate conversion - account for scaling and coordinate system
        const scaledX = field.x / pageScale;
        const scaledY = field.y / pageScale;
        const scaledWidth = field.width / pageScale;
        const scaledHeight = field.height / pageScale;
        
        // Convert from top-left (HTML) to bottom-left (PDF) coordinate system
        const pdfX = scaledX;
        const pdfY = pageHeight - scaledY - scaledHeight;

        if (field.type === 'signature' && field.signatureData) {
          try {
            // Convert data URL to image bytes
            const imageBytes = await fetch(field.signatureData).then(res => res.arrayBuffer());
            const image = await pdfDoc.embedPng(new Uint8Array(imageBytes));
            
            page.drawImage(image, {
              x: pdfX,
              y: pdfY,
              width: scaledWidth,
              height: scaledHeight,
            });
          } catch (err) {
            console.error('Error embedding signature:', err);
          }
        } else if (field.value) {
          // Add text field - position text in center of field
          const fontSize = Math.min(fieldSettings.fontSize, scaledHeight * 0.8);
          page.drawText(field.value, {
            x: pdfX + 5, // Small padding from left
            y: pdfY + (scaledHeight / 2) - (fontSize / 2), // Center vertically
            size: fontSize,
            color: rgb(0, 0, 0),
          });
        }
      }

      return await pdfDoc.save();
    } catch (err) {
      console.error('Error generating signed PDF:', err);
      throw err;
    }
  };

  const downloadSignedDocument = async () => {
    if (!currentDocument) return;
    
    try {
      setLoading(true);
      console.log('Generating signed PDF...');
      
      // Generate PDF with embedded signatures
      const signedPdfBytes = await generateSignedPDF(currentDocument);
      
      // Upload the signed PDF to Supabase storage
      let signedPdfUrl = '';
      if (supabase) {
        try {
          const signedFileName = `signed_${Date.now()}_${currentDocument.name}`;
          const signedFile = new File([signedPdfBytes], signedFileName, { type: 'application/pdf' });
          
          await supabase.uploadFile('documents', signedFileName, signedFile);
          signedPdfUrl = supabase.getPublicUrl('documents', signedFileName);
          console.log('Signed PDF uploaded to:', signedPdfUrl);
        } catch (uploadErr) {
          console.error('Failed to upload signed PDF:', uploadErr);
        }
      }
      
      // Mark document as completed and save
      const completedDoc = {
        ...currentDocument,
        status: 'completed' as const,
        signedPdfUrl
      };
      
      await saveDocumentToDatabase(completedDoc);
      setCurrentDocument(completedDoc);
      
      // Download the PDF
      const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signed_${currentDocument.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setError('✅ Document signed and downloaded successfully!');
      
    } catch (err) {
      console.error('Error downloading document:', err);
      setError('Failed to generate signed PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Admin Functions
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        setLoading(true);
        setPdfFile(file);

        // Upload PDF to Supabase Storage
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        
        if (supabase) {
          try {
            await supabase.uploadFile('documents', fileName, file);
            const pdfUrl = supabase.getPublicUrl('documents', fileName);
            
            const arrayBuffer = await file.arrayBuffer();
            
            // @ts-ignore
            const loadingTask = window.pdfjsLib.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;
            
            setPdfDoc(pdf);
            setTotalPages(pdf.numPages);
            setCurrentPage(1);
            
            // Create new document
            const newDoc: Document = {
              id: Date.now().toString(),
              name: file.name,
              fields: [],
              status: 'draft',
              pdfUrl
            };
            
            setCurrentDocument(newDoc);
            return; // Success, exit early
          } catch (uploadError) {
            console.error('Upload failed, using local mode:', uploadError);
            setError('Upload failed, working in local mode. Check your API key and bucket setup.');
          }
        }
        
        // Fallback: work with local file
        const arrayBuffer = await file.arrayBuffer();
        
        // @ts-ignore
        const loadingTask = window.pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        
        // Create new document without PDF URL
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          fields: [],
          status: 'draft'
        };
        
        setCurrentDocument(newDoc);
      } catch (err) {
        console.error('Error uploading file:', err);
        setError('Failed to upload PDF. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const startPlacingField = (fieldType: DocumentField['type']) => {
    setSelectedFieldType(fieldType);
    setPlacingField(true);
    setSelectedField(null);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!placingField || !selectedFieldType || !currentDocument) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const fieldLabels = {
      signature: 'Signature',
      name: 'Full Name',
      company: 'Company Name',
      date: 'Date',
      text: 'Text Field'
    };
    
    const fieldSizes = {
      signature: fieldSettings.signatureSize,
      name: fieldSettings.textSize,
      company: fieldSettings.textSize,
      date: { width: 150, height: fieldSettings.textSize.height },
      text: fieldSettings.textSize
    };
    
    const newField: DocumentField = {
      id: Date.now().toString(),
      type: selectedFieldType,
      x,
      y,
      width: fieldSizes[selectedFieldType].width,
      height: fieldSizes[selectedFieldType].height,
      page: currentPage,
      label: fieldLabels[selectedFieldType],
      required: true,
    };
    
    setCurrentDocument({
      ...currentDocument,
      fields: [...currentDocument.fields, newField]
    });
    
    setPlacingField(false);
    setSelectedFieldType(null);
  };

  // Field manipulation
  const handleFieldMouseDown = (e: React.MouseEvent, field: DocumentField) => {
    e.stopPropagation();
    setSelectedField(field);
    setDragStart({ x: e.clientX - field.x, y: e.clientY - field.y });
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && selectedField && currentDocument) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const updatedFields = currentDocument.fields.map(field =>
        field.id === selectedField.id
          ? { ...field, x: Math.max(0, newX), y: Math.max(0, newY) }
          : field
      );
      
      setCurrentDocument({
        ...currentDocument,
        fields: updatedFields
      });
    }
  };

  const handleMouseUp = () => {
    // Auto-save if fields were moved in admin mode
    if ((dragging || resizing) && currentDocument && selectedField) {
      autoSaveDocument(currentDocument);
    }
    
    setDragging(false);
    setResizing(false);
  };

  

  const generateClientLink = async () => {
    if (!currentDocument) return;
    
    try {
      setLoading(true);
      console.log('Generating client link for document:', currentDocument.id);
      
      const clientLink = `${window.location.origin}${window.location.pathname}?doc=${currentDocument.id}&mode=client`;
      const updatedDoc = {
        ...currentDocument,
        status: 'sent' as const,
        clientLink
      };
      
      console.log('Updated document with client link:', updatedDoc);
      await saveDocumentToDatabase(updatedDoc);
      setCurrentDocument(updatedDoc);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(clientLink);
      console.log('Client link copied to clipboard:', clientLink);
      
      // Clear any previous errors
      setError('');
    } catch (err) {
      console.error('Error generating client link:', err);
      setError('Failed to generate client link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldInteraction = (field: DocumentField) => {
    setActiveField(field);
    if (field.type === 'signature') {
      setShowSignatureModal(true);
    } else {
      setShowTextModal(true);
    }
  };

  const saveFieldValue = async (value: string) => {
    if (!activeField || !currentDocument) return;
    
    const updatedFields = currentDocument.fields.map(field =>
      field.id === activeField.id
        ? { ...field, value, signatureData: activeField.type === 'signature' ? value : undefined }
        : field
    );
    
    const updatedDoc = {
      ...currentDocument,
      fields: updatedFields
    };
    
    setCurrentDocument(updatedDoc);
    
    // Auto-save to database
    autoSaveDocument(updatedDoc);
    
    setShowSignatureModal(false);
    setShowTextModal(false);
    setActiveField(null);
  };

  const removeField = (fieldId: string) => {
    if (!currentDocument) return;
    
    setCurrentDocument({
      ...currentDocument,
      fields: currentDocument.fields.filter(f => f.id !== fieldId)
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageFields = currentDocument?.fields.filter(field => field.page === currentPage) || [];
  const allRequiredFieldsCompleted = currentDocument?.fields.every(field => 
    !field.required || (field.type === 'signature' ? field.signatureData : field.value)
  ) || false;

  const getFieldIcon = (type: DocumentField['type']) => {
    switch (type) {
      case 'signature': return <Pen size={16} />;
      case 'name': return <User size={16} />;
      case 'company': return <Building size={16} />;
      case 'date': return <Calendar size={16} />;
      case 'text': return <Type size={16} />;
    }
  };

  // Login Screen
  if (!isAuthenticated && mode === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Amplifirm</h1>
            <p className="text-gray-600">Contract Management Software</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Error Display */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.startsWith('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {error}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {mode === 'admin' ? 'Amplifirm Document Center' : 'Document Signing'}
              </h1>
              <p className="text-gray-600">
                {mode === 'admin' 
                  ? 'Professional contract management and e-signature platform' 
                  : 'Please review and sign the document below'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {autoSaving && (
                <div className="bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg text-sm">
                  Auto-saving...
                </div>
              )}
              
              {lastSaved && !autoSaving && mode === 'client' && (
                <div className="bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              )}
              
              {mode === 'admin' && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMode('client')}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                    Preview Client View
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Logout
                  </button>
                </div>
              )}
              
              {mode === 'client' && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">Document Status</div>
                  <div className="text-lg font-semibold text-blue-600">
                    {currentDocument?.status === 'completed' 
                      ? 'Completed' 
                      : allRequiredFieldsCompleted 
                        ? 'Ready to Submit' 
                        : 'Pending Signature'
                    }
                  </div>
                  {currentDocument?.signedPdfUrl && (
                    <a
                      href={currentDocument.signedPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-800 underline"
                    >
                      Download Signed PDF
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Interface */}
        {mode === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Document Tools
                </h2>
                
                {!currentDocument ? (
                  <div className="text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:bg-gray-400 shadow-lg hover:shadow-xl"
                    >
                      <Upload size={20} />
                      Upload PDF Document
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Upload a PDF to start creating your document workflow
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText size={18} className="text-blue-600" />
                      <span className="truncate font-medium text-gray-800">{currentDocument.name}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Add Fields</h3>
                      <div className="space-y-2">
                        {[
                          { type: 'signature' as const, label: 'Signature', color: 'blue' },
                          { type: 'name' as const, label: 'Full Name', color: 'green' },
                          { type: 'company' as const, label: 'Company', color: 'purple' },
                          { type: 'date' as const, label: 'Date', color: 'orange' },
                          { type: 'text' as const, label: 'Text Field', color: 'gray' }
                        ].map(({ type, label, color }) => (
                          <button
                            key={type}
                            onClick={() => startPlacingField(type)}
                            disabled={placingField}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors ${
                              selectedFieldType === type
                                ? `bg-${color}-100 text-${color}-700 border-${color}-300`
                                : `text-gray-700 hover:bg-gray-50 ${placingField ? 'opacity-50' : ''}`
                            }`}
                          >
                            {getFieldIcon(type)}
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {placingField && (
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                        Click on the document to place the {selectedFieldType} field
                      </div>
                    )}
                    
                    {selectedField && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Field Properties</h4>
                        <div className="space-y-2 text-sm">
                          <div>Type: {selectedField.type}</div>
                          <div>Size: {selectedField.width}×{selectedField.height}</div>
                          <div>Page: {selectedField.page}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Field Settings */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Type size={18} className="text-purple-600" />
                        Field Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                          <input
                            type="range"
                            min="8"
                            max="24"
                            value={fieldSettings.fontSize}
                            onChange={(e) => setFieldSettings({
                              ...fieldSettings,
                              fontSize: parseInt(e.target.value)
                            })}
                            className="w-full accent-purple-600"
                          />
                          <div className="text-sm text-gray-600 mt-1">{fieldSettings.fontSize}px</div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Signature Size</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              placeholder="Width"
                              value={fieldSettings.signatureSize.width}
                              onChange={(e) => setFieldSettings({
                                ...fieldSettings,
                                signatureSize: {
                                  ...fieldSettings.signatureSize,
                                  width: parseInt(e.target.value) || 200
                                }
                              })}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                              type="number"
                              placeholder="Height"
                              value={fieldSettings.signatureSize.height}
                              onChange={(e) => setFieldSettings({
                                ...fieldSettings,
                                signatureSize: {
                                  ...fieldSettings.signatureSize,
                                  height: parseInt(e.target.value) || 60
                                }
                              })}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Text Field Size</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              placeholder="Width"
                              value={fieldSettings.textSize.width}
                              onChange={(e) => setFieldSettings({
                                ...fieldSettings,
                                textSize: {
                                  ...fieldSettings.textSize,
                                  width: parseInt(e.target.value) || 200
                                }
                              })}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                              type="number"
                              placeholder="Height"
                              value={fieldSettings.textSize.height}
                              onChange={(e) => setFieldSettings({
                                ...fieldSettings,
                                textSize: {
                                  ...fieldSettings.textSize,
                                  height: parseInt(e.target.value) || 40
                                }
                              })}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {currentDocument.fields.length > 0 && (
                      <div className="pt-4 border-t">
                        <button
                          onClick={generateClientLink}
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                        >
                          <Link size={16} />
                          Generate Client Link
                        </button>
                        
                        {!supabase && (
                          <div className="mt-2 p-2 bg-yellow-50 text-yellow-700 rounded text-xs">
                            Working in local mode - links won't persist without Supabase
                          </div>
                        )}
                        
                        {currentDocument.clientLink && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <div className="text-xs text-green-700 mb-1">Client Link (Copied!)</div>
                            <div className="text-xs text-green-600 break-all">
                              {currentDocument.clientLink}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Document Viewer */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {currentDocument && pdfDoc ? (
                  <>
                    {/* Navigation */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </button>
                        <span className="text-sm font-medium">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          Next
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}

                    {/* PDF Canvas */}
                    <div className="relative border rounded-xl overflow-hidden bg-gray-50 flex justify-center">
                      <div className="relative">
                        <canvas
                          ref={canvasRef}
                          className={`max-w-full ${placingField ? 'cursor-crosshair' : 'cursor-default'}`}
                          onClick={handleCanvasClick}
                        />
                        
                        {/* Field Overlays */}
                        {currentPageFields.map((field) => (
                          <div
                            key={field.id}
                            className={`absolute border-2 ${
                              selectedField?.id === field.id 
                                ? 'border-solid border-blue-600 bg-blue-100' 
                                : 'border-dashed hover:border-solid'
                            } ${
                              field.type === 'signature' ? 'border-blue-500 bg-blue-50' :
                              field.type === 'name' ? 'border-green-500 bg-green-50' :
                              field.type === 'company' ? 'border-purple-500 bg-purple-50' :
                              field.type === 'date' ? 'border-orange-500 bg-orange-50' :
                              'border-gray-500 bg-gray-50'
                            } rounded flex items-center justify-center group cursor-move`}
                            style={{
                              left: field.x,
                              top: field.y,
                              width: field.width,
                              height: field.height,
                            }}
                            onMouseDown={(e) => handleFieldMouseDown(e, field)}
                          >
                            <div className="text-center pointer-events-none">
                              <div className="text-xs font-medium text-gray-700">{field.label}</div>
                              <div className="text-xs text-gray-500">{field.required ? 'Required' : 'Optional'}</div>
                            </div>
                            
                            {/* Resize handle */}
                            <div
                              className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                setResizing(true);
                                setSelectedField(field);
                              }}
                            />
                            
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeField(field.id);
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                      <p>Upload a PDF document to get started</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Client Interface */}
        {mode === 'client' && currentDocument && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Document Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">{currentDocument.name}</h2>
                  <p className="text-gray-600">Please complete all required fields and sign where indicated</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {allRequiredFieldsCompleted && currentDocument?.status !== 'completed' && (
                    <button 
                      onClick={downloadSignedDocument}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-400 shadow-lg"
                    >
                      <Send size={18} />
                      Submit Document
                    </button>
                  )}
                  
                  {currentDocument?.status === 'completed' && (
                    <div className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl shadow-lg">
                      <Check size={18} />
                      Document Completed
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-medium">Completion Progress</span>
                  <span>
                    {currentDocument.fields.filter(f => f.value || f.signatureData).length} of {currentDocument.fields.length} fields completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{
                      width: `${(currentDocument.fields.filter(f => f.value || f.signatureData).length / currentDocument.fields.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <span className="text-sm font-medium bg-gray-100 px-4 py-2 rounded-lg">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* PDF Canvas */}
              <div className="relative border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex justify-center shadow-inner">
                <div className="relative">
                  <canvas ref={canvasRef} className="max-w-full" />
                  
                  {/* Interactive Fields */}
                  {currentPageFields.map((field) => (
                    <div
                      key={field.id}
                      className={`absolute rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                        field.value || field.signatureData
                          ? 'bg-green-100 border-2 border-green-400 shadow-lg'
                          : 'bg-blue-100 border-2 border-blue-400 hover:bg-blue-200 hover:border-blue-500 shadow-md hover:shadow-lg'
                      }`}
                      style={{
                        left: field.x,
                        top: field.y,
                        width: field.width,
                        height: field.height,
                      }}
                      onClick={() => handleFieldInteraction(field)}
                    >
                      {field.signatureData ? (
                        <img
                          src={field.signatureData}
                          alt="Signature"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : field.value ? (
                        <span className="text-sm font-medium text-gray-800 px-2 truncate">
                          {field.value}
                        </span>
                      ) : (
                        <div className="text-center">
                          <div className="text-sm font-medium text-blue-700 mb-1">
                            {getFieldIcon(field.type)}
                          </div>
                          <div className="text-xs text-blue-600 font-medium">
                            Click to {field.type === 'signature' ? 'sign' : 'fill'}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Powered by */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold text-blue-600">Amplifirm</span> Contract Management Software
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Admin Button (Client Mode) - Only show in preview mode */}
        {mode === 'client' && !window.location.search.includes('mode=client') && (
          <div className="text-center mt-6">
            <button
              onClick={() => setMode('admin')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Admin View
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={saveFieldValue}
      />
      
      <TextInputModal
        isOpen={showTextModal}
        field={activeField}
        onClose={() => setShowTextModal(false)}
        onSave={saveFieldValue}
      />
    </div>
  );
}