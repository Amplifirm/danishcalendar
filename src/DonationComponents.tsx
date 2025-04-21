// DonationComponents.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, ExternalLink, RefreshCw, Clock, MessageCircle, DollarSign, Users } from 'lucide-react';

// Define types for our donor data
type Donor = {
  name: string;
  amount: string;
  message?: string;
  date: string;
};

type CampaignData = {
  totalRaised: string;
  donorCount: number;
  goalAmount?: string;
  campaignTitle: string;
};

// Configuration object
type GoFundMeConfig = {
  campaignUrl: string;
  refreshInterval: number; // in milliseconds
  maxDonorsToShow: number;
  enableAutoScroll: boolean;
};

// Props for our donor ticker component
interface DonationTickerProps {
  config: GoFundMeConfig;
}

// Proxy service endpoint - this should be set up on your backend
const PROXY_ENDPOINT = '/api/gofundme-proxy';

/**
 * Fetch donor data from GoFundMe via a proxy server
 * Note: You will need to implement a server-side proxy to avoid CORS issues
 * The proxy should fetch the GoFundMe page, parse the HTML/JSON, and return the data
 */
const fetchDonorData = async (campaignUrl: string): Promise<{ donors: Donor[], campaignData: CampaignData }> => {
  try {
    const response = await fetch(`${PROXY_ENDPOINT}?url=${encodeURIComponent(campaignUrl)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch donor data: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching donor data:', error);
    // Return empty data for graceful fallback
    return {
      donors: [],
      campaignData: {
        totalRaised: "$0",
        donorCount: 0,
        campaignTitle: "Give Sadaqah"
      }
    };
  }
};

/**
 * Format the date to be more readable
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};

/**
 * Donation Ticker Component - Shows a scrolling list of recent donors
 */
export const DonationTicker: React.FC<DonationTickerProps> = ({ config }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    totalRaised: "$0",
    donorCount: 0,
    campaignTitle: "Give Sadaqah"
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Function to fetch data
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchDonorData(config.campaignUrl);
      setDonors(data.donors);
      setCampaignData(data.campaignData);
      setError(null);
    } catch (error) {
      setError('Failed to load recent donations. Please try again later.');
      console.error('Error fetching donations:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
    
    // Set up polling for refreshes
    const interval = setInterval(fetchData, config.refreshInterval);
    
    return () => {
      clearInterval(interval);
    };
  }, [config.campaignUrl, config.refreshInterval]);
  
  // Auto scroll through donors if enabled
  useEffect(() => {
    if (!config.enableAutoScroll || donors.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % Math.min(donors.length, config.maxDonorsToShow));
    }, 5000); // Change donor every 5 seconds
    
    return () => clearInterval(interval);
  }, [donors, config.enableAutoScroll, config.maxDonorsToShow]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    fetchData();
  };
  
  // Skip to a specific donor in the list
  const skipToDonor = (index: number) => {
    setActiveIndex(index);
  };
  
  if (isLoading && donors.length === 0) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 border-r-2 border-b-2 border-gray-700 mb-4"></div>
        <p className="text-gray-300">Loading recent donations...</p>
      </div>
    );
  }
  
  if (error && donors.length === 0) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 text-center">
        <div className="text-red-400 mb-3">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-300 mb-4">{error}</p>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 
            text-emerald-300 rounded-lg transition-colors flex items-center mx-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
      {/* Campaign Stats Header */}
      <div className="bg-gray-900/50 border-b border-gray-700 p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center">
            <Heart className="w-5 h-5 text-emerald-500 mr-2" /> 
            {campaignData.campaignTitle}
          </h3>
          <p className="text-gray-400 text-sm">Recent Supporters</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-400">Total Raised</p>
            <p className="text-lg font-bold text-emerald-400">{campaignData.totalRaised}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Supporters</p>
            <p className="text-lg font-bold text-emerald-400">{campaignData.donorCount}</p>
          </div>
        </div>
      </div>
      
      {/* Donor Ticker */}
      <div className="p-6">
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/40 rounded-xl p-5 border border-gray-700"
            >
              {donors.length > 0 ? (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/30 
                        flex items-center justify-center text-emerald-400 mr-3"
                      >
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {donors[activeIndex]?.name || 'Anonymous'}
                        </h4>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> 
                          {formatDate(donors[activeIndex]?.date || new Date().toISOString())}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/20 
                      text-sm font-medium text-emerald-400 flex items-center"
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      {donors[activeIndex]?.amount || '$0'}
                    </div>
                  </div>
                  
                  {donors[activeIndex]?.message && (
                    <div className="bg-gray-900/60 rounded-lg p-3 mb-2 border border-gray-700/50">
                      <p className="text-gray-300 italic flex items-start">
                        <MessageCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-emerald-500" />
                        "{donors[activeIndex].message}"
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400">No donations available at the moment.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Pagination Dots */}
          {donors.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {donors.slice(0, config.maxDonorsToShow).map((_, index) => (
                <button
                  key={index}
                  onClick={() => skipToDonor(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-emerald-500 w-4' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`View donation ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Actions Footer */}
        <div className="mt-6 flex justify-between items-center">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-gray-900/60 hover:bg-gray-800/60 border border-gray-700 
              text-gray-300 rounded-lg transition-colors flex items-center text-sm"
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-emerald-500 border-r-2 border-b-2 border-gray-800 mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </>
            )}
          </button>
          
          <a 
            href={config.campaignUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 
              text-emerald-300 rounded-lg transition-colors flex items-center text-sm"
          >
            View Campaign <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * GoFundMe Donation Form Component - Embeds the GoFundMe donation form
 */
interface DonationFormProps {
  campaignUrl: string;
  showMarhoomsField?: boolean;
}

export const DonationForm: React.FC<DonationFormProps> = ({ campaignUrl, showMarhoomsField = true }) => {
  const [marhooms, setMarhooms] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  
  // Extract campaign ID from URL
  const getCampaignId = (url: string): string => {
    const match = url.match(/\/f\/([^/?]+)/);
    return match ? match[1] : '';
  };
  
  const campaignId = getCampaignId(campaignUrl);
  
  // Handle opening the donation form in a new window with marhooms
  const handleDonate = () => {
    if (showMarhoomsField && marhooms.trim()) {
      // Open the donation page with a pre-filled comment about Marhooms
      window.open(
        `${campaignUrl}?utm_source=website&utm_medium=embed&utm_campaign=marhooms&comment=On behalf of my Marhoomeen: ${encodeURIComponent(marhooms)}`,
        '_blank'
      );
    } else {
      // Just open the regular donation page
      window.open(campaignUrl, '_blank');
    }
  };
  
  // Toggle the embedded form visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
      <div className="bg-gray-900/50 border-b border-gray-700 p-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Heart className="w-5 h-5 text-emerald-500 mr-2" /> 
          Support Our Cause
        </h3>
        <p className="text-gray-400 text-sm">Your donation makes a difference</p>
      </div>
      
      <div className="p-6">
        {showMarhoomsField && (
          <div className="mb-6">
            <label htmlFor="marhooms" className="block text-sm font-medium text-gray-300 mb-2">
              On behalf of my Marhoomeen (optional)
            </label>
            <input
              type="text"
              id="marhooms"
              value={marhooms}
              onChange={(e) => setMarhooms(e.target.value)}
              placeholder="Enter names of Marhoomeen"
              className="w-full px-4 py-3 bg-gray-900/70 rounded-xl border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 
                text-white transition-all duration-300"
            />
            <p className="mt-2 text-sm text-gray-400">
              Names you enter here will be included in your donation comment
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDonate}
            className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 
              hover:to-emerald-800 rounded-xl text-white font-medium transition-all duration-300 
              shadow-lg shadow-emerald-900/30 border border-emerald-500 hover:border-emerald-400 
              flex items-center justify-center group relative overflow-hidden flex-1"
          >
            <motion.span 
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
            />
            <Heart className="w-5 h-5 mr-2" /> Donate Now
          </button>
          
          <button
            onClick={toggleForm}
            className="px-6 py-4 bg-gray-900/60 hover:bg-gray-800/60 border border-gray-700 
              text-gray-300 hover:text-white rounded-xl transition-all duration-300
              flex items-center justify-center sm:w-auto"
          >
            {isFormOpen ? 'Hide Form' : 'Show Embedded Form'}
          </button>
        </div>
        
        {/* Embedded GoFundMe Form */}
        {isFormOpen && campaignId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="relative pb-4 h-[600px]">
              <iframe
                src={`https://www.gofundme.com/f/${campaignId}/widget/medium/`}
                frameBorder="0"
                scrolling="no"
                title="GoFundMe donation widget"
                className="absolute inset-0 w-full h-full rounded-xl bg-white"
              ></iframe>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/**
 * Main component that combines the ticker and donation form
 */
interface DonationSectionProps {
  campaignUrl: string;
  refreshInterval?: number;
  maxDonorsToShow?: number;
  enableAutoScroll?: boolean;
  showMarhoomsField?: boolean;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  campaignUrl,
  refreshInterval = 60000, // Default to 1 minute
  maxDonorsToShow = 5,
  enableAutoScroll = true,
  showMarhoomsField = true
}) => {
  const config: GoFundMeConfig = {
    campaignUrl,
    refreshInterval,
    maxDonorsToShow,
    enableAutoScroll
  };
  
  return (
    <section id="donate" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-emerald-400 text-lg font-medium mb-4"
          >
            Support Our Mission
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Give <span className="text-emerald-400">Sadaqah</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Your generous donations help support our educational initiatives and community programs.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <DonationTicker config={config} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <DonationForm 
              campaignUrl={campaignUrl}
              showMarhoomsField={showMarhoomsField} 
            />
          </motion.div>
        </div>
        
        {/* Islamic Quote about Charity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-900/20 to-gray-900/20 backdrop-blur-sm p-10 rounded-2xl 
            border border-emerald-500/20 text-center my-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern id="quote-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M5,0 L10,5 L5,10 L0,5 Z" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="0.5"/>
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#quote-pattern)"/>
              </svg>
            </motion.div>
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl text-emerald-500/20 font-serif mb-6">"</div>
            <p className="text-2xl text-gray-200 italic mb-8 max-w-4xl mx-auto">
              The likeness of those who spend their wealth in the way of Allah is as the likeness of a grain which grows seven spikes; in each spike is a hundred grains, and Allah multiplies for whom He wills.
            </p>
            <p className="text-emerald-400 font-medium">— Surah Al-Baqarah, 2:261</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Server-side API route implementation (create this in your project)
/*
// Example implementation for Next.js API route (pages/api/gofundme-proxy.ts)
// This would need to be implemented on your backend

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Campaign URL is required' });
    }
    
    // Fetch the GoFundMe page
    const response = await fetch(url);
    const html = await response.text();
    
    // Use cheerio to parse the HTML
    const $ = cheerio.load(html);
    
    // Extract campaign data
    const campaignTitle = $('.campaign-title').text().trim();
    const totalRaised = $('.progress-meter-heading').text().trim();
    const donorCount = parseInt($('.js-donor-count').text().trim().replace(/,/g, ''), 10);
    
    // Extract donor data - this will vary based on GoFundMe's HTML structure
    // You'll need to inspect the page and adjust these selectors
    const donors = [];
    $('.donation-feed-item').each((i, el) => {
      const name = $(el).find('.donation-person-name').text().trim() || 'Anonymous';
      const amount = $(el).find('.donation-amount').text().trim();
      const message = $(el).find('.donation-message').text().trim();
      const dateText = $(el).find('.donation-timestamp').attr('title');
      const date = dateText ? new Date(dateText).toISOString() : new Date().toISOString();
      
      donors.push({
        name,
        amount,
        message,
        date
      });
    });
    
    // Return the extracted data
    return res.status(200).json({
      donors,
      campaignData: {
        totalRaised,
        donorCount,
        campaignTitle
      }
    });
  } catch (error) {
    console.error('Error fetching GoFundMe data:', error);
    return res.status(500).json({ error: 'Failed to fetch campaign data' });
  }
}
*/