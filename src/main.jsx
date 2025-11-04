import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, MapPin, User, Compass } from 'lucide-react'
import { WisataData } from './data/wisata'
import './index.css'

// ==================== SPLASH SCREEN ====================
function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                onComplete();
              }, 100);
            }, 600);
          }, 300);
          return 100;
        }
        return prev + 8;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 transition-all duration-600 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      <div className="text-8xl mb-6 animate-bounce">🏝️</div>
      <h1 className="text-5xl font-bold text-emerald-700 mb-2">Wisata Indonesia</h1>
      <p className="text-gray-600 mb-8 text-lg">Jelajahi Keindahan Nusantara</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4">{progress}%</p>
    </div>
  );
}

// ==================== DESKTOP NAVBAR ====================
function DesktopNavbar({ currentPage, onNavigate }) {
  const menuItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'explore', label: 'Jelajah', icon: Compass },
    { id: 'destinations', label: 'Destinasi', icon: MapPin },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  return (
    <nav className="hidden md:block bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-3xl">🏝️</span>
            <span className="text-xl font-bold text-emerald-700">Wisata Indonesia</span>
          </div>
          <div className="flex space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-emerald-100 text-emerald-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ==================== MOBILE NAVBAR ====================
function MobileNavbar({ currentPage, onNavigate }) {
  const menuItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'explore', label: 'Jelajah', icon: Compass },
    { id: 'destinations', label: 'Destinasi', icon: MapPin },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 h-full transition-colors ${
                currentPage === item.id
                  ? 'text-emerald-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ==================== HOME PAGE ====================
function HomePage() {
  const featuredDestinations = [
    ...WisataData.jawa.slice(0, 2),
    ...WisataData.bali.slice(0, 2)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Jelajahi Keindahan Indonesia
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            Dari Sabang sampai Merauke, temukan destinasi wisata terbaik di tanah air
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { number: '18+', label: 'Destinasi', icon: '🎯' },
            { number: '7', label: 'Pulau Besar', icon: '🏝️' },
            { number: '100%', label: 'Nusantara', icon: '🇮🇩' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-emerald-600">{stat.number}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">✨ Destinasi Unggulan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <div className="h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{dest.name}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  {dest.location}
                </p>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-semibold">
                  {dest.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menjelajah?</h2>
          <p className="text-emerald-100 mb-6 text-lg">Temukan lebih banyak destinasi menakjubkan di Indonesia</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors cursor-pointer">
              Lihat Semua Destinasi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== EXPLORE PAGE ====================
function ExplorePage() {
  const regions = [
    { name: 'Jawa', icon: '/images/jawa.png', count: WisataData.jawa.length, color: 'from-blue-400 to-blue-600' },
    { name: 'Bali', icon: '/images/bali.png', count: WisataData.bali.length, color: 'from-purple-400 to-purple-600' },
    { name: 'Nusa Tenggara', icon: '/images/komodo.png', count: WisataData.nusaTenggara.length, color: 'from-orange-400 to-orange-600' },
    { name: 'Sumatra', icon: '/images/sumatra.png', count: WisataData.sumatra.length, color: 'from-green-400 to-green-600' },
    { name: 'Kalimantan', icon: '/images/kalimantan.png', count: WisataData.kalimantan.length, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Sulawesi', icon: '/images/sulawesi.png', count: WisataData.sulawesi.length, color: 'from-teal-400 to-teal-600' },
    { name: 'Papua', icon: '/images/papua.png', count: WisataData.papua.length, color: 'from-pink-400 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🗺️ Jelajahi Berdasarkan Wilayah</h1>
        <p className="text-gray-600 mb-8">Temukan destinasi wisata berdasarkan pulau dan wilayah</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {regions.map((region) => (
        <div key={region.name} className={`bg-gradient-to-br ${region.color} rounded-xl p-6 text-center`}>
          <img src={region.icon} alt={region.name} className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold text-white">{region.name}</h3>
          <p className="text-sm text-white/80">{region.count} tempat wisata</p>
        </div>
      ))}
      </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📂 Kategori Wisata</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Alam', icon: '/images/alam.png', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
              { name: 'Budaya', icon: '/images/budaya.png', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
              { name: 'Pantai', icon: '/images/pantai.png', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
              { name: 'Petualangan', icon: '/images/petualangan.png', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' }
            ].map((cat) => (
              <div
                key={cat.name}
                className={`${cat.color} rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 duration-300`}
              >
              <img src={cat.icon} alt={cat.name} className="w-10 h-10 mx-auto mb-2" />
                <div className="font-semibold">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DESTINATIONS PAGE ====================
function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  const allDestinations = Object.values(WisataData).flat();
  
  const filteredDestinations = selectedRegion === 'all' 
    ? allDestinations 
    : WisataData[selectedRegion] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🎯 Semua Destinasi</h1>
        <p className="text-gray-600 mb-6">Jelajahi {allDestinations.length} destinasi wisata di seluruh Indonesia</p>
        
        {/* Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'all', label: 'Semua', icon: '/images/all.png' },
          { id: 'jawa', label: 'Jawa', icon: '/images/jawa.png' },
          { id: 'bali', label: 'Bali', icon: '/images/bali.png' },
          { id: 'nusaTenggara', label: 'Nusa Tenggara', icon: '/images/komodo.png' },
          { id: 'sumatra', label: 'Sumatra', icon: '/images/sumatra.png' },
          { id: 'kalimantan', label: 'Kalimantan', icon: '/images/kalimantan.png' },
          { id: 'sulawesi', label: 'Sulawesi', icon: '/images/sulawesi.png' },
          { id: 'papua', label: 'Papua', icon: '/images/papua.png' }
        ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedRegion(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedRegion === filter.id
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <img src={filter.icon} alt={filter.label} className="w-5 h-5" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="mb-6 text-sm text-gray-600">
          Menampilkan <span className="font-bold text-emerald-600">{filteredDestinations.length}</span> destinasi
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">{dest.name}</h3>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-semibold ml-2">
                    {dest.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  {dest.location}
                </p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{dest.description}</p>
                
                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {dest.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-xs text-gray-600 mb-1">⏰ Waktu Terbaik:</div>
                  <div className="text-sm font-semibold text-emerald-700">{dest.bestTime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== PROFILE PAGE ====================
function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-32 md:h-40 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
          
          {/* Profile Content */}
          <div className="px-6 pb-8">
            <div className="flex flex-col items-center -mt-16 md:-mt-20">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-2xl flex items-center justify-center text-6xl md:text-7xl border-4 border-white">
                👤
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
                Ainaya Zahra Putridiyanti
              </h1>
              <p className="text-gray-600 mt-1">Mahasiswa Teknik Informatika</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🎓</span>
                  <div className="text-sm text-gray-600">NIM</div>
                </div>
                <div className="text-xl font-bold text-gray-800">21120123130084</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">👥</span>
                  <div className="text-sm text-gray-600">Kelompok</div>
                </div>
                <div className="text-xl font-bold text-gray-800">34</div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">ℹ️</span>
                Tentang Aplikasi
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3 border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold">Wisata Indonesia</span> adalah Progressive Web App (PWA) yang menampilkan berbagai destinasi wisata menarik di Indonesia.
                </p>
                <p className="text-gray-700">
                  Aplikasi ini dibuat sebagai tugas praktikum Pemrograman Berbasis Blok menggunakan React + Vite dengan fitur PWA yang dapat diinstall dan bekerja offline.
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <div className="flex items-center text-emerald-700">
                    <span className="text-2xl mr-3">✨</span>
                    <div>
                      <div className="font-semibold">Fitur Unggulan</div>
                      <div className="text-sm text-gray-600">18+ Destinasi • PWA • Offline Mode</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🛠️</span>
                Teknologi
              </h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vite', 'Tailwind CSS', 'PWA', 'Lucide Icons'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold hover:bg-emerald-200 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Fitur Aplikasi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: '✅', text: '18+ Destinasi Wisata' },
                  { icon: '✅', text: '7 Wilayah Indonesia' },
                  { icon: '✅', text: 'Dapat Diinstall (PWA)' },
                  { icon: '✅', text: 'Bekerja Offline' },
                  { icon: '✅', text: 'Responsive Design' },
                  { icon: '✅', text: 'Fast Loading' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-gray-700 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Dibuat dengan cinta untuk Praktikum PPB
              </p>
              <p className="text-xs text-gray-500 mt-2">
                © 2024 Wisata Indonesia • All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'destinations':
        return <DestinationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)