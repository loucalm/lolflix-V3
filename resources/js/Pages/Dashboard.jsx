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

            <main className="animate-catalog-enter pb-12">
                {/* HERO BANNER */}
                {heroVideo && !search && (
                    <div className="relative h-[56.25vw] max-h-[100vh] w-full overflow-hidden bg-black shadow-inner">
                        <img
                            src={`https://img.youtube.com/vi/${heroVideo.youtube_id}/maxresdefault.jpg`}
                            className="w-full object-fit filter brightness-90"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/0" />
                        <div className="absolute bottom-[10%] left-4 max-w-xl space-y-4 sm:left-6 lg:left-8">
                            <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-sm uppercase font-bold tracking-wider">
                                <Sparkles
                                    size={12}
                                    className="mr-1 inline-block"
                                />
                                À la une
                            </span>
                            <div className="flex items-center gap-2 font-semibold text-md text-white/80">
                                <ApplicationLogo className="h-4 w-auto" />
                                <p>Series</p>
                                <span className="text-white/50">•</span>
                                <p>{heroVideo.duration ?? "--"} min</p>
                                <span className="text-white/50">•</span>
                                <p className="line-clamp-1">
                                    {heroVideo.category}
                                </p>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                                {heroVideo.title}
                            </h1>
                            <p className="text-gray-300 text-sm md:text-base hidden sm:line-clamp-3 drop-shadow">
                                {heroVideo.description}
                            </p>
                            <div className="pt-2">
                                <Link
                                    href={route("videos.watch", heroVideo.id)}
                                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2 font-bold text-black shadow-lg transition hover:bg-gray-200"
                                >
                                    <Play size={16} fill="currentColor" />
                                    Regarder
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* GRILLES DE VIDÉOS */}
                <div
                    className={`mx-auto space-y-10 px-4 sm:px-6 lg:px-8 ${heroVideo && !search ? "pt-8" : "pt-24"}`}
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
                                                className="pointer-events-auto mt-1 inline-flex items-center gap-1 text-left text-xs text-red-400 hover:underline"
                                            >
                                                <X size={12} /> Retirer
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
                                                            className="pointer-events-auto mt-1.5 inline-flex items-center gap-1 text-left text-xs font-semibold text-gray-300 hover:text-white"
                                                        >
                                                            {isFav ? (
                                                                <>
                                                                    <Check
                                                                        size={
                                                                            12
                                                                        }
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
