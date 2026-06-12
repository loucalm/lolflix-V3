import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Dashboard({
    auth,
    videosByCategory,
    favorites,
    heroVideo,
    isGuest,
    filters,
}) {
    const [search, setSearch] = useState(filters.search || "");

    // Soumission automatique de la recherche après un court délai (Debounce)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("catalog"),
                { search: search },
                { preserveState: true, replace: true },
            );
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col justify-between">
            <Head title="Catalogue - Lolflix" />

            {/* 1. HEADER FIXE STYLE NETFLIX */}
            <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md px-4 py-3 lg:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/* LOGO */}
                    <Link
                        href={route("catalog")}
                        className="text-red-600 font-black text-2xl lg:text-3xl tracking-tighter uppercase"
                    >
                        Lolflix
                    </Link>
                </div>

                {/* BARRE DE RECHERCHE CENTRALE */}
                <div className="flex-1 max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Rechercher une vidéo, une catégorie..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md py-1.5 px-4 text-sm"
                    />
                </div>

                {/* MENU UTILISATEUR / INVITÉ */}
                <div className="flex items-center space-x-4">
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
                        <div className="flex items-center space-x-4">
                            {/* LIEN BACK-OFFICE SECRET SI ADMIN */}
                            {auth.user?.role === "admin" && (
                                <Link
                                    href={route("admin.videos.index")}
                                    className="text-xs text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white px-2.5 py-1 rounded font-bold transition uppercase tracking-wider"
                                >
                                    Admin
                                </Link>
                            )}
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route("profile.edit")}
                                    className="text-sm font-semibold hover:underline text-gray-300"
                                >
                                    {auth.user?.name}
                                </Link>
                                <div className="w-8 h-8 rounded bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-sm shadow-md">
                                    {auth.user?.name[0].toUpperCase()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* CONTENU PRINCIPAL */}
            <main className="pb-12 flex-grow">
                {/* 2. HERO BANNER ALEATOIRE */}
                {heroVideo && !search && (
                    <div className="relative h-[56.25vw] max-h-[100vh] w-full overflow-hidden bg-black shadow-inner">
                        {/* Image de fond de la vidéo */}
                        <img
                            src={`https://img.youtube.com/vi/${heroVideo.youtube_id}/maxresdefault.jpg`}
                            className="w-full h-full object-cover opacity-60 filter brightness-90"
                            alt={heroVideo.title}
                        />
                        {/* Dégradé sombre pour fusionner avec le catalogue */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/50" />

                        {/* Infos de la vidéo sur la bannière */}
                        <div className="absolute bottom-[10%] left-4 lg:left-12 max-w-xl space-y-4">
                            <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-sm uppercase font-bold tracking-wider">
                                À la une
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                                {heroVideo.title}
                            </h1>
                            <p className="text-gray-300 text-sm md:text-base hidden sm:line-clamp-3 drop-shadow">
                                {heroVideo.description}
                            </p>
                            <div className="pt-2">
                                <Link
                                    href={route("videos.watch", heroVideo.id)}
                                    className="inline-flex items-center bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md font-bold transition shadow-lg"
                                >
                                    ▶ Regarder
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTENEUR DES LIGNES DE VIDÉOS */}
                <div
                    className={`mx-auto px-4 lg:px-8 space-y-10 ${heroVideo && !search ? "mt-8" : "mt-24"}`}
                >
                    {/* SECTION : MA LISTE (Uniquement pour les connectés s'ils ont des favoris) */}
                    {!isGuest && favorites.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-600 font-sans tracking-wide">
                                Ma Liste
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {favorites.map((video) => (
                                    <div
                                        key={video.id}
                                        className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video shadow-md"
                                    >
                                        <Link
                                            href={route(
                                                "videos.watch",
                                                video.id,
                                            )}
                                        >
                                            <img
                                                src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                alt={video.title}
                                            />
                                        </Link>
                                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3 pointer-events-none">
                                            <p className="font-bold text-sm truncate">
                                                {video.title}
                                            </p>
                                            <Link
                                                href={route(
                                                    "videos.favorite",
                                                    video.id,
                                                )}
                                                method="post"
                                                as="button"
                                                className="text-xs text-red-400 mt-1 hover:underline text-left pointer-events-auto"
                                            >
                                                ✕ Retirer
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION : LES CATÉGORIES */}
                    {Object.keys(videosByCategory).length > 0 ? (
                        Object.keys(videosByCategory).map((category) => (
                            <div key={category}>
                                <h3 className="text-lg font-bold mb-3 capitalize text-gray-300 tracking-wide">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {videosByCategory[category].map((video) => {
                                        const isFav = favorites.some(
                                            (fav) => fav.id === video.id,
                                        );

                                        return (
                                            <div
                                                key={video.id}
                                                className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video shadow-md"
                                            >
                                                <Link
                                                    href={route(
                                                        "videos.watch",
                                                        video.id,
                                                    )}
                                                >
                                                    <img
                                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                        alt={video.title}
                                                    />
                                                </Link>
                                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3 pointer-events-none">
                                                    <p className="font-bold text-sm truncate">
                                                        {video.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                                        {video.description}
                                                    </p>

                                                    {/* Cache l'action favoris si l'utilisateur est un Invité */}
                                                    {!isGuest && (
                                                        <Link
                                                            href={route(
                                                                "videos.favorite",
                                                                video.id,
                                                            )}
                                                            method="post"
                                                            as="button"
                                                            className="text-xs text-left mt-1.5 text-gray-300 hover:text-white font-semibold pointer-events-auto"
                                                        >
                                                            {isFav
                                                                ? "✓ Dans ma liste"
                                                                : "+ Ma Liste"}
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-12">
                            Aucun résultat trouvé pour votre recherche.
                        </p>
                    )}
                </div>
            </main>

            {/* 3. FOOTER */}
            <footer className="bg-zinc-900/60 border-t border-zinc-800/80 py-6 mt-12 text-center text-sm text-gray-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="font-black text-red-600 uppercase tracking-tighter">
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
