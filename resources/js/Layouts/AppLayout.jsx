import { useEffect, useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import useSound from "use-sound";
import {
    LogOut,
    Search,
    User,
    ShieldCheck,
    X,
    ChevronDown,
    Settings,
    TvMinimalPlay,
    GitPullRequestCreateArrow,
} from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function AppLayout({ children, search, setSearch }) {
    const { auth, isGuest } = usePage().props;
    const user = auth?.user;
    const [isTop, setIsTop] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [playHover] = useSound("/sounds/hover.mp3", {
        volume: 0.15,
        interrupt: true,
        preload: true,
    });
    const [playClick] = useSound("/sounds/click.mp3", {
        volume: 0.3,
        interrupt: true,
        preload: true,
    });

    // Gestion du scroll transparent -> opaque
    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY <= 10);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fermeture du menu déroulant lors d'un clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gestion globale automatique des bruitages Hover / Click
    useEffect(() => {
        const interactiveSelector =
            'a, button, [role="button"], input[type="button"], input[type="submit"]';

        const handleMouseOver = (event) => {
            const interactiveElement =
                event.target.closest(interactiveSelector);
            if (!interactiveElement) return;
            if (
                event.relatedTarget &&
                interactiveElement.contains(event.relatedTarget)
            )
                return;
            playHover();
        };

        const handlePointerDown = (event) => {
            const interactiveElement =
                event.target.closest(interactiveSelector);
            if (!interactiveElement) return;
            playClick();
        };

        document.addEventListener("mouseover", handleMouseOver, true);
        document.addEventListener("pointerdown", handlePointerDown, true);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver, true);
            document.removeEventListener(
                "pointerdown",
                handlePointerDown,
                true,
            );
        };
    }, [playClick, playHover]);

    const logoutRoute = isGuest ? route("guest.logout") : route("logout");

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
            {/* BARRE DE NAVIGATION */}
            <header
                className={`fixed top-0 z-40 w-full transition-all duration-500 ease-in-out ${
                    isTop
                        ? "bg-gradient-to-b from-black/80 to-transparent py-4 md:py-5"
                        : "bg-zinc-950/95 backdrop-blur-md py-3 shadow-xl border-b border-zinc-900/40"
                }`}
            >
                <div className="flex items-center justify-between px-4 md:px-12 gap-4">
                    {/* BLOC GAUCHE : LOGO */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href={route("catalog")}>
                            <ApplicationLogo className="h-6 w-auto sm:h-8 md:h-9 text-red-600 transition transform hover:scale-[1.02]" />
                        </Link>
                    </div>

                    {/* BLOC CENTRAL : BARRE DE RECHERCHE RESPONSIVE */}
                    {typeof setSearch === "function" && (
                        <div className="flex-1 max-w-xl md:max-w-2xl mx-2 sm:mx-6">
                            <div className="relative w-full">
                                <Search
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                                    size={16}
                                />
                                <input
                                    type="search"
                                    value={search || ""}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Rechercher un clip, un jeu..."
                                    className="w-full rounded-full border border-zinc-800 bg-black/40 py-1.5 pl-10 pr-10 text-xs sm:text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-600 focus:bg-zinc-900/80 focus:ring-0"
                                />
                                {search ? (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X size={14} />
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {/* BLOC DROITE : ZONE UTILISATEUR & DROPDOWN */}
                    <div
                        className="flex items-center flex-shrink-0 gap-4"
                        ref={dropdownRef}
                    >
                        {user ? (
                            <div className="relative">
                                {/* Bouton de déclenchement du Dropdown */}
                                <button
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="flex items-center gap-2 group focus:outline-none"
                                >
                                    <div className="h-8 w-8 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700/60 transition group-hover:border-zinc-400">
                                        <img
                                            src="/images/default-avatar.png"
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                                                    user.name;
                                            }}
                                        />
                                    </div>
                                    <ChevronDown
                                        size={14}
                                        className={`text-zinc-400 transition duration-300 group-hover:text-zinc-200 hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {/* MENU DÉROULANT STYLE NETFLIX */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-md border border-zinc-800 bg-zinc-950 p-1 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-3 py-2 border-b border-zinc-900 mb-1">
                                            <p className="text-xs text-zinc-500 font-medium">
                                                Connecté en tant que
                                            </p>
                                            <p className="text-sm font-bold text-zinc-200 truncate">
                                                {user.name}
                                            </p>
                                        </div>

                                        {/* OPTION : ESPACE ADMIN */}
                                        {user.role === "admin" && (
                                            <Link
                                                href={route(
                                                    "admin.videos.index",
                                                )}
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-xs font-semibold text-red-400 hover:bg-zinc-900 hover:text-red-300 transition"
                                            >
                                                <ShieldCheck size={14} />
                                                Administration
                                            </Link>
                                        )}

                                        {/* OPTION : PARAMÈTRES / PROFIL */}
                                        <Link
                                            href={route("profile.edit")}
                                            onClick={() =>
                                                setDropdownOpen(false)
                                            }
                                            className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
                                        >
                                            <Settings size={14} />
                                            Mon Profil
                                        </Link>

                                        {/* OPTION : DÉCONNEXION */}
                                        <Link
                                            href={logoutRoute}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-xs text-zinc-400 hover:bg-red-950/20 hover:text-red-400 border-t border-zinc-900 mt-1 transition"
                                        >
                                            <LogOut size={14} />
                                            Déconnexion
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : isGuest ? (
                            <Link
                                href={route("guest.logout")}
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                            >
                                <LogOut size={14} />
                                Quitter l'invité
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-red-500 shadow-md shadow-red-900/20"
                            >
                                <User size={14} />
                                Se connecter
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* ENVELOPPE DE CONTENU PRINCIPAL */}
            <div className="w-full">{children}</div>

            {/* FOOTER PREMIUM STYLE CINÉMA */}
            <footer className="w-full border-t border-zinc-900/60 bg-zinc-950/40 backdrop-blur-md py-8 mt-12 select-none">
                <div className="mx-auto px-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* GAUCHE : Logo & Crédit */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                        <Link href={route("catalog")}>
                            <ApplicationLogo className="h-5 w-auto" />
                        </Link>
                        <span className="hidden sm:inline text-zinc-700">
                            |
                        </span>
                        <p className="text-xs text-zinc-500 font-medium tracking-wide">
                            © {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* MILIEU : Navigation simple */}
                    <nav className="flex items-center gap-6 text-xs font-semibold text-zinc-400">
                        <Link
                            href={route("catalog")}
                            className="hover:text-white transition"
                        >
                            Catalogue
                        </Link>
                        {user && (
                            <Link
                                href={route("profile.edit")}
                                className="hover:text-white transition"
                            >
                                Mon Profil
                            </Link>
                        )}
                    </nav>

                    {/* DROITE : Réseaux sociaux (YouTube & GitHub) */}
                    <div className="flex items-center gap-4 text-zinc-500">
                        <a
                            href="https://www.youtube.com/@lolstudio4205"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition duration-200"
                            aria-label="Me suivre sur YouTube"
                        >
                            <TvMinimalPlay size={18} />
                        </a>
                        <a
                            href="https://github.com/loucalm/lolflix-V3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-200"
                            aria-label="Voir le GitHub"
                        >
                            <GitPullRequestCreateArrow size={18} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
