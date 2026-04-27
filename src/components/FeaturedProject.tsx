import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface FeaturedProjectProps {
  title: string;
  youtubeId: string;
}

export const FeaturedProject = ({ title, youtubeId }: FeaturedProjectProps) => {
  const thumbnails = [
    "https://img.youtube.com/vi/yj83Vq-FFkk/hq1.jpg",
    "https://img.youtube.com/vi/yj83Vq-FFkk/hq2.jpg",
    "https://img.youtube.com/vi/yj83Vq-FFkk/hq3.jpg",
    "https://img.youtube.com/vi/yj83Vq-FFkk/maxresdefault.jpg"
  ];

  return (
    <section className="py-32 px-6 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-brand-blue text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Special Feature</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase italic">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 4 Thumbnails */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 lg:order-1">
            {thumbnails.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="aspect-square bg-neutral-900 border border-white/5 overflow-hidden group"
              >
                <img 
                  src={src} 
                  alt={`Cut ${i + 1}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Video Player */}
          <div className="lg:col-span-8 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-neutral-900 border border-white/5 relative group overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&loop=1&playlist=${youtubeId}`}
                title={title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Project Overview</p>
                <p className="text-white/60 text-sm mt-2 max-w-md">
                  현장의 생생함을 그대로 담아낸 프로젝트 리토노소어. 
                  실제 프로덕션 단계에서의 정교한 연출과 비주얼 퀄리티를 확인하실 수 있습니다.
                </p>
              </div>
              <div className="text-right">
                <span className="text-brand-blue text-xs font-black italic">#PRODUCTION #CINEMATIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
