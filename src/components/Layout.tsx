import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

import { cmsService, SiteSettings } from '../services/cms';

export const Header = ({ settings }: { settings: SiteSettings | null }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'WORKS', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      scrolled ? "h-20 bg-brand-black/90 backdrop-blur-xl border-b border-white/5" : "h-24 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center group h-full">
          <img 
            src={settings?.logoUrl || "https://i.imgur.com/ICu5v4o.png"} 
            alt="AND PICTURE WORKS" 
            className="h-4 md:h-5 w-auto object-contain transition-all" 
            onError={(e) => {
              e.currentTarget.src = "/logo.png"; // Local fallback
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[10px] font-bold tracking-[0.3em] transition-all hover:text-brand-blue",
                location.pathname === item.path ? "text-white" : "text-white/40"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contact" className="ml-4 px-6 py-2.5 text-[10px] font-bold tracking-widest border border-white/10 hover:border-brand-blue transition-all uppercase rounded-full">
            START 
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/60 hover:text-white">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-brand-black z-[60] flex flex-col items-center justify-center gap-12"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-white/40"><X size={32} /></button>
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold tracking-tighter"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = ({ settings }: { settings: SiteSettings | null }) => {
  return (
    <footer className="py-20 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-6">
            <h3 className="text-2xl font-bold tracking-tighter text-white mb-8">Ready to define <br/> your visual identity?</h3>
            <Link to="/contact" className="text-sm font-bold tracking-widest text-brand-blue border-b border-brand-blue/30 pb-1 hover:border-brand-blue transition-all">
              LET'S COLLABORATE
            </Link>
          </div>
          <div className="md:col-span-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-6 block">STUDIO</span>
            <p className="text-xs text-white/40 leading-relaxed">
              Seoul, Republic of Korea<br/>
              Songpa-gu, etc.<br/>
              hello@andpicture.works
            </p>
          </div>
          <div className="md:col-span-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-6 block">SOCIAL</span>
            <div className="flex flex-col gap-3">
              {['Instagram', 'Youtube', 'Linkedin'].map(social => (
                <a key={social} href="#" className="text-xs text-white/40 hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6">
          <div className="flex items-center">
            <img 
              src={settings?.logoUrl || "https://i.imgur.com/ICu5v4o.png"} 
              alt="AND PICTURE WORKS" 
              className="h-3 w-auto object-contain opacity-50 grayscale hover:grayscale-0 transition-all" 
            />
          </div>
          <p className="text-[10px] text-white/20 tracking-widest">© 2026 ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);

  React.useEffect(() => {
    cmsService.getSettings().then(setSettings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-brand-black overflow-hidden mesh-gradient">
      {/* Background Mesh Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-1000"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-blue rounded-full blur-[100px] opacity-10 pointer-events-none transition-all duration-1000"></div>

      <Header settings={settings} />
      <main className="flex-grow z-10">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { settings });
          }
          return child;
        })}
      </main>
      <Footer settings={settings} />
    </div>
  );
};
