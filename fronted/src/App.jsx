import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SermonCard from './components/SermonCard';

// 1. Navigation Component
const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Ministry Logo / Name */}
                <div className="text-white">
                    <h1 className="text-2xl font-extrabold tracking-tight">Spirit Life</h1>
                    <p className="text-xs uppercase tracking-widest text-blue-300">International</p>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 text-white/90">
                    <a href="#home" className="hover:text-white transition">Home</a>
                    <a href="#about" className="hover:text-white transition">Apostle Olsen</a>
                    <a href="#sermons" className="hover:text-white transition">Sermons</a>
                    <a href="#events" className="hover:text-white transition">Events</a>
                    <a href="#contact" className="hover:text-white transition">Contact</a>
                </div>

                {/* Call to Action */}
                <a href="#donate" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                    Give Online
                </a>
            </div>
        </nav>
    );
};

// 2. Hero Section Component
const HeroSection = () => {
    return (
        <div id="home" className="relative h-screen w-full overflow-hidden bg-gray-950">

            {/* BACKGROUND IMAGE - Full Screen Picture of the Apostle */}
            {/* Update the URL below when you have the final high-res image of Apostle Olsen Mhako */}
            <img
                src="https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=2560&auto=format&fit=crop"
                alt="Apostle Olsen Mhako"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* OVERLAY - Darkens the image so text is readable */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* HERO CONTENT - Layered on top */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                        Apostle Olsen Mhako
                    </span>
                    <h2 className="text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                        Activating Faith, <br />
                        Transforming Nations.
                    </h2>
                    <p className="text-xl text-gray-200 mt-6 max-w-2xl">
                        Welcome to Spirit Life Church International. Join us in fulfilling the great commission through the power of the Holy Spirit.
                    </p>
                    <div className="flex gap-4 mt-10">
                        <a href="#sermons" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                            Watch Latest Sermon
                        </a>
                        <a href="#about" className="bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-lg backdrop-blur-sm hover:bg-white/20 transition">
                            Our Vision
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Main Application Layout
function App() {
    const [sermons, setSermons] = useState([]);

    useEffect(() => {
        // Connect to your Django API
        axios.get('http://127.0.0.1:8000/api/sermons/')
            .then(res => setSermons(res.data))
            .catch(err => console.log('Error connecting to Django API:', err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* 1. Header & Navigation */}
            <Navbar />

            {/* 2. Full-Screen Hero */}
            <HeroSection />

            {/* 3. Main Content Area */}
            <main id="sermons" className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="text-4xl font-extrabold tracking-tight text-gray-950">Recent Teachings</h3>
                        <p className="text-lg text-gray-600 mt-1">Grow deeper in the Word of God.</p>
                    </div>
                    <a href="/library" className="text-blue-600 font-semibold hover:text-blue-700">
                        View Sermon Library &rarr;
                    </a>
                </div>

                {/* Sermon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sermons.map(sermon => (
                        <SermonCard key={sermon.id} sermon={sermon} />
                    ))}
                </div>
            </main>

            {/* 4. Footer */}
            <footer id="contact" className="bg-gray-950 text-gray-300 mt-20 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-extrabold text-white">Spirit Life</h1>
                    <p className="text-sm uppercase text-blue-300 tracking-widest mb-4">International</p>
                    <p className="max-w-md mx-auto text-sm text-gray-400">Founded by Apostle Olsen Mhako. Transforming lives through the message of Christ.</p>
                    <p className="mt-10 text-xs text-gray-600">&copy; {new Date().getFullYear()} SLCI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;