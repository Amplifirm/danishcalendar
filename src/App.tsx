import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import CryptoJS from 'crypto-js';

// Supabase configuration
const supabaseUrl = 'https://flajoskbmjaveopysmtp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYWpvc2tibWphdmVvcHlzbXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODE0NDgsImV4cCI6MjA1OTM1NzQ0OH0.MHMhIv3N6e_YMBe-zpEQ9ClKUL4zp_55sDO1P7UIXbE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Types
interface Message {
  id: number;
  created_at: string;
  sender: string;
  content: string;
  encrypted: boolean;
}

interface User {
  username: string;
  password: string;
  role: string;
}

// Valid users - hardcoded for security (in a real app, these would be securely stored)
const validUsers: User[] = [
  { username: "researcher1", password: "7H29Kp$9xLm!5vB3", role: "admin" },
  { username: "researcher2", password: "E4z@8dW2qRs7T!9y", role: "member" }
];

// Shared encryption key for all messages (in a real app, this would be more secure)
const SHARED_KEY = "XQw5Tu7PkLz3H9Vj";

// Master decryption password
const MASTER_DECRYPTION_PASSWORD = "ALPHA_CLEARANCE_9940";

// Konami code for secret access
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

const App: React.FC = () => {
  // State
  const [currentView, setCurrentView] = useState<'home' | 'exhibitions' | 'artists' | 'visit'>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
  // Portal state
  const [showSecurePortal, setShowSecurePortal] = useState<boolean>(false);
  const [showSecurityChallenge, setShowSecurityChallenge] = useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  
  // Security challenge state
  const [secretCode, setSecretCode] = useState<string>('');
  const [secretCodeCorrect, setSecretCodeCorrect] = useState<boolean>(false);
  const [securityQuestion] = useState<string>('I am the boundary that divides yet connects all opposites; the moment where truth and illusion become indistinguishable; I grow stronger when questioned yet dissolve when defined. What am I?');
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const correctSecretCode = 'atlas';
  const correctSecurityAnswer = 'paradox';
  
  // Easter egg combination
  const [easterEggProgress, setEasterEggProgress] = useState<number>(0);
  const easterEggSequence = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'a'];
  
  // Konami code for extra security
  const [konamiProgress, setKonamiProgress] = useState<number>(0);
  
  // Messaging app state
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [messagesDecrypted, setMessagesDecrypted] = useState<boolean>(false);
  const [decryptedMessages, setDecryptedMessages] = useState<{ [key: number]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [terminalHistory, setTerminalHistory] = useState<{message: string, type: 'info' | 'warning' | 'error' | 'success'}[]>([
    {message: "System initializing...", type: 'info'},
    {message: "Loading encryption modules...", type: 'info'},
    {message: "Establishing secure connection to HIPS server...", type: 'info'},
    {message: "Port 91220/1999298 activated", type: 'success'},
    {message: "HIPS 3.7.2 ready for authentication", type: 'success'}
  ]);
  const [showTerminal, setShowTerminal] = useState<boolean>(true);
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 12,
    memoryUsage: 24,
    networkLatency: 38,
    encryptionStrength: 256,
    activeConnections: 1
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const masterPasswordInputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, decryptedMessages]);
  
  // Scroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);
  
  // Update system metrics randomly
  useEffect(() => {
    if (!showSecurePortal) return;
    
    const interval = setInterval(() => {
      setSystemMetrics({
        cpuUsage: Math.floor(Math.random() * 30) + 5, 
        memoryUsage: Math.floor(Math.random() * 40) + 10,
        networkLatency: Math.floor(Math.random() * 50) + 20,
        encryptionStrength: 256,
        activeConnections: Math.floor(Math.random() * 3) + 1
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [showSecurePortal]);
  
  // Easter egg detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture key events when in input fields
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      
      // Check for the secret code typed anywhere
      if (e.key.toLowerCase() === 'a' && 
          e.altKey && 
          e.shiftKey) {
        setShowSecurityChallenge(true);
        return;
      }
      
      // Check for Easter Egg sequence
      if (e.key === easterEggSequence[easterEggProgress]) {
        const nextProgress = easterEggProgress + 1;
        setEasterEggProgress(nextProgress);
        
        // If we've completed the sequence
        if (nextProgress === easterEggSequence.length) {
          setShowSecurityChallenge(true);
          setEasterEggProgress(0);
        }
      } else {
        // Reset progress if wrong key
        setEasterEggProgress(0);
      }
      
      // Check for Konami Code
      if (e.key === KONAMI_CODE[konamiProgress]) {
        const nextProgress = konamiProgress + 1;
        setKonamiProgress(nextProgress);
        
        // If we've completed the sequence
        if (nextProgress === KONAMI_CODE.length) {
          setShowSecurityChallenge(true);
          setKonamiProgress(0);
        }
      } else {
        // Reset progress if wrong key
        setKonamiProgress(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [easterEggProgress, easterEggSequence, konamiProgress]);

  // Set up real-time subscription to messages when authenticated
  useEffect(() => {
    if (!currentUser) return;
    
    const subscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages(prev => [...prev, newMessage]);
        
        // Auto-decrypt new messages if already decrypted
        if (messagesDecrypted) {
          try {
            const decrypted = decryptMessage(newMessage.content, SHARED_KEY);
            setDecryptedMessages(prev => ({
              ...prev,
              [newMessage.id]: decrypted
            }));
          } catch (error) {
            console.error('Auto-decrypt error:', error);
          }
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentUser, messagesDecrypted]);

  // Encryption/decryption functions
  const encryptMessage = (message: string, key: string): string => {
    return CryptoJS.AES.encrypt(message, key).toString();
  };

  const decryptMessage = (encryptedMessage: string, key: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return 'Error decrypting message';
    }
  };
  
  // Security challenge handlers
  const handleSecretCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (secretCode.toLowerCase() === correctSecretCode) {
      setSecretCodeCorrect(true);
    } else {
      setError('Incorrect code. Please try again.');
      setSecretCode('');
    }
  };
  
  const handleSecurityAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityAnswer.toLowerCase() === correctSecurityAnswer) {
      setShowSecurityChallenge(false);
      setShowLoginForm(true);
    } else {
      setError('Incorrect answer. Please try again.');
      setSecurityAnswer('');
    }
  };
  
  // Fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setConnectionStatus('connecting');
      
      // Update terminal history
      addTerminalMessage("Establishing connection to secure database...", 'info');
      
      // Check if the 'messages' table exists, if not create it
      const { error: tableError } = await supabase
        .from('messages')
        .select('id')
        .limit(1);
        
      if (tableError) {
        // Table might not exist, let's create it
        await supabase.rpc('create_messages_table_if_not_exists');
      }
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        addTerminalMessage("ERROR: Database connection failed", 'error');
        throw new Error(`Failed to fetch messages: ${error.message}`);
      }
      
      setMessages(data || []);
      addTerminalMessage(`Retrieved ${data?.length || 0} encrypted communications`, 'success');
      
      // Reset decryption state
      setMessagesDecrypted(false);
      setDecryptedMessages({});
      
      setConnectionStatus('connected');
      addTerminalMessage("Connection established. HIPS Port 91220/1999298 active", 'success');
    } catch (err: any) {
      setError(`Error fetching messages: ${err.message}`);
      setConnectionStatus('disconnected');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Message change handler to prevent refresh issue
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }, []);
  
  // Master password change handler to prevent refresh issue
  const handleMasterPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMasterPassword(e.target.value);
  }, []);

  // Send a message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    
    try {
      setIsLoading(true);
      setConnectionStatus('connecting');
      addTerminalMessage("Encrypting message...", 'info');
      const encryptedContent = encryptMessage(newMessage, SHARED_KEY);
      
      addTerminalMessage("Sending over secure channel...", 'info');
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            sender: currentUser, 
            content: encryptedContent,
            encrypted: true
          }
        ]);
      
      if (error) {
        addTerminalMessage("ERROR: Message transmission failed", 'error');
        throw new Error(`Failed to send message: ${error.message}`);
      }
      
      addTerminalMessage("Message sent successfully", 'success');
      setNewMessage('');
      setConnectionStatus('connected');
      
      // Don't need to fetch messages as they will come through the subscription
    } catch (err: any) {
      setError(`Error sending message: ${err.message}`);
      setConnectionStatus('disconnected');
      console.error(err);
    } finally {
      setIsLoading(false);
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }
  };

  // Verify master password and decrypt all messages
  const handleMasterPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (masterPassword === MASTER_DECRYPTION_PASSWORD) {
      addTerminalMessage("CLEARANCE VERIFIED: Decrypting communications", 'success');
      
      const allDecrypted: { [key: number]: string } = {};
      
      messages.forEach(message => {
        try {
          const decrypted = decryptMessage(message.content, SHARED_KEY);
          allDecrypted[message.id] = decrypted;
        } catch (error) {
          console.error(`Error decrypting message ${message.id}:`, error);
        }
      });
      
      setDecryptedMessages(allDecrypted);
      setMessagesDecrypted(true);
      setMasterPassword('');
      setError(null);
      addTerminalMessage("All communications decrypted", 'success');
    } else {
      addTerminalMessage("ERROR: Invalid security clearance", 'error');
      setError('Invalid security clearance. Decryption failed.');
      setMasterPassword('');
    }
  };
  
  // Lock all messages (re-encrypt)
  const lockMessages = () => {
    setDecryptedMessages({});
    setMessagesDecrypted(false);
    addTerminalMessage("Communications re-encrypted. Secure mode activated", 'success');
  };

  // Add a message to the terminal history
  const addTerminalMessage = (message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    setTerminalHistory(prev => {
      // Keep last 20 messages
      const updated = [...prev, {message, type}];
      if (updated.length > 20) {
        return updated.slice(updated.length - 20);
      }
      return updated;
    });
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      setCurrentUser(username);
      setShowLoginForm(false);
      setShowSecurePortal(true);
      addTerminalMessage(`User ${username} authenticated`, 'success');
      addTerminalMessage(`HIPS Protocol activated for ${user.role} access level`, 'info');
      fetchMessages();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  // Handle navigation
  const handleNavigation = (view: 'home' | 'exhibitions' | 'artists' | 'visit') => {
    setCurrentView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exit Portal
  const exitPortal = () => {
    setCurrentUser(null);
    setShowSecurePortal(false);
    setUsername('');
    setPassword('');
    setDecryptedMessages({});
    setMessagesDecrypted(false);
    setTerminalHistory([
      {message: "System initializing...", type: 'info'},
      {message: "Loading encryption modules...", type: 'info'},
      {message: "Establishing secure connection to HIPS server...", type: 'info'},
      {message: "Port 91220/1999298 activated", type: 'success'},
      {message: "HIPS 3.7.2 ready for authentication", type: 'success'}
    ]);
  };

  // Components
  const NavItem: React.FC<{ 
    to: 'home' | 'exhibitions' | 'artists' | 'visit', 
    active: boolean,
    children: React.ReactNode 
  }> = ({ to, active, children }) => (
    <motion.li 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <a 
        href={`#${to}`} 
        className={`nav-link ${active ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(to);
        }}
      >
        {children}
      </a>
    </motion.li>
  );
  
  const SecurityChallengeModal = () => (
    <motion.div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-xl relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Secure Access Verification</h2>
            <button 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => {
                setShowSecurityChallenge(false);
                setSecretCodeCorrect(false);
                setSecretCode('');
                setSecurityAnswer('');
                setError(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {!secretCodeCorrect ? (
            <form onSubmit={handleSecretCodeSubmit} className="space-y-4">
              <div>
                <label htmlFor="secretCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm access code:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="secretCode"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Hint: Greek titan who held up the sky (5 letters)
                </p>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <motion.button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowSecurityChallenge(false);
                    setSecretCodeCorrect(false);
                    setSecretCode('');
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit" 
                  className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Verify
                </motion.button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSecurityAnswerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Question:
                </label>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
                  {securityQuestion}
                </p>
              </div>
              
              <div>
                <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Answer:
                </label>
                <input
                  type="text"
                  id="securityAnswer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  autoFocus
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <motion.button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowSecurityChallenge(false);
                    setSecretCodeCorrect(false);
                    setSecretCode('');
                    setSecurityAnswer('');
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit" 
                  className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Access Portal
                </motion.button>
              </div>
            </form>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Secure verification system
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  const LoginForm = () => (
    <motion.div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl max-w-md w-full overflow-hidden shadow-xl relative border border-gray-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">HIPS Authentication</h2>
              </div>
              <div className="text-blue-400 text-xs mt-1">Port 91220/1999298</div>
            </div>
            <motion.button 
              className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => setShowLoginForm(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-900/30 text-red-400 rounded-lg text-sm border border-red-900">
                {error}
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6">
              <motion.button 
                type="button" 
                className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                onClick={() => {
                  setShowLoginForm(false);
                  setUsername('');
                  setPassword('');
                  setError(null);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Authenticate
              </motion.button>
            </div>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            High Integrity Protocol System - v3.7.2
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  // Render portal for messaging
  const SecurePortal = () => (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl w-full max-w-6xl overflow-hidden shadow-xl h-[85vh] flex flex-col relative border border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Portal Header */}
        <div className="p-4 flex justify-between items-center bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-blue-600 w-10 h-10 rounded-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                HIPS Secure Communication Portal
                <span className="px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400 rounded-full">
                  AES-256
                </span>
                {messagesDecrypted && (
                  <span className="px-2 py-0.5 text-xs bg-green-600/20 text-green-400 rounded-full">
                    DECRYPTED
                  </span>
                )}
              </h2>
              <div className="text-xs text-blue-400 flex items-center gap-3">
                <span>Port 91220/1999298</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>Protocol v3.7.2</span>
              </div>
            </div>
            
            {/* Connection status indicator */}
            <div className="ml-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' 
                  ? 'bg-green-500' 
                  : connectionStatus === 'connecting'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}></div>
              <span className="text-xs text-gray-400">
                {connectionStatus === 'connected' 
                  ? 'Connected' 
                  : connectionStatus === 'connecting'
                    ? 'Connecting...'
                    : 'Disconnected'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button 
              className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-1"
              onClick={fetchMessages}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLoading ? 'animate-spin' : ''}>
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span className="text-sm">Refresh</span>
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-1"
              onClick={() => setShowTerminal(!showTerminal)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <span className="text-sm">{showTerminal ? 'Hide Terminal' : 'Show Terminal'}</span>
            </motion.button>
            
            {messagesDecrypted ? (
              <motion.button 
                className="p-2 rounded-lg border border-red-700 bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-1"
                onClick={lockMessages}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="text-sm">Lock Messages</span>
              </motion.button>
            ) : null}
            
            <motion.button 
              className="p-2 rounded-lg border border-red-700 bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-1"
              onClick={exitPortal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="text-sm">Exit</span>
            </motion.button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400">
                Encryption: <span className={`font-medium ${messagesDecrypted ? 'text-green-400' : 'text-red-400'}`}>
                  {messagesDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
                </span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="text-xs text-gray-400">
                User: <span className="font-medium text-blue-400">{currentUser}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span className="text-xs text-gray-400">
                Status: <span className="font-medium text-green-400">Authenticated</span>
              </span>
            </div>
          </div>
          
          {/* System Metrics */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>CPU:</span>
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${systemMetrics.cpuUsage > 50 ? 'bg-red-500' : (systemMetrics.cpuUsage > 30 ? 'bg-yellow-500' : 'bg-green-500')}`}
                  style={{ width: `${systemMetrics.cpuUsage}%` }}
                ></div>
              </div>
              <span>{systemMetrics.cpuUsage}%</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>MEM:</span>
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${systemMetrics.memoryUsage}%` }}
                ></div>
              </div>
              <span>{systemMetrics.memoryUsage}%</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>NET:</span>
              <span>{systemMetrics.networkLatency}ms</span>
            </div>
          </div>
          
          {/* Master Password Input */}
          {!messagesDecrypted && (
            <form onSubmit={handleMasterPasswordSubmit} className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  ref={masterPasswordInputRef}
                  value={masterPassword}
                  onChange={handleMasterPasswordChange}
                  placeholder="Enter security clearance"
                  className="pl-8 pr-2 py-1 text-xs bg-gray-900 border border-gray-700 rounded text-white w-48 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Decrypt
              </motion.button>
            </form>
          )}
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-900 space-y-4 border-r border-gray-700 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{
                  background: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
                  backgroundSize: '8px 8px'
                }}></div>
            
            {/* Messages Content */}
            {isLoading && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full mb-4"
                />
                <p className="text-gray-400">Loading secure communications...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mb-4">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No Communications Found</h3>
                <p className="text-gray-500 max-w-md">
                  Begin your secure conversation. All messages are end-to-end encrypted with military-grade encryption.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[80%] rounded-lg p-4 shadow-lg ${
                      message.sender === currentUser
                        ? 'ml-auto bg-blue-900/20 border border-blue-800'
                        : 'bg-gray-800/80 border border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${messagesDecrypted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium text-sm text-gray-300">
                          {message.sender === currentUser ? 'You' : message.sender}
                        </span>
                        <span className={`px-1.5 py-0.5 text-xs rounded-md ${
                          messagesDecrypted 
                            ? 'bg-green-900/30 text-green-400 border border-green-900/50' 
                            : 'bg-red-900/30 text-red-400 border border-red-900/50'
                        }`}>
                          {messagesDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <div className="text-gray-200 break-words">
                      {messagesDecrypted && decryptedMessages[message.id] ? (
                        <div className="text-green-300 py-2 px-3 bg-green-900/10 rounded-md border border-green-900/50">
                          {decryptedMessages[message.id]}
                        </div>
                      ) : (
                        <div className="font-mono text-xs bg-red-900/10 p-3 rounded-md border border-red-900/50">
                          <div className="mb-2 text-gray-500 flex items-center justify-between">
                            <span>[ENCRYPTED DATA]</span>
                            <span className="text-xs px-1.5 py-0.5 bg-red-900/50 rounded text-red-400">AES-256</span>
                          </div>
                          <code className="text-red-400 break-all">
                            {message.content.substring(0, 64)}...
                          </code>
                          {!messagesDecrypted && (
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                              <span>Security clearance required for decryption</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Terminal Section */}
          {showTerminal && (
            <div className="w-80 bg-black overflow-hidden flex flex-col">
              {/* Terminal Header */}
              <div className="bg-gray-900 p-2 border-b border-gray-800 flex items-center justify-between">
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <span>System Terminal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              {/* Terminal Output */}
              <div 
                ref={terminalRef}
                className="flex-1 p-2 font-mono text-xs text-green-500 font-light overflow-y-auto"
                style={{
                  background: `url('https://www.transparenttextures.com/patterns/escheresque-dark.png')`,
                  backgroundSize: '10px 10px'
                }}
              >
                {terminalHistory.map((entry, index) => (
                  <div key={index} className="py-1">
                    <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                    <span className={
                      entry.type === 'error' 
                        ? 'text-red-500' 
                        : entry.type === 'warning'
                          ? 'text-yellow-500'
                          : entry.type === 'success'
                            ? 'text-green-500'
                            : 'text-green-400'
                    }>
                      {entry.message}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* System Info */}
              <div className="bg-gray-900 py-1 px-2 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500">HIPS v3.7.2</span>
                <span className="text-xs text-gray-500">Connections: {systemMetrics.activeConnections}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Message Input */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <input
              type="text"
              ref={messageInputRef}
              value={newMessage}
              onChange={handleMessageChange}
              placeholder="Type your secure message..."
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
            <motion.button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                isLoading || !newMessage.trim()
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
              disabled={isLoading || !newMessage.trim()}
              whileHover={{ scale: isLoading || !newMessage.trim() ? 1 : 1.05 }}
              whileTap={{ scale: isLoading || !newMessage.trim() ? 1 : 0.95 }}
            >
              {isLoading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span>Encrypting...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>Send Encrypted</span>
                </>
              )}
            </motion.button>
          </form>
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Military-grade AES-256 encryption | HIPS Protocol v3.7.2</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Business Website Components for Modern Art Gallery
  const HeroSection = () => (
    <section className="pt-28 lg:pt-36 pb-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="text-black">Atlas</span> Modern <span className="text-black">Art</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 mb-8 max-w-lg"
            >
              Experience contemporary art in a space designed for reflection, inspiration, and cultural discourse.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                onClick={() => handleNavigation('exhibitions')}
              >
                Current Exhibitions
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg shadow-lg border border-gray-200 transition-all"
                onClick={() => handleNavigation('visit')}
              >
                Plan Your Visit
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 grid grid-cols-3 gap-8"
            >
              {[
                { value: '15+', label: 'New Artists' },
                { value: '200+', label: 'Artworks' },
                { value: 'Weekly', label: 'Events' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1594066221050-e78b342718e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Modern Art Gallery" 
                className="w-full h-auto"
              />
            </div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="22" y1="12" x2="18" y2="12"></line>
                  <line x1="6" y1="12" x2="2" y2="12"></line>
                  <line x1="12" y1="6" x2="12" y2="2"></line>
                  <line x1="12" y1="22" x2="12" y2="18"></line>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Open Now</div>
                <div className="text-xs text-gray-500">Tue-Sun: 10am - 8pm</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const ExhibitionsSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Current Exhibitions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in our carefully curated exhibitions from renowned artists
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Echoes of Abstraction",
              artist: "Elena Rivers",
              dates: "Jan 15 - Mar 30, 2025",
              description: "A vivid exploration of form and color through abstract expressionism.",
              image: "https://images.unsplash.com/photo-1544669646-a5f8d7f78df5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Digital Frontiers",
              artist: "Collective: Binary",
              dates: "Feb 10 - Apr 20, 2025",
              description: "Interactive digital installations examining the relationship between technology and humanity.",
              image: "https://images.unsplash.com/photo-1573516855577-6df322e6e474?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Concrete Memories",
              artist: "Marcus Zhang",
              dates: "Mar 5 - May 15, 2025",
              description: "Urban photography capturing the poetry of metropolitan architecture and daily life.",
              image: "https://images.unsplash.com/photo-1557182606-a0e9839ff389?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Fragmented Reality",
              artist: "Sofia Hernandez",
              dates: "Feb 15 - Apr 10, 2025",
              description: "Mixed media installations exploring perception, memory, and identity.",
              image: "https://images.unsplash.com/photo-1576153853265-6a5b75e73e2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Silent Conversations",
              artist: "James Porter",
              dates: "Mar 20 - May 25, 2025",
              description: "Minimalist sculptures that invite the viewer to contemplate space and silence.",
              image: "https://images.unsplash.com/photo-1596471372145-8b2713233d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Chromatica",
              artist: "Leila Moon",
              dates: "Jan 25 - Mar 15, 2025",
              description: "An immersive experience of light and color that transforms the gallery space.",
              image: "https://images.unsplash.com/photo-1577083553855-dab44aa88922?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            }
          ].map((exhibition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={exhibition.image} 
                  alt={exhibition.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-1">{exhibition.dates}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{exhibition.title}</h3>
                <p className="text-sm font-medium text-gray-800 mb-3">By {exhibition.artist}</p>
                <p className="text-gray-600 mb-4">{exhibition.description}</p>
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const ArtistsSection = () => (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Artists
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the visionary creators behind our exhibitions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              name: "Elena Rivers",
              specialization: "Abstract Expressionism",
              bio: "Known for her dynamic use of color and form, Rivers' work has been exhibited internationally with pieces in major collections.",
              image: "https://images.unsplash.com/photo-1619855544858-e05e60c9f243?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Marcus Zhang",
              specialization: "Urban Photography",
              bio: "Zhang's photographs capture the intersection of architecture, humanity, and urban landscapes in major cities worldwide.",
              image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Sofia Hernandez",
              specialization: "Mixed Media Installation",
              bio: "Creating immersive environments that challenge perception, Hernandez combines sculpture, sound, and digital elements.",
              image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "James Porter",
              specialization: "Minimalist Sculpture",
              bio: "Porter's work explores the relationship between space, form, and material with an emphasis on clean lines and subtle details.",
              image: "https://images.unsplash.com/photo-1560787313-5dff3307e257?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Leila Moon",
              specialization: "Light Installation",
              bio: "Pioneering the use of LED technology in her immersive installations, Moon creates ethereal experiences of light and color.",
              image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Collective: Binary",
              specialization: "Digital & Interactive Art",
              bio: "A group of digital artists and programmers creating interactive experiences at the intersection of art and technology.",
              image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            }
          ].map((artist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{artist.name}</h3>
                <p className="text-sm font-medium text-gray-500 mb-3">{artist.specialization}</p>
                <p className="text-gray-600">{artist.bio}</p>
                
                <div className="flex justify-end mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 border border-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    View Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const EventsSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for opening receptions, artist talks, workshops, and more
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {[
            {
              title: "Artist Talk: Elena Rivers",
              date: "March 18, 2025",
              time: "6:00 PM - 7:30 PM",
              description: "Join Elena Rivers as she discusses her creative process and the inspiration behind her exhibition 'Echoes of Abstraction'.",
              type: "Talk",
              image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Opening Reception: Concrete Memories",
              date: "March 5, 2025",
              time: "7:00 PM - 10:00 PM",
              description: "Be among the first to experience Marcus Zhang's powerful photographic series with drinks, music, and an exclusive artist Q&A.",
              type: "Reception",
              image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Interactive Workshop: Digital Art Basics",
              date: "March 25, 2025",
              time: "2:00 PM - 5:00 PM",
              description: "A hands-on workshop led by Collective: Binary, exploring digital art creation. Bring your own laptop, software provided.",
              type: "Workshop",
              image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Gallery Tour: Curator's Perspective",
              date: "April 8, 2025",
              time: "1:00 PM - 2:30 PM",
              description: "Our head curator leads an intimate tour of current exhibitions, offering insights into the selection and arrangement of artworks.",
              type: "Tour",
              image: "https://images.unsplash.com/photo-1539447764471-c1b9e4ff8d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            }
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all overflow-hidden"
              whileHover={{ y: -3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-0">
                <div className="md:col-span-1 bg-gray-900 text-white p-6 flex flex-col items-center justify-center text-center min-h-40">
                  <div className="text-sm font-medium">{event.date}</div>
                  <div className="text-xl font-bold mt-1 mb-2">{event.time.split('-')[0]}</div>
                  <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                    {event.type}
                  </div>
                </div>
                
                <div className="md:col-span-4 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Register
                    </motion.button>
                  </div>
                </div>
                
                <div className="hidden md:block md:col-span-1 relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const VisitInfoSection = () => (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium mb-6">
              Visit Us
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Plan Your Visit to Atlas Modern Art
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Hours</h4>
                  <p className="text-gray-600">
                    Tuesday - Sunday: 10:00 AM - 8:00 PM<br />
                    Monday: Closed<br />
                    Late nights (until 10 PM) on Thursdays
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">
                    123 Gallery Place<br />
                    Downtown Arts District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M15 5v2"></path>
                    <path d="M15 11v2"></path>
                    <path d="M15 17v2"></path>
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-2"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Admission</h4>
                  <p className="text-gray-600">
                    Adults: $18<br />
                    Students & Seniors: $12<br />
                    Children under 12: Free<br />
                    Members: Free
                  </p>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Book Tickets
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1565829798338-d367c11ad45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Gallery Interior" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message or subscribe to our newsletter.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@atlasmodern.com</p>
                  <p className="text-gray-600">events@atlasmodern.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (212) 555-7890</p>
                  <p className="text-gray-600">+1 (212) 555-1234</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    123 Gallery Place<br />
                    Downtown Arts District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                {[
                  "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                  "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                ].map((path, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                      <path d={path}></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="tickets">Ticket Booking</option>
                    <option value="events">Events & Programs</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const NewsletterSection = () => (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Stay Updated with Atlas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 mb-0 max-w-xl"
            >
              Subscribe to our newsletter for exhibition announcements, events, and gallery news.
            </motion.p>
          </div>
          
          <div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="mb-6 flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="22" y1="12" x2="18" y2="12"></line>
                  <line x1="6" y1="12" x2="2" y2="12"></line>
                  <line x1="12" y1="6" x2="12" y2="2"></line>
                  <line x1="12" y1="22" x2="12" y2="18"></line>
                </svg>
              </div>
              <span className="text-xl font-bold">Atlas Modern Art</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Dedicated to presenting innovative contemporary art in a thoughtful and accessible environment for all visitors.
            </p>

            <div className="flex gap-4">
              {/* Social media icons */}
              {[
                "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
                "M7 17v-7m0 0V8a5 5 0 0 1 10 0v2a4 4 0 0 1-5 4"
              ].map((path, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d={path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Exhibitions",
              links: [
                "Current Shows",
                "Upcoming",
                "Past Exhibitions",
                "Virtual Tours",
                "Featured Artists"
              ]
            },
            {
              title: "Visit",
              links: [
                "Hours & Admission",
                "Directions",
                "Accessibility",
                "Tours & Groups",
                "Café & Shop"
              ]
            },
            {
              title: "Programs",
              links: [
                "Events Calendar",
                "Artist Talks",
                "Workshops",
                "Educational Programs",
                "Membership"
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="md:col-span-2 lg:col-span-2">
              <h3 className="text-gray-900 font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((item, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-gray-900 font-semibold mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {[
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  ),
                  text: "123 Gallery Place, Downtown Arts District, New York, NY 10001"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  ),
                  text: "info@atlasmodern.com"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  ),
                  text: "+1 (212) 555-7890"
                }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-400">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Atlas Modern Art. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            {[
              "Terms",
              "Privacy",
              "Cookies"
            ].map((item, idx) => (
              <a key={idx} href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  // Add CSS
  const globalStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #111827;
      line-height: 1.5;
    }
    
    /* Navigation Links */
    .nav-link {
      position: relative;
      padding: 6px 12px;
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: #111827;
      transition: width 0.3s ease;
    }
    
    .nav-link:hover::after, 
    .nav-link.active::after {
      width: 100%;
    }
    
    .nav-link:hover {
      color: #111827;
    }
    
    .nav-link.active {
      color: #111827;
    }
  `;

  // Main render
  return (
    <div className="font-sans">
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Add the styles */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Secure Portal */}
      <AnimatePresence>
        {showSecurePortal && (
          <SecurePortal />
        )}
      </AnimatePresence>
      
      {/* Security Challenge Modal */}
      <AnimatePresence>
        {showSecurityChallenge && (
          <SecurityChallengeModal />
        )}
      </AnimatePresence>
      
      {/* Login Form */}
      <AnimatePresence>
        {showLoginForm && (
          <LoginForm />
        )}
      </AnimatePresence>
      
      {/* Main Website */}
      {!showSecurePortal && (
        <>
          {/* Navbar */}
          <header 
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 
              ${isScrolled 
                ? 'py-2 bg-white/95 shadow-sm' 
                : 'py-4 bg-transparent'}`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <nav className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('home')}>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center"
                      whileHover={{ rotate: 10 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="22" y1="12" x2="18" y2="12"></line>
                        <line x1="6" y1="12" x2="2" y2="12"></line>
                        <line x1="12" y1="6" x2="12" y2="2"></line>
                        <line x1="12" y1="22" x2="12" y2="18"></line>
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900">Atlas</span>
                    <span className="hidden sm:inline-block text-xs text-gray-500 ml-1">
                      Modern Art
                    </span>
                  </div>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <ul className="flex space-x-1">
                    <NavItem to="home" active={currentView === 'home'}>Home</NavItem>
                    <NavItem to="exhibitions" active={currentView === 'exhibitions'}>Exhibitions</NavItem>
                    <NavItem to="artists" active={currentView === 'artists'}>Artists</NavItem>
                    <NavItem to="visit" active={currentView === 'visit'}>Visit</NavItem>
                  </ul>
                </div>
                
                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </motion.button>
                  
                  {/* Mobile menu button */}
                  <motion.button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {menuOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    )}
                  </motion.button>
                </div>
              </nav>
            </div>
            
            {/* Mobile Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto px-6 py-4">
                    <ul className="space-y-3">
                      {['home', 'exhibitions', 'artists', 'visit'].map((item) => (
                        <li key={item}>
                          <a
                            href={`#${item}`}
                            className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200
                              ${currentView === item 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item as any);
                            }}
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
          
          {/* Main Content */}
          {currentView === 'home' && (
            <>
              <HeroSection />
              <ExhibitionsSection />
              <EventsSection />
              <NewsletterSection />
            </>
          )}
          
          {currentView === 'exhibitions' && (
            <>
              {/* Hero for Exhibitions */}
              <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium mb-6"
                    >
                      What's On
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-5xl font-bold text-gray-900 mb-6"
                    >
                      Current Exhibitions
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-gray-600"
                    >
                      Explore our dynamic exhibitions showcasing contemporary artistic voices
                    </motion.p>
                  </div>
                </div>
              </section>
              
              <ExhibitionsSection />
              <ArtistsSection />
            </>
          )}
          
          {currentView === 'artists' && (
            <>
              {/* Hero for Artists */}
              <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium mb-6"
                    >
                      The Creators
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-5xl font-bold text-gray-900 mb-6"
                    >
                      Featured Artists
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-gray-600"
                    >
                      Meet the visionaries whose work drives the contemporary art conversation
                    </motion.p>
                  </div>
                </div>
              </section>
              
              <ArtistsSection />
              <EventsSection />
            </>
          )}
          
          {currentView === 'visit' && (
            <>
              {/* Hero for Visit */}
              <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium mb-6"
                    >
                      Plan Your Visit
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-5xl font-bold text-gray-900 mb-6"
                    >
                      Visit Atlas Modern Art
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-gray-600"
                    >
                      Everything you need to know to make the most of your gallery experience
                    </motion.p>
                  </div>
                </div>
              </section>
              
              <VisitInfoSection />
              <ContactSection />
            </>
          )}
          
          <Footer />
          
          {/* Hidden Secret Triggers for Portal Access */}
          {/* Alt+Shift+A to access portal */}
          <div className="hidden">The secret key combination is Alt+Shift+A</div>
          
          {/* Easter egg sequence: up, down, left, right, a */}
          <div className="hidden">Or try the sequence: ↑↓←→a</div>
          
          {/* Konami code sequence */}
          <div className="hidden">Or try the Konami code: ↑↑↓↓←→←→ba</div>
          
          {/* Triple-click on logo */}
          <div 
            className="fixed top-4 left-[70px] w-16 h-16 opacity-0 cursor-pointer"
            onDoubleClick={(e) => {
              // Need to stop propagation
              e.stopPropagation();
              
            }}
          />
          
          {/* Double-click in the bottom-right corner */}
          <div
            className="fixed bottom-8 right-8 w-16 h-16 opacity-0 cursor-pointer"
            onDoubleClick={() => setShowSecurityChallenge(true)}
          />
          
          {/* Hidden button in the footer */}
          <div 
            className="fixed bottom-2 left-2 w-4 h-4 opacity-0"
            onClick={(e) => {
              // Only trigger if holding Shift key
              if (e.shiftKey) {
                setShowSecurityChallenge(true);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default App;