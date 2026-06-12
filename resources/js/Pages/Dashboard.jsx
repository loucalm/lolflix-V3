import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, videosByCategory, favorites }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-200 leading-tight">
                    Lolflix Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 bg-zinc-950 min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* SECTION 1 : MA LISTE (FAVORIS) - S'affiche uniquement s'il y en a */}
                    {favorites.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-500">
                                Ma Liste
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {favorites.map((video) => (
                                    <div
                                        key={video.id}
                                        className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            alt={video.title}
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
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
                                                className="text-xs text-red-400 mt-1 hover:underline text-left"
                                            >
                                                ✕ Retirer
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION 2 : LES CATÉGORIES DE VIDÉOS */}
                    {Object.keys(videosByCategory).map((category) => (
                        <div key={category}>
                            <h3 className="text-xl font-bold mb-4 capitalize text-gray-300">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {videosByCategory[category].map((video) => {
                                    // Vérifie si cette vidéo est déjà dans les favoris
                                    const isFav = favorites.some(
                                        (fav) => fav.id === video.id,
                                    );

                                    return (
                                        <div
                                            key={video.id}
                                            className="relative group overflow-hidden rounded-md bg-zinc-900 aspect-video shadow-lg"
                                        >
                                            {/* Miniature YouTube automatique */}
                                            <img
                                                src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                alt={video.title}
                                            />
                                            {/* Overlay au survol */}
                                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                                                <p className="font-bold text-sm truncate">
                                                    {video.title}
                                                </p>
                                                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                                    {video.description}
                                                </p>

                                                {/* Bouton Favori */}
                                                <Link
                                                    href={route(
                                                        "videos.favorite",
                                                        video.id,
                                                    )}
                                                    method="post"
                                                    as="button"
                                                    className="text-xs text-left mt-2 text-gray-300 hover:text-white font-semibold"
                                                >
                                                    {isFav
                                                        ? "✓ Dans ma liste"
                                                        : "+ Ma Liste"}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
