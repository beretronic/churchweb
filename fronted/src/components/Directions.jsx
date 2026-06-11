import React from "react";

// Coordinates for Number 1 Petersham, Marlborough, Harare, Zimbabwe
const CHURCH_LAT  = -17.7724;
const CHURCH_LNG  =  31.0054;

// Harare CBD as the origin
const CBD_LAT     = -17.8292;
const CBD_LNG     =  31.0522;

// Google Maps embed — directions from Harare CBD to church
const EMBED_URL = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&origin=${CBD_LAT},${CBD_LNG}&destination=${CHURCH_LAT},${CHURCH_LNG}&mode=driving`;

// Fallback static map if no embed API key
const STATIC_DIRECTIONS_URL = `https://www.google.com/maps/dir/Harare+CBD,+Harare,+Zimbabwe/1+Petersham,+Marlborough,+Harare,+Zimbabwe`;

function Directions() {
    return (
        <section id="directions" className="py-24 bg-slate-100 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

                {/* Left — Address Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span
                            className="uppercase text-xs font-semibold tracking-widest block"
                            style={{ color: "#1e3a8a" }}
                        >
                            Find Us
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold text-slate-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Sanctuary Directions
                        </h2>
                    </div>

                    <p className="text-slate-600 font-light leading-relaxed">
                        Join us at our main headquarters in Marlborough, Harare. We are easily
                        accessible from the CBD — approximately 15 minutes by car heading
                        north-west along Borrowdale Road.
                    </p>

                    {/* Address Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div
                                className="w-10 h-10 rounded flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: "rgba(30,58,138,0.10)", color: "#1e3a8a" }}
                            >
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Main Headquarters</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed mt-0.5">
                                    No. 1 Petersham<br />
                                    Marlborough, Harare<br />
                                    Zimbabwe
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100" />

                        {/* Service Times */}
                        <div className="flex items-start gap-4">
                            <div
                                className="w-10 h-10 rounded flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: "rgba(217,119,6,0.10)", color: "#d97706" }}
                            >
                                <i className="fa-solid fa-clock"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Service Times</h4>
                                <p className="text-sm text-slate-500 font-light mt-0.5">
                                    Sundays — 09:00 AM<br />
                                    Wednesdays — 05:30 PM
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100" />

                        {/* Get Directions Button */}
                        <a
                            href={STATIC_DIRECTIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg text-white text-sm font-semibold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-md"
                            style={{ background: "#1e3a8a" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#1e40af")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#1e3a8a")}
                        >
                            <i className="fa-solid fa-diamond-turn-right"></i>
                            Get Directions from CBD
                        </a>
                    </div>
                </div>

                {/* Right — Embedded Map */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md">
                    <iframe
                        title="Directions to Spirit Life Church International"
                        src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d30306.123456789!2d31.0054!3d-17.7724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1931a4e706c8b1c5%3A0x1b5c2b2b2b2b2b2b!2sHarare+CBD%2C+Harare%2C+Zimbabwe!3m2!1d-17.8292!2d31.0522!4m5!1s0x0%3A0x0!2sNo+1+Petersham%2C+Marlborough%2C+Harare%2C+Zimbabwe!3m2!1d-17.7724!2d31.0054!5e0!3m2!1sen!2szw!4v1234567890`}
                        className="w-full rounded-lg border-0"
                        style={{ height: "420px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Fallback link below map */}
                    <div className="pt-3 text-center">
                        <a
                            href={STATIC_DIRECTIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium hover:underline"
                            style={{ color: "#1e3a8a" }}
                        >
                            <i className="fa-solid fa-up-right-from-square mr-1"></i>
                            Open in Google Maps
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Directions;
