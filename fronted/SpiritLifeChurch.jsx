import { useState, useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SOCIALS = [
    { label: "X (Twitter)", icon: "fa-brands fa-x-twitter", href: "https://x.com/apostleolsenmhako" },
    { label: "Facebook", icon: "fa-brands fa-facebook-f", href: "https://www.facebook.com/pastormhako" },
    { label: "WhatsApp", icon: "fa-brands fa-whatsapp", href: "https://wa.me/263772622898" },
    { label: "TikTok", icon: "fa-brands fa-tiktok", href: "https://www.tiktok.com/@apostleolsenmhako" },
    { label: "YouTube", icon: "fa-brands fa-youtube", href: "https://www.youtube.com/@apostleolsenmhako" },
];

const EVENT_STYLE = {
    weekly: { border: "#1e3a8a", badgeBg: "rgba(30,58,138,0.10)", badgeColor: "#1e3a8a", locationColor: "#d97706" },
    midweek: { border: "#d97706", badgeBg: "#fef3c7", badgeColor: "#d97706", locationColor: "#1e3a8a" },
    special: { border: "#7c3aed", badgeBg: "rgba(124,58,237,0.10)", badgeColor: "#7c3aed", locationColor: "#1e3a8a" },
};

const EVENT_LABELS = {
    weekly: "Weekly Celebration",
    midweek: "Mid-Week Prayer",
    special: "Special Conference",
};

// Directions
const STATIC_DIRECTIONS_URL = "https://www.google.com/maps/dir/Harare+CBD,+Harare,+Zimbabwe/1+Petersham,+Marlborough,+Harare,+Zimbabwe";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15153.12!2d31.0054!3d-17.7724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1931a4e706c8b1c5%3A0x1b5c2b2b2b2b2b2b!2sHarare+CBD%2C+Harare%2C+Zimbabwe!3m2!1d-17.8292!2d31.0522!4m5!1s0x0%3A0x0!2sNo+1+Petersham%2C+Marlborough%2C+Harare!3m2!1d-17.7724!2d31.0054!5e0!3m2!1sen!2szw!4v1234567890";

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SocialIcon({ icon, label, href, dark = false }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className={[
                "w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 transform hover:-translate-y-1 shadow-lg",
                dark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-[#d97706] hover:text-white hover:border-[#d97706]"
                    : "bg-black/40 border-white/10 text-white hover:bg-[#d97706] hover:border-[#d97706] backdrop-blur-sm",
            ].join(" ")}
        >
            <i className={`${icon} text-base`}></i>
        </a>
    );
}

function PlayButton() {
    return (
        <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d97706] transition-all duration-200">
            <svg className="w-4 h-4 fill-current text-white ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        </span>
    );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 text-white"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.90), rgba(0,0,0,0.50), transparent)" }}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a href="#home" className="flex items-center transition-opacity hover:opacity-90 shrink-0">
                    <img
                        src="images/slc_logo.png"
                        alt="Spirit Life Church International Logo"
                        className="h-12 sm:h-16 w-auto object-contain"
                        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                    <span className="hidden items-center gap-2 text-white font-bold text-sm tracking-widest uppercase"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="w-10 h-10 rounded-full bg-[#d97706] flex items-center justify-center text-white font-bold text-lg">S</span>
                        SLC International
                    </span>
                </a>
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold tracking-widest uppercase opacity-90">
                    {["about", "sermons", "events", "giving", "directions"].map((id) => (
                        <a key={id} href={`#${id}`} className="hover:text-[#d97706] transition-colors duration-150 capitalize">{id}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center px-4"
            style={{ backgroundImage: "url('images/apostle_mhako_portrait.jpg')" }}>
            <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.50) 50%, rgba(0,0,0,0.60) 100%)" }} />
            <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-16">
                <span className="text-[#d97706] uppercase text-xs sm:text-sm font-semibold tracking-widest block drop-shadow">
                    Welcome to Spirit Life Church International
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Experience The{" "}
                    <span className="font-normal italic" style={{
                        backgroundImage: "linear-gradient(to right, #d97706, #fde68a, #d97706)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>Supernatural</span>
                </h1>
                <p className="text-slate-200 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
                    Join Apostle Olsen Mhako for life-transforming, prophetic dimensions of the Word designed to unlock your divine destiny.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a href="https://www.youtube.com/@apostleolsenmhako" target="_blank" rel="noopener noreferrer"
                        className="font-medium px-8 py-4 rounded shadow-2xl transition-all transform hover:-translate-y-0.5 text-white"
                        style={{ background: "#d97706" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#b45309")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "#d97706")}>
                        Watch Latest Sermons
                    </a>
                    <a href="#directions"
                        className="border border-white/40 bg-white/5 hover:bg-white/10 hover:border-white text-white font-medium px-8 py-4 rounded backdrop-blur-sm transition-all transform hover:-translate-y-0.5">
                        Find a Campus
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 pt-6">
                    {SOCIALS.map((s) => <SocialIcon key={s.label} {...s} />)}
                </div>
            </div>
        </section>
    );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
    return (
        <section id="about" className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 space-y-4">
                    <span className="text-[#d97706] uppercase text-xs font-semibold tracking-widest block">Our Foundation</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        About Spirit Life Church
                    </h2>
                    <div className="w-12 h-1 my-4" style={{ background: "#1e3a8a" }} />
                </div>
                <div className="md:col-span-7 text-slate-600 space-y-6 font-light leading-relaxed">
                    <p>Spirit Life Church International, founded under the apostolic oversight of Apostle Olsen Mhako alongside Pastor Rumbie Mhako, is a global ministry built to raise believers of dynamic faith, character, and exceptional supernatural impact.</p>
                    <p>Through direct prophetic revelation, aggressive prayers, and deep commitment to community growth, our local and international sanctuaries function as centers for destiny realignment and structural empowerment.</p>
                </div>
            </div>
        </section>
    );
}

// ─── Sermons ──────────────────────────────────────────────────────────────────

function SermonCard({ sermon }) {
    return (
        <a href={sermon.video_url} target="_blank" rel="noopener noreferrer"
            className="bg-black/20 rounded-lg overflow-hidden border border-white/5 shadow-xl group hover:border-[#d97706]/30 transition-all duration-200 block">
            <div className="aspect-video relative overflow-hidden bg-slate-950">
                {sermon.thumbnail ? (
                    <img src={sermon.thumbnail} alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <i className="fa-brands fa-youtube text-4xl text-slate-700"></i>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><PlayButton /></div>
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-[#d97706] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {sermon.series || "Latest Sermon"}
                </span>
            </div>
            <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-[#d97706] transition-colors text-white">
                    {sermon.title}
                </h3>
                <p className="text-sm text-slate-400 font-light line-clamp-3 leading-relaxed">{sermon.description}</p>
                <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded text-white"
                        style={{ background: "#d97706" }}>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Watch Now
                    </span>
                </div>
            </div>
        </a>
    );
}

function SermonSkeleton() {
    return (
        <div className="bg-black/20 rounded-lg overflow-hidden border border-white/5 shadow-xl animate-pulse">
            <div className="aspect-video bg-slate-800" />
            <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-slate-700 rounded" />
                <div className="h-5 w-3/4 bg-slate-700 rounded" />
                <div className="h-3 w-full bg-slate-700 rounded" />
                <div className="h-3 w-2/3 bg-slate-700 rounded" />
            </div>
        </div>
    );
}

function Sermons() {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/sermons/youtube/")
            .then((r) => { if (!r.ok) throw new Error("API error"); return r.json(); })
            .then((data) => { setSermons(data); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, []);

    const filtered = activeFilter === "all"
        ? sermons
        : sermons.filter((s) => s.series && s.series !== "Latest Sermon");

    return (
        <section id="sermons" className="py-24 border-t-2"
            style={{ background: "#0f172a", borderColor: "rgba(217,119,6,0.20)", color: "white" }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-2">
                        <span className="text-[#d97706] uppercase text-xs font-semibold tracking-widest block">Prophetic Vault</span>
                        <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Recent Sermon Archives
                        </h2>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-3 text-xs uppercase tracking-wider">
                        {["all", "series"].map((f) => (
                            <button key={f} onClick={() => setActiveFilter(f)}
                                className="px-4 py-2 rounded font-medium transition-all"
                                style={activeFilter === f
                                    ? { background: "#d97706", color: "white" }
                                    : { background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}>
                                {f === "all" ? "All Videos" : "Series"}
                            </button>
                        ))}
                    </div>
                </div>
                {error ? (
                    <div className="text-center py-16 text-slate-400">
                        <i className="fa-brands fa-youtube text-5xl mb-4 block" style={{ color: "rgba(217,119,6,0.40)" }}></i>
                        <p className="text-sm">Could not load sermons. Make sure Django is running at port 8000.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => <SermonSkeleton key={i} />)
                            : filtered.map((sermon) => <SermonCard key={sermon.id} sermon={sermon} />)}
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── Events — fetches live from Django ───────────────────────────────────────

function EventCard({ event }) {
    const style = EVENT_STYLE[event.event_type] || EVENT_STYLE.weekly;
    const label = EVENT_LABELS[event.event_type] || event.event_type;
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderLeft: `4px solid ${style.border}` }}>
            <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded"
                    style={{ background: style.badgeBg, color: style.badgeColor }}>
                    {label}
                </span>
                <h3 className="font-semibold text-lg text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-500 font-light">{event.description}</p>
            </div>
            <div className="text-sm sm:text-right shrink-0">
                <p className="font-semibold text-slate-900">{event.date_time_info}</p>
                <p className="text-xs font-semibold" style={{ color: style.locationColor }}>
                    {event.location_info}
                </p>
            </div>
        </div>
    );
}

function EventSkeleton() {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse border-l-4 border-slate-200">
            <div className="space-y-3">
                <div className="h-3 w-28 bg-slate-200 rounded" />
                <div className="h-5 w-2/3 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
            </div>
        </div>
    );
}

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/events/")
            .then((r) => { if (!r.ok) throw new Error("API error"); return r.json(); })
            .then((data) => { setEvents(data); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, []);

    return (
        <section id="events" className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                <span className="font-semibold uppercase text-xs tracking-widest block" style={{ color: "#1e3a8a" }}>
                    Fellowship Times
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Upcoming Church Events
                </h2>
                <p className="text-slate-500 font-light text-sm">
                    Align your schedules with our periodic live conferences and weekly interactive assemblies.
                </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
                {error ? (
                    <div className="text-center py-10 text-slate-400">
                        <i className="fa-solid fa-calendar-xmark text-4xl mb-3 block text-slate-300"></i>
                        <p className="text-sm">Could not load events. Make sure Django is running at port 8000.</p>
                    </div>
                ) : loading ? (
                    Array.from({ length: 2 }).map((_, i) => <EventSkeleton key={i} />)
                ) : events.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm py-10">No events found. Add them in the Django admin.</p>
                ) : (
                    events.map((event) => <EventCard key={event.id} event={event} />)
                )}
            </div>
        </section>
    );
}

// ─── Giving ───────────────────────────────────────────────────────────────────

function Giving() {
    return (
        <section id="giving" className="text-white py-24 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "linear-gradient(to right,#808080 1px,transparent 1px),linear-gradient(to bottom,#808080 1px,transparent 1px)",
                backgroundSize: "24px 24px",
            }} />
            <div className="max-w-2xl mx-auto px-6 space-y-6 relative z-10">
                <span className="text-[#d97706] uppercase text-xs font-semibold tracking-widest block">Honor & Partnership</span>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Kingdom Covenant Giving
                </h2>
                <p className="text-slate-300 font-light leading-relaxed">
                    Your tithes, specialized seeds, and covenant partnerships expand gospel outreach media lines and secure regional development ministries across global boundaries.
                </p>
                <div className="pt-4">
                    <button className="text-white font-semibold tracking-wider text-xs uppercase px-8 py-4 rounded shadow-xl transition-all transform hover:-translate-y-0.5"
                        style={{ background: "#d97706" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#b45309")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "#d97706")}>
                        View Safe Giving Portals & Banking Details
                    </button>
                </div>
            </div>
        </section>
    );
}

// ─── Directions ───────────────────────────────────────────────────────────────

function Directions() {
    return (
        <section id="directions" className="py-24 bg-slate-100 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="uppercase text-xs font-semibold tracking-widest block" style={{ color: "#1e3a8a" }}>Find Us</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Cathedral Of Grace Directions
                        </h2>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed">
                        Join us at our Cathedral Of Grace in Marlborough, Harare — approximately 15 minutes from the CBD heading north-west along Borrowdale Road.
                    </p>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                                style={{ background: "rgba(30,58,138,0.10)", color: "#1e3a8a" }}>
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Main Headquarters</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed mt-0.5">
                                    No. 1 Petersham<br />Marlborough, Harare<br />Zimbabwe
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                                style={{ background: "rgba(217,119,6,0.10)", color: "#d97706" }}>
                                <i className="fa-solid fa-clock"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Service Times</h4>
                                <p className="text-sm text-slate-500 font-light mt-0.5">
                                    Sundays — 08:00 AM<br />Thursdays — 18:00 PM
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <a href={STATIC_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg text-white text-sm font-semibold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-md"
                            style={{ background: "#1e3a8a" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#1e40af")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#1e3a8a")}>
                            <i className="fa-solid fa-diamond-turn-right"></i>
                            Get Directions from CBD
                        </a>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md">
                    <iframe
                        title="Directions to Spirit Life Church"
                        src={MAP_EMBED_URL}
                        className="w-full rounded-lg border-0"
                        style={{ height: "420px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="pt-3 text-center">
                        <a href={STATIC_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-medium hover:underline" style={{ color: "#1e3a8a" }}>
                            <i className="fa-solid fa-up-right-from-square mr-1"></i>
                            Open in Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="text-slate-400 text-xs py-16" style={{ background: "#020617" }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-8 text-center">
                <div className="space-y-2">
                    <p className="text-white text-lg font-bold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                        APOSTLE OLSEN MHAKO
                    </p>
                    <p className="text-slate-500 max-w-sm mx-auto font-light">Under the Apostolic Oversight of Apostle Olsen Mhako</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                    {SOCIALS.map((s) => <SocialIcon key={s.label} {...s} dark />)}
                </div>
                <div className="w-full max-w-md h-px bg-slate-900" />
                <div className="flex flex-col sm:flex-row items-center justify-between w-full text-slate-600 font-light gap-4">
                    <p>&copy; 2026 Spirit Life Church International. All Rights Reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
    useEffect(() => {
        const links = [
            { href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap", rel: "stylesheet" },
            { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", rel: "stylesheet" },
        ];
        links.forEach(({ href, rel }) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const el = document.createElement("link");
                el.rel = rel;
                el.href = href;
                document.head.appendChild(el);
            }
        });
        document.body.style.fontFamily = "'Inter', sans-serif";
        document.documentElement.classList.add("scroll-smooth");
    }, []);

    return (
        <div className="bg-slate-50 text-slate-800 antialiased">
            <Header />
            <main>
                <Hero />
                <About />
                <Sermons />
                <Events />
                <Giving />
                <Directions />
            </main>
            <Footer />
        </div>
    );
}