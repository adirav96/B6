'use client';

import { useRouter } from 'next/navigation';
import { LANDING_CONTENT } from '@/content/landingContent';

export default function Landing() {
  const router = useRouter();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-bl from-indigo-900 via-purple-900 to-indigo-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <i className="fas fa-code text-indigo-300 text-4xl"></i>
            <span className="font-bold text-3xl text-white">{LANDING_CONTENT.brand}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {LANDING_CONTENT.titleLine1}<br />
            <span className="text-indigo-300">{LANDING_CONTENT.titleLine2}</span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            {LANDING_CONTENT.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-sign-in-alt ml-2"></i>
              {LANDING_CONTENT.loginButton}
            </button>
            <button
              onClick={() => router.push('/register')}
              className="border-2 border-indigo-400 text-indigo-200 hover:bg-indigo-800 font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              <i className="fas fa-user-plus ml-2"></i>
              {LANDING_CONTENT.registerButton}
            </button>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 mt-24">
          {LANDING_CONTENT.features.map((feature) => (
            <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="bg-indigo-500/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className={`${feature.icon} text-3xl text-indigo-300`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-indigo-200">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-20 text-center">
          {LANDING_CONTENT.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="text-indigo-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
