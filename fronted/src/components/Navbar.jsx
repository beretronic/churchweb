import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Sermons', href: '#sermons' },
        { name: 'Events', href: '#events' },
        { name: 'About', href: '#about' },
        { name: 'Direction', href: '#direction' },
        { name: 'Partnership', href: '#partnership' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Brand Name */}
                <div className="text-white font-bold text-xl">SLCI</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-blue-400 transition">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black/90 p-6 flex flex-col gap-4 text-white">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;