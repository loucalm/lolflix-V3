import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Watch({ video }) {
    return (
        <AppLayout hideHeroAndSearch={true}>
            <Head title={`Regarder ${video.title}`} />

            <main className="flex-grow flex flex-col items-center justify-center pt-20">
                <div className="w-full p-4">
                    <Link
                        href={route("catalog")}
                        className="inline-flex items-center text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-gray-300 px-4 py-2 rounded border border-zinc-800 mb-4 transition"
                    >
                        ← Retour au catalogue
                    </Link>

                    <div className="w-full aspect-video shadow-2xl rounded-md overflow-hidden bg-black border border-zinc-900">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&modestbranding=1&rel=0`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </main>

            <section className="bg-zinc-950 p-6 lg:p-12 border-t border-zinc-900">
                <div className="mx-auto space-y-3">
                    <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                        {video.title}
                    </h1>
                    <span className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs px-2.5 py-1 rounded uppercase font-bold">
                        {video.category}
                    </span>
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed pt-2">
                        {video.description}
                    </p>
                </div>
            </section>
        </AppLayout>
    );
}
