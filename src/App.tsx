/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { STATIC_BLOGS, Blog } from './data/blogs';
import { 
  Play, 
  Calendar, 
  Newspaper, 
  Settings, 
  Trophy, 
  Bell, 
  Search,
  TrendingUp,
  Clock,
  Tv,
  Maximize,
  Minimize,
  Share2,
  ChevronRight,
  Shield,
  Info,
  FileText,
  X,
  User,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for the app
const CHANNELS = [
  { id: 'ptv', name: 'PTV Sports', url: 'https://streamcrichd.com/update/ptv.php' },
  { id: 'sky', name: 'Sky Sports 2', url: 'https://streamcrichd.com/update/skys2.php' },
  { id: 'star', name: 'Star Sports 1 Hindi', url: 'https://streamcrichd.com/update/star1hi.php' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('live');
  const [isLive, setIsLive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0]);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const docs: Record<string, { title: string, content: string, icon: any }> = {
    disclaimer: {
      title: 'Disclaimer',
      icon: Info,
      content: 'CricStream Live is a platform that provides links to publicly available cricket streams. We do not host any content ourselves. All streams are the property of their respective owners. We are not responsible for the content or availability of these external streams. Use of this application is at your own risk.'
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      content: 'We respect your privacy. CricStream Live does not collect, store, or share any personal data from its users. We may use local browser storage only to save your preferences, such as your last selected channel, to improve your experience. No information is transmitted to external servers.'
    },
    services: {
      title: 'Our Services',
      icon: FileText,
      content: 'CricStream Live offers a unified interface for cricket enthusiasts. Our services include real-time access to live streaming links, curated cricket news, match schedules, and performance statistics. We strive to provide the most reliable and up-to-date information for the global cricket community.'
    }
  };

  const toggleFullScreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CricStream Live',
          text: 'Watching live cricket on CricStream!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch('/api/auth/url');
      const { url } = await res.json();
      window.open(url, 'google_login', 'width=500,height=600');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Guest login error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setActiveTab('live');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchUser();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-100 w-full max-w-7xl mx-auto relative overflow-hidden shadow-2xl border-x border-white/5 items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20">
            <Trophy className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Welcome to CricStream</h1>
          <p className="text-zinc-400 mb-12 text-lg">Your ultimate destination for live cricket and expert insights.</p>
          
          <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors shadow-xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
            <button 
              onClick={handleGuestLogin}
              className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors"
            >
              Continue as Guest
            </button>
          </div>
          
          <p className="mt-12 text-xs text-zinc-500">
            By continuing, you agree to our <button onClick={() => setViewingDoc('privacy')} className="text-emerald-400">Privacy Policy</button> and <button onClick={() => setViewingDoc('services')} className="text-emerald-400">Terms of Service</button>.
          </p>
        </motion.div>

        {/* Decorative background elements */}
        <div className="fixed top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Document Viewer Modal */}
        <AnimatePresence>
          {viewingDoc && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0a0a0a] w-full max-w-2xl max-h-[80vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
              >
                <header className="px-6 pt-8 pb-6 flex justify-between items-center border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      {React.createElement(docs[viewingDoc].icon, { className: "w-5 h-5 text-emerald-400" })}
                    </div>
                    <h2 className="text-xl font-bold">{docs[viewingDoc].title}</h2>
                  </div>
                  <button 
                    onClick={() => setViewingDoc(null)}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-400" />
                  </button>
                </header>
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      {docs[viewingDoc].content}
                    </p>
                  </div>
                </div>
                <footer className="p-8 border-t border-white/5">
                  <button 
                    onClick={() => setViewingDoc(null)}
                    className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-colors"
                  >
                    Got it
                  </button>
                </footer>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-100 w-full max-w-7xl mx-auto relative overflow-hidden shadow-2xl border-x border-white/5">
      {/* Header */}
      <header className="px-6 md:px-12 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-lg z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">CricStream</h1>
        </div>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Search className="w-5 h-5 text-zinc-400" />
          </button>
          <button 
            onClick={() => setActiveTab(activeTab === 'settings' ? 'live' : 'settings')}
            className={`p-2 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-white/5 text-zinc-400'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 pb-8 overflow-y-auto">
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Live Player Section */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Live Now</h2>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{selectedChannel.name}</span>
                </div>
                
                <motion.div 
                  ref={playerContainerRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-video glass-card overflow-hidden shadow-2xl group"
                >
                  <iframe 
                    key={selectedChannel.id}
                    src={selectedChannel.url} 
                    width="100%" 
                    height="100%" 
                    className="absolute inset-0"
                    frameBorder="0" 
                    allowFullScreen 
                    allow="encrypted-media"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    title={selectedChannel.name}
                  ></iframe>
                  
                  {/* Overlay for better mobile feel */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                      <Tv className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">HD Stream</span>
                    </div>
                  </div>

                  {/* Fullscreen Toggle Button */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button 
                      onClick={handleShare}
                      className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      onClick={toggleFullScreen}
                      className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize className="w-4 h-4 text-white" />
                      ) : (
                        <Maximize className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </motion.div>
                
                <div className="mt-4 p-4 glass-card">
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {CHANNELS.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                          selectedChannel.id === channel.id
                            ? 'bg-emerald-500 text-black border-emerald-500'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {channel.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1 space-y-8">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: 'Stats', color: 'text-blue-400' },
                  { icon: Calendar, label: 'Fixtures', color: 'text-purple-400' },
                  { icon: Trophy, label: 'Rankings', color: 'text-amber-400' },
                  { icon: Play, label: 'Highlights', color: 'text-red-400' },
                ].map((item, i) => (
                  <button key={i} className="flex items-center gap-4 p-4 glass-card group hover:bg-white/10 transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-medium text-zinc-300">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Blogs Feed */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Insights</h2>
                  <button 
                    onClick={() => setActiveTab('news')}
                    className="text-xs text-emerald-400 font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {STATIC_BLOGS.slice(0, 4).map((blog) => (
                    <button 
                      key={blog.id} 
                      onClick={() => setSelectedBlog(blog)}
                      className="w-full text-left block glass-card p-4 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{blog.category}</span>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-1">{blog.excerpt}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            <Trophy className="w-16 h-16 text-emerald-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-zinc-400 max-w-[250px]">Stay updated with the latest in the world of cricket.</p>
            <button 
              onClick={() => setActiveTab('live')}
              className="mt-8 bg-emerald-500 text-black px-8 py-3 rounded-full font-bold hover:bg-emerald-400 transition-colors"
            >
              Watch Live
            </button>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-bold px-2">Cricket Knowledge Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATIC_BLOGS.map((blog) => (
                <button 
                  key={blog.id} 
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full text-left glass-card p-6 block hover:bg-white/10 transition-colors group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{blog.category}</span>
                    <span className="text-[10px] text-zinc-500">{blog.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-1 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <User className="w-3 h-3" />
                      <span>{blog.author}</span>
                    </div>
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      Read Full <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="py-4 space-y-8">
            <h2 className="text-2xl font-bold px-2">Settings & Info</h2>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Account</h3>
              <div className="glass-card overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center overflow-hidden">
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-black" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-[10px] text-zinc-500">{user.isGuest ? 'Guest Account' : user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-red-400 text-xs font-bold px-4 py-2 rounded-xl bg-red-400/10 hover:bg-red-400/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Legal & Support</h3>
              <div className="glass-card overflow-hidden divide-y divide-white/5">
                {[
                  { id: 'disclaimer', title: 'Disclaimer', icon: Info },
                  { id: 'privacy', title: 'Privacy Policy', icon: Shield },
                  { id: 'services', title: 'Our Services', icon: FileText },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setViewingDoc(item.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-600" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">App Info</h3>
              <div className="glass-card p-4 flex items-center justify-between">
                <span className="text-zinc-400">Version</span>
                <span className="font-mono text-sm">2.4.0-stable</span>
              </div>
            </div>

            <div className="pt-8 text-center">
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Crafted for Cricket Fans</p>
              <p className="text-[10px] text-zinc-700 mt-1">© 2026 CricStream Live</p>
            </div>
          </div>
        )}
      </main>

      {/* Blog Viewer Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[110] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              className="bg-[#0a0a0a] w-full max-w-4xl h-full max-h-[90vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
            >
              <header className="px-6 pt-8 pb-6 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-lg z-10">
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 pr-4"
                >
                  <ArrowLeft className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-medium">Back to Hub</span>
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleShare}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-zinc-400" />
                  </button>
                  <button 
                    onClick={() => setSelectedBlog(null)}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </header>
              
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 md:p-12 max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {selectedBlog.category}
                    </span>
                    <span className="text-[10px] text-zinc-500">{selectedBlog.date}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">{selectedBlog.title}</h1>
                  
                  <div className="flex items-center gap-4 mb-10 p-4 glass-card inline-flex">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                      <User className="w-7 h-7 text-black" />
                    </div>
                    <div>
                      <p className="text-base font-bold">{selectedBlog.author}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest">Cricket Contributor</p>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none blog-content">
                    {selectedBlog.content.split('\n').map((line, i) => {
                      if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-2xl font-bold mt-12 mb-6 text-emerald-400 border-b border-emerald-400/20 pb-2">{line.replace('## ', '')}</h2>;
                      }
                      if (line.trim() === '') return null;
                      return <p key={i} className="text-zinc-300 leading-relaxed text-lg mb-6">{line}</p>;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {viewingDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a0a] w-full max-w-2xl max-h-[80vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
            >
              <header className="px-6 pt-8 pb-6 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    {React.createElement(docs[viewingDoc].icon, { className: "w-5 h-5 text-emerald-400" })}
                  </div>
                  <h2 className="text-xl font-bold">{docs[viewingDoc].title}</h2>
                </div>
                <button 
                  onClick={() => setViewingDoc(null)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </header>
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    {docs[viewingDoc].content}
                  </p>
                </div>
              </div>
              <footer className="p-8 border-t border-white/5">
                <button 
                  onClick={() => setViewingDoc(null)}
                  className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-colors"
                >
                  Got it
                </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="fixed top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
