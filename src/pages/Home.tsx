import React from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { FeaturedProject } from '../components/FeaturedProject';
import { cmsService, Project, SiteSettings } from '../services/cms';
import { motion } from 'motion/react';
import { Sparkles, Video, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      cmsService.getProjects(),
      cmsService.getSettings()
    ]).then(([pData, sData]) => {
      setProjects(pData.slice(0, 6));
      setSettings(sData);
      setLoading(false);
    });
  }, []);

  const services = [
    {
      title: 'Cinematic Production',
      description: '압도적인 영상미와 깊이 있는 스토리텔링으로 브랜드의 가치를 시각화합니다.',
      icon: <Video className="text-brand-blue" size={32} />,
      tags: ['Commercials', 'Music Videos', 'Documentaries']
    },
    {
      title: 'AI Visual Innovation',
      description: '최첨단 AI 생성 기술을 활용하여 상상 그 이상의 이미지를 창조합니다.',
      icon: <Sparkles className="text-brand-blue" size={32} />,
      tags: ['AI Art', 'Virtual Production', 'Generative Design']
    },
    {
      title: 'Brand Visual Identity',
      description: '브랜드의 본질을 꿰뚫는 디자인으로 강력한 시각적 언어를 구축합니다.',
      icon: <Palette className="text-brand-blue" size={32} />,
      tags: ['Logo Design', 'UI/UX', 'Motion Graphics']
    }
  ];

  return (
    <Layout>
      <Hero settings={settings} />

      {/* Intro Section - More immersive and centered */}
      <section className="py-48 px-6 bg-brand-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-12"
          >
            우리는 기술과 예술이 만나는 <br/>
            <span className="text-white/20 italic">어디에서나 존재합니다.</span>
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light mb-16">
              And Picture Works는 정형화된 틀을 거부합니다. 우리는 최신 AI 기술을 크리에이티브 프로세스에 
              완벽하게 녹여내어, 이전에는 불가능했던 속도와 퀄리티의 비주얼을 제공합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight text-white">120+</p>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-2">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight text-white">15+</p>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-2">Awards</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight text-white">98%</p>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-2">Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project [리토노소어] */}
      <FeaturedProject title="리토노소어" youtubeId="yj83Vq-FFkk" />

      {/* Featured Portfolio - Clean & Breathable */}
      <section className="py-40 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
          <span className="text-brand-blue text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">Selected Works</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">ELEVATING BRANDS</h2>
          <div className="w-12 h-[1px] bg-brand-blue/30 mb-8"></div>
          <Link to="/portfolio" className="text-[11px] font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-3 group">
            DISCOVER ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="px-6 md:px-12">
          <PortfolioGrid projects={projects} loading={loading} />
        </div>
      </section>

      {/* New Concept: Feature Showcase (White Background, high contrast like LAMY site) */}
      <section className="py-48 px-6 bg-white text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[10px] text-black/40 font-bold tracking-[0.5em] uppercase mb-10 block">Innovation</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-16 leading-[0.9] text-black">
                ARTIFICIAL <br/> INTELLIGENCE
              </h2>
              <div className="space-y-12 max-w-lg">
                <p className="text-xl text-black/60 leading-relaxed font-light">
                  단순한 자동화를 넘어선 창의적 파트너로서의 AI. 우리는 기계의 계산과 인간의 영감을 결합하여 새로운 시각적 문법을 제안합니다.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                    <Sparkles size={18} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Generative Process</h4>
                    <p className="text-sm text-black/50 leading-relaxed">수만 번의 반복을 통한 단 하나의 완벽한 픽셀.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="aspect-[4/5] bg-neutral-100 relative group overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop" 
                  alt="AI Art" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Centered Detail Style */}
      <section className="py-48 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">Capabilities</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">THE CORE VALUES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-brand-blue transition-colors duration-500 overflow-hidden relative">
                   <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors" />
                   {service.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-6 text-white group-hover:text-brand-blue transition-colors">{service.title}</h3>
                <p className="text-white/40 text-base leading-relaxed mb-8 font-light max-w-xs">
                  {service.description}
                </p>
                <div className="h-px w-0 group-hover:w-full bg-brand-blue/50 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-brand-blue p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 relative z-10">
            상상을 현실로 만드는 <br className="md:hidden"/> 여정을 시작하세요.
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium relative z-10">
            귀하의 비즈니스를 위한 최상의 비주얼 솔루션을 제안합니다. 지금 바로 전문가와 상담하세요.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-5 bg-white text-brand-blue font-black tracking-widest text-sm hover:scale-105 transition-transform relative z-10"
          >
            LET'S TALK
          </Link>
        </div>
      </section>
    </Layout>
  );
};
