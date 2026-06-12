import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard({
    auth,
    favorites,
    videosByCategory,
    heroVideo,
    filters,
}) {
    const [search, setSearch] = useState(filters.search || "");

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
        <AppLayout search={search} setSearch={setSearch}>
            <Head title="Catalogue" />

            <main className="pb-12">
                {/* HERO BANNER */}
                {heroVideo && !search && (
                    <div className="relative h-[56.25vw] max-h-[100vh] w-full overflow-hidden bg-black shadow-inner">
                        <img
                            src={`https://img.youtube.com/vi/${heroVideo.youtube_id}/maxresdefault.jpg`}
                            className="w-full object-fit filter brightness-90"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/50" />
                        <div className="absolute bottom-[10%] left-4 max-w-xl space-y-4 sm:left-6 lg:left-8">
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

                {/* GRILLES DE VIDÉOS */}
                <div
                    className={`mx-auto space-y-10 px-4 pt-8 sm:px-6 lg:px-8 ${heroVideo && !search ? "mt-8" : "mt-24"}`}
                >
                    {/* MA LISTE */}
                    {favorites && favorites.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-600 tracking-wide">
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
                                                alt=""
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

                    {/* LES CATÉGORIES */}
                    {Object.keys(videosByCategory).length > 0 ? (
                        Object.keys(videosByCategory).map((category) => (
                            <div key={category}>
                                <h3 className="text-lg font-bold mb-3 capitalize text-gray-300 tracking-wide">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {videosByCategory[category].map((video) => {
                                        const isFav = favorites?.some(
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
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3 pointer-events-none">
                                                    <p className="font-bold text-sm truncate">
                                                        {video.title}
                                                    </p>

                                                    {/* 2. CONDITION SUR LE BOUTON AJOUTER/RETIRER POUR LES GUESTS */}
                                                    {auth.user ? (
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
                                                    ) : (
                                                        <p className="text-[10px] text-gray-400 mt-1.5 italic">
                                                            Connectez-vous pour
                                                            ajouter
                                                        </p>
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
        </AppLayout>
    );
}
