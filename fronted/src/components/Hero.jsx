import React from 'react';

function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/path-to-your-apostle-image.jpg"
                    alt="Apostle Olsen Mhako"
                    className="w-full h-full object-cover object-center"
                />
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
                <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-4">
                    Welcome to Spirit Life Church International
                </p>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
                    Experience The <em className="text-blue-500 italic">Supernatural</em>
                </h1>
                <a
                    href="#sermons"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                    Watch Latest Sermons
                </a>
            </div>
        </section>
    );
}

export default Hero;
