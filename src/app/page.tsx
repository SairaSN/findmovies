'use client'
import Image from 'next/image';
import SearchBar from './SearchBar';
import FeaturedToday from './FeaturedToday'; 
import PremieresAnnouncements from './PremieresAnnouncements';



export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-black-100 flex flex-col items-center">
      {/* Logo + SearchBar */}
      <div className="flex items-center space-x-6 w-full max-w-4xl mb-8">
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.svg" alt="Logo" width={200} height={100} />
        </div>

        {/* SEARCH BAR COMPONENT */}
        <SearchBar />
        
      </div>
      {/* Featured Today Section */}
        <div className="w-full max-w-7xl">
          <FeaturedToday />
        </div>
      <div className="w-full max-w-7xl">
        <PremieresAnnouncements />
      </div>

      {/* Aquí pondremos las secciones siguientes como "Featured Today", etc. */}
    </main>
  )
}
