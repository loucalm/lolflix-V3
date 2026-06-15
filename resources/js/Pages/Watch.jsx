import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowLeft, Clock3, Film, Play, Shuffle } from "lucide-react";

export default function Watch({ video, relatedVideos = [] }) {
    return (
        <AppLayout hideHeroAndSearch={true}>
            <Head title={`Regarder ${video.title}`} />

            <main className="mx-auto max-w-[1600px] px-4 pb-12 pt-12 lg:px-8 lg:pt-20">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <section className="space-y-4">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                            <div className="aspect-video w-full">
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

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
                                    <Play size={12} fill="currentColor" />
                                    Lecture
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
                                    <Film size={12} />
                                    {video.category}
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                <h1 className="text-3xl font-black tracking-tight text-white lg:text-5xl">
                                    {video.title}
                                </h1>
                                <p className="max-w-3xl text-sm leading-relaxed text-zinc-300 lg:text-base">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
                        <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4 shadow-2xl">
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                                        Suggestions
                                    </p>
                                    <h2 className="mt-1 text-lg font-bold text-white">
                                        À regarder ensuite
                                    </h2>
                                </div>
                                <Shuffle size={18} className="text-zinc-400" />
                            </div>

                            <div className="mt-4 space-y-3">
                                {relatedVideos.map((relatedVideo) => (
                                    <Link
                                        key={relatedVideo.id}
                                        href={route(
                                            "videos.watch",
                                            relatedVideo.id,
                                        )}
                                        className="group flex items-start gap-3 rounded-xl border border-transparent bg-white/5 p-2 transition hover:border-white/10 hover:bg-white/10"
                                    >
                                        <div className="relative w-28 shrink-0 overflow-hidden rounded-lg bg-black/40">
                                            <img
                                                src={`https://img.youtube.com/vi/${relatedVideo.youtube_id}/mqdefault.jpg`}
                                                alt=""
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-2 text-sm font-semibold text-white">
                                                {relatedVideo.title}
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                                                <Clock3 size={12} />
                                                {relatedVideo.duration ??
                                                    "--"}{" "}
                                                min
                                            </p>
                                        </div>
                                    </Link>
                                ))}

                                {relatedVideos.length === 0 && (
                                    <p className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-zinc-400">
                                        Aucune suggestion disponible pour le
                                        moment.
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </AppLayout>
    );
}
