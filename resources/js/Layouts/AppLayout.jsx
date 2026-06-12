import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function AppLayout({
    children,
    search,
    setSearch,
    hideHeroAndSearch = false,
}) {
    const { auth, isGuest } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Fermer le menu déroulant si on clique en dehors
    useEffect(() => {
        const handleScroll = () => {
            // Si le scroll vertical dépasse 20 pixels, on passe à true
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        // Ajout de l'écouteur d'événement au montage du composant
        window.addEventListener("scroll", handleScroll);

        // Nettoyage de l'écouteur au démontage pour éviter les fuites de mémoire
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col justify-between">
            {/* HEADER UNIQUE ET GLOBAL */}
            <nav
                className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
                    isScrolled
                        ? "bg-gradient-to-b from-black/90 to-zinc-950/60 shadow-lg backdrop-blur-md"
                        : "bg-gradient-to-b from-black/70 to-transparent"
                }`}
            >
                <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-6">
                        <Link
                            href={route("catalog")}
                            className="text-red-600 font-black text-2xl lg:text-3xl tracking-tighter uppercase select-none"
                        >
                            Lolflix
                        </Link>
                    </div>

                    {/* BARRE DE RECHERCHE CENTRALE (Affichée uniquement si pas masquée explicitement) */}
                    {!hideHeroAndSearch ? (
                        <div className="flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Rechercher une vidéo, une catégorie..."
                                value={search || ""}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md py-1.5 px-4 text-sm transition"
                            />
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {/* MENU UTILISATEUR AVEC DROPDOWN */}
                    <div
                        className="flex items-center space-x-4 relative"
                        ref={dropdownRef}
                    >
                        {isGuest ? (
                            <Link
                                href={route("guest.logout")}
                                method="post"
                                as="button"
                                className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded font-bold transition"
                            >
                                Quitter l'invité
                            </Link>
                        ) : (
                            <div className="relative">
                                {/* Bouton Avatar Déclencheur */}
                                <button
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="flex items-center space-x-3 focus:outline-none group bg-zinc-900/50 hover:bg-zinc-900 px-3 py-1.5 rounded-md transition border border-zinc-800"
                                >
                                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white hidden sm:inline">
                                        {auth.user?.name}
                                    </span>
                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-sm shadow-md select-none text-white">
                                        {auth.user?.name
                                            ? auth.user.name[0].toUpperCase()
                                            : "U"}
                                    </div>
                                </button>

                                {/* MENU DÉROULANT STYLE NETFLIX */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-2xl py-1 z-50 animate-fade-in text-sm">
                                        {auth.user?.role === "admin" && (
                                            <Link
                                                href={route(
                                                    "admin.videos.index",
                                                )}
                                                className="block px-4 py-2.5 text-xs text-red-500 font-bold uppercase tracking-wider hover:bg-zinc-800 transition border-b border-zinc-800/60"
                                            >
                                                ⚙️ Back-Office
                                            </Link>
                                        )}
                                        <Link
                                            href={route("profile.edit")}
                                            className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-zinc-800 transition"
                                        >
                                            Mon Profil
                                        </Link>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800 transition border-t border-zinc-800/60"
                                        >
                                            Se déconnecter
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* CONTENU DE LA PAGE EN COURS */}
            <div className="flex-grow">{children}</div>

            {/* FOOTER GLOBAL */}
            <footer className="bg-zinc-900/40 border-t border-zinc-900 py-6 text-center text-sm text-gray-500">
                <div className="mx-auto flex flex-col items-center justify-between space-y-4 px-4 sm:flex-row sm:space-y-0 sm:px-6 lg:px-8">
                    <div className="font-black text-red-600 uppercase tracking-tighter select-none">
                        Lolflix © 2026
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            YouTube
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
