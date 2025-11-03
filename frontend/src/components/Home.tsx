import movieCollage from '../assets/bingbasehome1.avif'

export default function Home() {
  return (
    <>
    
     <section className="relative w-full h-[85vh] bg-black">
      {/* Background Image */}
      <img
        src={movieCollage} 
        alt="Movie collage"
        className="w-full h-full object-cover opacity-70"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3">
          Welcome to <span className="text-[#E50914]">Binge</span>Base
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-xl">
          Track, discover, and binge your favorite movies & shows — all in one place.
        </p>
      </div>
    </section>
    </>
  )
}
