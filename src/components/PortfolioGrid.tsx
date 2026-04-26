import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../services/cms';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface PortfolioGridProps {
  projects: Project[];
  loading?: boolean;
}

export const PortfolioGrid = ({ projects, loading }: PortfolioGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-12 max-w-[1400px] mx-auto pb-24">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn(
            "bg-white/5 animate-pulse rounded-sm",
            i % 3 === 1 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/5]"
          )} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-white/40">
        등록된 프로젝트가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-12 max-w-[1400px] mx-auto pb-24">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "group relative overflow-hidden bg-neutral-900 border border-white/5",
            index % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/5]"
          )}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase mb-4 block">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-2 mb-10 max-w-xl font-light">
                {project.description}
              </p>
              
              <Link 
                to={`/projects/${project.id}`}
                className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-white border-b border-white/20 pb-1 hover:border-brand-blue hover:text-brand-blue transition-all"
              >
                VIEW CASE STUDY <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
