import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white font-bold">
      {/* Immagine di sfondo */}
      <Image
        src="/freedom.jpg"
        alt="Libertà Finanziaria"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Contenuto */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-6">
        <h1 className="text-4xl md:text-6xl mb-6">
          “I soldi vanno dal portafoglio degli impazienti a quello dei pazienti.”
        </h1>
        <div className="mt-8 flex space-x-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg"
          >
            LOG IN
          </a>
          <a
            href="/signin"
            className="bg-white text-blue-800 hover:text-white hover:bg-blue-600 px-6 py-3 rounded-lg text-lg"
          >
            SIGN IN
          </a>
        </div>
      </div>
    </div>
  );
}
