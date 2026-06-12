import { Head, Link } from "@inertiajs/react";

export default function Watch({ video }) {
    return (
        <div className="bg-black min-h-screen text-white font-sans flex flex-col justify-between">
            <Head title={`Regarder ${video.title} - Lolflix`} />

            {/* BARRE DE RETOUR SUPÉRIEURE */}
            <header className="p-4 bg-gradient-to-b from-black/80 to-transparent fixed top-0 w-full z-10 flex items-center">
                <Link
                    href={route("catalog")}
                    className="flex items-center text-sm font-bold bg-zinc-900/80 hover:bg-zinc-800 text-gray-200 px-4 py-2 rounded-md transition backdrop-blur-sm"
                >
                    ← Retour au catalogue
                </Link>
            </header>

            {/* CONTENEUR DU LECTEUR EN PLEIN ÉCRAN */}
            <main className="flex-grow flex items-center justify-center pt-16">
                <div className="w-full h-full aspect-video max-h-[85vh] shadow-2xl">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&modestbranding=1&rel=0`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </main>

            {/* DÉTAILS DE LA VIDÉO EN DESSOUS */}
            <section className="bg-zinc-950 p-6 lg:p-12 border-t border-zinc-900">
                <div className="max-w-4xl mx-auto space-y-3">
                    <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                        {video.title}
                    </h1>
                    <span className="inline-block bg-zinc-800 text-zinc-400 text-xs px-2.5 py-1 rounded uppercase font-bold tracking-wider">
                        {video.category}
                    </span>
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed pt-2">
                        {video.description}
                    </p>
                </div>
            </section>
        </div>
    );
}
