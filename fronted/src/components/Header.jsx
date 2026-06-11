import React from 'react';
import './App.css';
import logo from '/images/spiritlife_logo.png';

function Header() {
    return (
        <header className="navbar">
            <img src={logo} alt="Spirit Life Church Logo" style={{ height: '50px' }} />
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#sermons">Sermons</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#giving">Giving</a></li>
                <li><a href="#directions">Directions</a></li>
            </ul>
        </header>
    );
}

export default Header;


