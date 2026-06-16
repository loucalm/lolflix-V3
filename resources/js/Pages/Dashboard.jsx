import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { Check, Play, Plus, Sparkles, X } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard({
    auth,
    flash,
    favorites,
    videosByCategory,
    heroVideo,
    filters,
}) {
    const [search, setSearch] = useState(filters.search || "");
    const hasPlayedTudum = useRef(false);

    useEffect(() => {
        if (flash?.sound !== "tudum" || hasPlayedTudum.current) {
            return;
        }

        hasPlayedTudum.current = true;
        const audio = new Audio("/sounds/tudum.mp3");
        audio.volume = 0.55;
        audio.play().catch(() => {});
    }, [flash?.sound]);

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

            <main className="animate-catalog-enter pb-12 select-none">
                {/* HERO BANNER */}
                {heroVideo && !search && (
                    <div className="relative h-[56.25vw] max-h-[100vh] w-full overflow-hidden bg-black shadow-inner">
                        <img
                            src={`https://img.youtube.com/vi/${heroVideo.youtube_id}/maxresdefault.jpg`}
                            className="w-full h-full object-cover filter brightness-75"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                        <div className="absolute bottom-0 md:bottom-12 left-4 max-w-xl space-y-4 sm:left-6 lg:left-12">
                            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs px-2.5 py-1 rounded-sm uppercase font-bold tracking-wider">
                                <Sparkles size={12} />À la une
                            </span>
                            <div className="flex items-center gap-2 font-semibold text-sm text-white/80">
                                <ApplicationLogo className="h-4 w-auto" />
                                <p>Séries</p>
                                <span className="text-white/50">•</span>
                                <p>{heroVideo.duration ?? "--"} min</p>
                                <span className="text-white/50">•</span>
                                <p className="line-clamp-1">
                                    {heroVideo.category}
                                </p>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md text-white">
                                {heroVideo.title}
                            </h1>
                            <p className="text-zinc-300 text-sm md:text-base hidden sm:line-clamp-3 drop-shadow">
                                {heroVideo.description}
                            </p>
                            <div className="pt-2">
                                <Link
                                    href={route("videos.watch", heroVideo.id)}
                                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2.5 font-bold text-black shadow-lg transition hover:bg-gray-200"
                                >
                                    <Play size={16} fill="currentColor" />
                                    Regarder
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* SLIDERS DE VIDÉOS */}
                <div
                    className={`space-y-10 px-4 sm:px-6 lg:px-12 ${heroVideo && !search ? "mt-12 relative z-10" : "pt-28"}`}
                >
                    {/* SECTION : MA LISTE */}
                    {favorites && favorites.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide hover:text-red-500 transition duration-300">
                                Ma Liste
                            </h3>
                            {/* Scroll horizontal conteneur */}
                            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-none mask-gradient">
                                {favorites.map((video) => (
                                    <div
                                        key={video.id}
                                        className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video w-[45vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw] flex-shrink-0 snap-start shadow-lg border border-zinc-800/40"
                                    >
                                        <Link
                                            href={route(
                                                "videos.watch",
                                                video.id,
                                            )}
                                        >
                                            <img
                                                src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                alt=""
                                            />
                                        </Link>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                                            <p className="font-bold text-xs md:text-sm truncate text-white">
                                                {video.title}
                                            </p>
                                            <Link
                                                href={route(
                                                    "videos.favorite",
                                                    video.id,
                                                )}
                                                method="post"
                                                as="button"
                                                className="pointer-events-auto mt-1 inline-flex items-center gap-1 text-left text-[11px] font-medium text-red-400 hover:text-red-300 transition"
                                            >
                                                <X size={12} /> Retirer
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTIONS : LES CATÉGORIES */}
                    {Object.keys(videosByCategory).length > 0 ? (
                        Object.keys(videosByCategory).map((category) => (
                            <div key={category} className="space-y-2">
                                <h3 className="text-base md:text-lg font-bold capitalize text-zinc-300 tracking-wide">
                                    {category}
                                </h3>
                                {/* Scroll horizontal conteneur */}
                                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-none">
                                    {videosByCategory[category].map((video) => {
                                        const isFav = favorites?.some(
                                            (fav) => fav.id === video.id,
                                        );
                                        return (
                                            <div
                                                key={video.id}
                                                className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video w-[45vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw] flex-shrink-0 snap-start shadow-lg border border-zinc-800/40"
                                            >
                                                <Link
                                                    href={route(
                                                        "videos.watch",
                                                        video.id,
                                                    )}
                                                >
                                                    <img
                                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                                                    <p className="font-bold text-xs md:text-sm truncate text-white">
                                                        {video.title}
                                                    </p>

                                                    {auth.user ? (
                                                        <Link
                                                            href={route(
                                                                "videos.favorite",
                                                                video.id,
                                                            )}
                                                            method="post"
                                                            as="button"
                                                            className="pointer-events-auto mt-1 inline-flex items-center gap-1 text-left text-[11px] font-semibold text-zinc-400 hover:text-white transition"
                                                        >
                                                            {isFav ? (
                                                                <>
                                                                    <Check
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="text-red-500"
                                                                    />
                                                                    Dans ma
                                                                    liste
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Plus
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                    Ma Liste
                                                                </>
                                                            )}
                                                        </Link>
                                                    ) : (
                                                        <p className="text-[10px] text-zinc-500 mt-1 italic">
                                                            Abonnez-vous pour
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
                        <p className="text-center text-zinc-500 py-16 text-sm">
                            Aucun résultat trouvé pour votre recherche.
                        </p>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
