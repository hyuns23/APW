/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { AdminPage } from './pages/Admin';
import { Layout } from './components/Layout';

// Simple placeholder pages
const PortfolioPage = () => {
  return (
    <Layout>
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter mb-12">PORTFOLIO</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
           {/* We could reuse PortfolioGrid but for simplicity let's just use home for now or implement full list */}
           <div className="p-20 text-center text-white/20 border border-white/5">FULL PORTFOLIO COMING SOON</div>
        </div>
      </div>
    </Layout>
  );
};

const ServicesPage = () => {
  return (
    <Layout>
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter mb-12">SERVICES</h1>
        <div className="p-20 text-center text-white/20 border border-white/5 uppercase tracking-widest font-bold">Comprehensive creative services for the modern brand</div>
      </div>
    </Layout>
  );
};

const ContactPage = () => {
  return (
    <Layout>
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter mb-12">GET IN TOUCH</h1>
        <div className="max-w-2xl bg-neutral-900 border border-white/5 p-12">
          <p className="text-xl text-white/60 mb-12">
            새로운 프로젝트를 계획 중이신가요?<br />
            앤드픽처웍스는 귀하의 성공적인 비즈니스를<br />
            지원하는 파트너 입니다.
          </p>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-brand-blue uppercase tracking-widest">Email</p>
              <p className="text-2xl font-black">young-ju@apw.ai.kr</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-brand-blue uppercase tracking-widest">Phone</p>
              <p className="text-2xl font-black">032.223.4019</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}
