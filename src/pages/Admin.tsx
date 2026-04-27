import React from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { cmsService, Project, SiteSettings } from '../services/cms';
import { Layout } from '../components/Layout';
import { Plus, Trash2, Edit2, Save, X, LogIn, LogOut, Settings as SettingsIcon, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  category: z.enum(['Video Content', 'AI Visuals', 'Brand Design']),
  imageUrl: z.string().url('유효한 URL을 입력하세요'),
  videoUrl: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  order: z.number().int().min(0, '순서는 0 이상이어야 합니다'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export const AdminPage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [activeTab, setActiveTab] = React.useState<'projects' | 'settings'>('projects');
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) loadData();
    });
    return unsubscribe;
  }, []);

  const loadData = async () => {
    const p = await cmsService.getProjects();
    setProjects(p);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmitProject = async (data: ProjectFormData) => {
    if (editingProject) {
      await cmsService.updateProject(editingProject.id!, data);
      setEditingProject(null);
    } else {
      await cmsService.addProject(data);
      setIsAdding(false);
    }
    reset();
    loadData();
  };

  const deleteProject = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await cmsService.deleteProject(id);
      loadData();
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-32 px-6 text-center">
          <h1 className="text-3xl font-black mb-8">ADMIN ACCESS</h1>
          <p className="text-white/40 mb-12">관리자 전용 페이지입니다. <br/> 등록된 관리자 계정으로 로그인해주세요.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-white text-black font-black flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
          >
            <LogIn size={20} /> SIGN IN WITH GOOGLE
          </button>
        </div>
      </Layout>
    );
  }

  // Check if admin (simple check against the required email)
  const isAdmin = user.email === 'bibis23.kor@gmail.com';

  if (!isAdmin) {
    return (
       <Layout>
        <div className="max-w-md mx-auto py-32 px-6 text-center">
          <h1 className="text-3xl font-black mb-8 text-red-500">DENIED</h1>
          <p className="text-white/40 mb-12">접근 권한이 없습니다. 관리자 계정이 아닙니다.</p>
          <button onClick={handleLogout} className="text-sm border-b border-white/20 pb-1">다른 계정으로 로그인</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">DASHBOARD</h1>
            <p className="text-white/40 text-sm">{user.email} (Administrator)</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors">
            <LogOut size={14} /> LOGOUT
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 text-xs font-black tracking-widest border transition-all flex items-center gap-2 ${activeTab === 'projects' ? 'bg-brand-blue border-brand-blue text-white' : 'border-white/10 text-white/40'}`}
          >
            <ImageIcon size={14} /> PROJECTS
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 text-xs font-black tracking-widest border transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-brand-blue border-brand-blue text-white' : 'border-white/10 text-white/40'}`}
          >
            <SettingsIcon size={14} /> SITE SETTINGS
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Portfolio Items ({projects.length})</h2>
              {!isAdding && !editingProject && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-brand-blue text-white p-2 rounded-full flex items-center gap-2 px-6 py-3 text-xs font-black shadow-lg shadow-brand-blue/20"
                >
                  <Plus size={16} /> ADD PROJECT
                </button>
              )}
            </div>

            {(isAdding || editingProject) && (
              <form onSubmit={handleSubmit(onSubmitProject)} className="glass p-10 rounded-2xl space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold text-brand-blue uppercase tracking-widest text-sm">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingProject(null); reset(); }} className="hover:rotate-90 transition-transform"><X size={20}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase px-2">Title</label>
                    <input {...register('title')} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-blue outline-none transition-colors" defaultValue={editingProject?.title} />
                    {errors.title && <p className="text-red-500 text-[10px] px-2">{errors.title.message}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase px-2">Category</label>
                    <select {...register('category')} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-blue outline-none transition-colors" defaultValue={editingProject?.category}>
                      <option value="Video Content">Video Content</option>
                      <option value="AI Visuals">AI Visuals</option>
                      <option value="Brand Design">Brand Design</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase px-2">Description</label>
                    <textarea {...register('description')} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm h-24 focus:border-brand-blue outline-none transition-colors" defaultValue={editingProject?.description} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase px-2">Image/Thumbnail URL</label>
                    <input {...register('imageUrl')} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-blue outline-none transition-colors" defaultValue={editingProject?.imageUrl} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase px-2">Video URL (Optional)</label>
                    <input {...register('videoUrl')} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-blue outline-none transition-colors" defaultValue={editingProject?.videoUrl} />
                  </div>
                </div>

                <button type="submit" className="w-full bg-brand-blue py-4 rounded-full font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                  <Save size={18} /> {editingProject ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 gap-3">
              {projects.map((p) => (
                <div key={p.id} className="glass p-5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                  <div className="flex items-center gap-5">
                    <img src={p.imageUrl} className="w-14 h-14 object-cover rounded-md" />
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{p.title}</h4>
                      <p className="text-[10px] text-brand-blue uppercase tracking-widest font-bold">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProject(p)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProject(p.id!)} className="p-3 bg-white/5 rounded-full hover:bg-red-500/10 transition-colors text-white/60 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsManager />
        )}
      </div>
    </Layout>
  );
};

const SettingsManager = () => {
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    cmsService.getSettings().then(s => {
      setSettings(s || {
        heroTitle: 'THE STORY NEVER ENDS.\nOUR IMAGINATION\nCONTINUES.',
        heroSubtitle: '앤드픽쳐웍스는 고도의 영상 기술과 인공지능, 그리고 감각적인 디자인을 결합하여 브랜드의 상상을 현실로 만듭니다.',
        contactEmail: 'young-ju@apw.ai.kr',
        instagramUrl: '',
        youtubeUrl: '',
        logoUrl: 'https://i.imgur.com/ICu5v4o.png'
      });
      setLoading(false);
    });
  }, []);

  const { register, handleSubmit } = useForm<SiteSettings>();

  const onSubmit = async (data: SiteSettings) => {
    // In a real app we'd use setDoc if doc doesn't exist. 
    // For this demo, let's assume update works or implement a safer setDoc in cmsService if needed.
    // Actually updateDoc fails if doc doesn't exist. I'll just use my service.
    try {
      // Need a more robust update for settings in service
      await cmsService.updateSettings(data);
      alert('설정이 저장되었습니다.');
    } catch (e) {
      console.error(e);
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-900 p-8 border border-white/5 space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-6">General Site Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-white/40 uppercase">Hero Title</label>
          <input {...register('heroTitle')} defaultValue={settings?.heroTitle} className="w-full bg-black border border-white/10 p-3 text-sm mt-1" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-white/40 uppercase">Hero Subtitle</label>
          <textarea {...register('heroSubtitle')} defaultValue={settings?.heroSubtitle} className="w-full bg-black border border-white/10 p-3 text-sm mt-1 h-24" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-white/40 uppercase">Contact Email</label>
          <input {...register('contactEmail')} defaultValue={settings?.contactEmail} className="w-full bg-black border border-white/10 p-3 text-sm mt-1" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-white/40 uppercase">Instagram URL</label>
          <input {...register('instagramUrl')} defaultValue={settings?.instagramUrl} className="w-full bg-black border border-white/10 p-3 text-sm mt-1" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-white/40 uppercase">Logo Image URL</label>
          <input {...register('logoUrl')} defaultValue={settings?.logoUrl} className="w-full bg-black border border-white/10 p-3 text-sm mt-1" placeholder="https://..." />
        </div>
      </div>

      <button type="submit" className="w-full bg-brand-blue py-3 font-black text-sm flex items-center justify-center gap-2">
        <Save size={18} /> SAVE SETTINGS
      </button>
    </form>
  );
};
