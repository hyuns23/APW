import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteSettings } from '../services/cms';
import { BackgroundMotion } from './BackgroundMotion';

export const Hero = ({ settings }: { settings?: SiteSettings | null }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden border-b border-white/5 bg-brand-black">
      <BackgroundMotion />
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 z-10 w-full text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <span className="inline-block px-5 py-1.5 mb-10 text-[10px] font-bold tracking-[0.5em] border border-white/10 text-white/50 uppercase bg-white/5 rounded-full backdrop-blur-md">
            New Media Visual Creative
          </span>
          <h1 className="text-[44px] md:text-[72px] lg:text-[84px] xl:text-[96px] leading-[1.05] font-bold mb-10 tracking-tighter whitespace-pre-line text-white/95">
            {settings?.heroTitle || "THE STORY NEVER ENDS.\nOUR IMAGINATION\nCONTINUES."}
          </h1>
          <p className="text-base md:text-xl text-white/40 max-w-2xl leading-relaxed font-light mb-14">
            {settings?.heroSubtitle || "앤드 픽처 웍스는 최첨단 AI 기술과 감각적인 영상미를 결합하여 브랜드의 가치를 시각적으로 극대화하는 프리미엄 비주얼 에이전시입니다."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <Link 
              to="/projects"
              className="group relative bg-white text-black px-12 py-5 text-[11px] font-black tracking-[0.2em] flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              EXPLORE WORKS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">EST. 2024</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Accents similar to Neosmartpen style */}
      <div className="absolute left-12 bottom-12 hidden lg:block">
        <div className="flex flex-col gap-4 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase vertical-text">
          <span>Scroll to Discover</span>
        </div>
      </div>

      <div className="absolute right-12 bottom-12 hidden lg:block">
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-bold tracking-widest text-white/30">AND PICTURE WORKS ©</div>
        </div>
      </div>
    </section>
  );
};
