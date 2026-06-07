import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-bl from-indigo-900 via-purple-900 to-indigo-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <i className="fas fa-code text-indigo-300 text-4xl"></i>
            <span className="font-bold text-3xl text-white">CodeInterview</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            הכנה חכמה לראיונות<br />
            <span className="text-indigo-300">טכניים בפייתון</span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            תרגול אינטראקטיבי עם בוט AI שמדמה מראיין אמיתי - 
            קבלו פידבק מיידי, רמזים חכמים, והכוונה אישית לקראת המשרה הראשונה שלכם
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-rocket ml-2"></i>
              התחילו לתרגל בחינם
            </button>
            <button
              onClick={scrollToFeatures}
              className="border-2 border-indigo-400 text-indigo-200 hover:bg-indigo-800 font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              <i className="fas fa-play-circle ml-2"></i>
              צפו בהדגמה
            </button>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="bg-indigo-500/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-robot text-3xl text-indigo-300"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">מראיין AI חכם</h3>
            <p className="text-indigo-200">בוט שמתנהג כמו מראיין אמיתי - שואל שאלות המשך, נותן רמזים ומעריך את הגישה שלכם</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="bg-indigo-500/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chart-line text-3xl text-indigo-300"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">מעקב התקדמות</h3>
            <p className="text-indigo-200">דשבורד אישי עם סטטיסטיקות, זיהוי חולשות והמלצות ממוקדות לשיפור</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="bg-indigo-500/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-graduation-cap text-3xl text-indigo-300"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">למידה מותאמת</h3>
            <p className="text-indigo-200">שאלות בדרגות קושי שונות עם הסברים מפורטים ופתרונות אלטרנטיביים</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-20 text-center">
          <div>
            <div className="text-4xl font-extrabold text-white">500+</div>
            <div className="text-indigo-300 mt-1">שאלות תרגול</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white">12,000+</div>
            <div className="text-indigo-300 mt-1">סטודנטים פעילים</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white">89%</div>
            <div className="text-indigo-300 mt-1">אחוז הצלחה בראיונות</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white">4.8/5</div>
            <div className="text-indigo-300 mt-1">דירוג משתמשים</div>
          </div>
        </div>
      </div>
    </div>
  );
}
