// resources/js/Pages/Admin/Videos/Index.jsx
import { Head, useForm, Link, router } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    Film,
    Plus,
    Trash2,
    Video,
    Clock,
    Tag,
    AlignLeft,
    Tv,
    Edit2,
    X,
} from "lucide-react";

export default function Index({ auth, videos = [] }) {
    // État local pour savoir si on est en train de modifier une vidéo
    const [editingVideo, setEditingVideo] = useState(null);

    // Récupération unique de toutes les catégories existantes pour alimenter le select
    const uniqueCategories = [...new Set(videos.map((v) => v.category))].filter(
        Boolean,
    );

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: "",
        description: "",
        youtube_id: "",
        category: "",
        duration: "",
    });

    // Gestion de la soumission (Ajout OU Modification)
    const submit = (e) => {
        e.preventDefault();
        if (editingVideo) {
            // Mode Modification
            put(route("admin.videos.update", editingVideo.id), {
                onSuccess: () => cancelEditing(),
            });
        } else {
            // Mode Ajout
            post(route("admin.videos.store"), {
                onFinish: () => reset(),
            });
        }
    };

    // Activer le mode édition et préremplir le formulaire
    const startEditing = (video) => {
        setEditingVideo(video);
        setData({
            title: video.title || "",
            description: video.description || "",
            youtube_id: video.youtube_id || "",
            category: video.category || "",
            duration: video.duration || "",
        });
    };

    // Annuler l'édition et vider le formulaire
    const cancelEditing = () => {
        setEditingVideo(null);
        reset();
    };

    return (
        <AppLayout>
            <Head
                title={
                    editingVideo
                        ? "Modifier la Vidéo - Admin"
                        : "Gestion des Vidéos - Admin"
                }
            />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-12 space-y-10 select-none">
                {/* EN-TÊTE DE LA PAGE */}
                <div className="flex flex-col gap-2 border-b border-zinc-900 pb-5">
                    <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3 sm:text-4xl">
                        <Film className="text-red-600" size={32} />
                        Console d'Administration
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Ajoutez, organisez, modifiez et supprimez les vidéos
                        disponibles sur le catalogue Lolflix.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* COLONNE GAUCHE : FORMULAIRE D'AJOUT OU DE MODIFICATION */}
                    <section
                        className={`lg:col-span-1 bg-zinc-950 border rounded-xl p-6 shadow-2xl space-y-6 transition-colors duration-300 ${editingVideo ? "border-amber-500/30 ring-1 ring-amber-500/10" : "border-zinc-900"}`}
                    >
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                            <div className="flex items-center gap-2">
                                <Video
                                    size={18}
                                    className={
                                        editingVideo
                                            ? "text-amber-500"
                                            : "text-red-500"
                                    }
                                />
                                <h2 className="text-lg font-bold text-white">
                                    {editingVideo
                                        ? "Modifier la vidéo"
                                        : "Ajouter une vidéo"}
                                </h2>
                            </div>
                            {editingVideo && (
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-white transition bg-zinc-900 px-2 py-1 rounded border border-zinc-800"
                                >
                                    <X size={12} /> Annuler
                                </button>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Titre */}
                            <div className="space-y-1.5">
                                <InputLabel
                                    htmlFor="title"
                                    value="Titre de la vidéo"
                                    className="text-xs font-semibold text-zinc-400"
                                />
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                        <Tag size={14} />
                                    </span>
                                    <TextInput
                                        id="title"
                                        value={data.title}
                                        className="w-full rounded-lg border border-zinc-800 bg-black/40 py-2.5 pl-9 pr-4 text-sm text-white focus:border-red-500 focus:ring-0 transition"
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.title}
                                    className="text-xs text-red-400"
                                />
                            </div>

                            {/* YouTube ID */}
                            <div className="space-y-1.5">
                                <InputLabel
                                    htmlFor="youtube_id"
                                    value="ID de la vidéo YouTube"
                                    className="text-xs font-semibold text-zinc-400"
                                />
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                        <Tv size={14} />
                                    </span>
                                    <TextInput
                                        id="youtube_id"
                                        value={data.youtube_id}
                                        placeholder="ex: dQw4w9WgXcQ"
                                        className="w-full rounded-lg border border-zinc-800 bg-black/40 py-2.5 pl-9 pr-4 text-sm text-white focus:border-red-500 focus:ring-0 transition placeholder:text-zinc-600"
                                        onChange={(e) =>
                                            setData(
                                                "youtube_id",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.youtube_id}
                                    className="text-xs text-red-400"
                                />
                            </div>

                            {/* Catégorie (Choix multiple ou nouveau) & Durée */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <InputLabel
                                        htmlFor="category"
                                        value="Catégorie"
                                        className="text-xs font-semibold text-zinc-400"
                                    />
                                    <div className="space-y-2">
                                        {/* Input texte pour taper une catégorie (existante ou nouvelle) */}
                                        <TextInput
                                            id="category"
                                            value={data.category}
                                            placeholder="ex: Best-of..."
                                            list="categories-list"
                                            className="w-full rounded-lg border border-zinc-800 bg-black/40 py-2.5 px-3 text-sm text-white focus:border-red-500 focus:ring-0 transition placeholder:text-zinc-600"
                                            onChange={(e) =>
                                                setData(
                                                    "category",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {/* Datalist HTML5 natif pour suggérer proprement sans casser les styles */}
                                        <datalist id="categories-list">
                                            {uniqueCategories.map((cat) => (
                                                <option key={cat} value={cat} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <InputError
                                        message={errors.category}
                                        className="text-xs text-red-400"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel
                                        htmlFor="duration"
                                        value="Durée (min)"
                                        className="text-xs font-semibold text-zinc-400"
                                    />
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                            <Clock size={14} />
                                        </span>
                                        <TextInput
                                            id="duration"
                                            type="number"
                                            value={data.duration}
                                            className="w-full rounded-lg border border-zinc-800 bg-black/40 py-2.5 pl-9 pr-4 text-sm text-white focus:border-red-500 focus:ring-0 transition"
                                            onChange={(e) =>
                                                setData(
                                                    "duration",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.duration}
                                        className="text-xs text-red-400"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                    className="text-xs font-semibold text-zinc-400"
                                />
                                <div className="relative">
                                    <span className="absolute top-3 left-3 text-zinc-500">
                                        <AlignLeft size={14} />
                                    </span>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        rows="4"
                                        className="w-full rounded-lg border border-zinc-800 bg-black/40 py-2.5 pl-9 pr-4 text-sm text-white focus:border-red-500 focus:ring-0 transition outline-none resize-none"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    ></textarea>
                                </div>
                                <InputError
                                    message={errors.description}
                                    className="text-xs text-red-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-bold text-sm rounded-lg transition duration-200 shadow-md active:scale-[0.99] ${
                                    editingVideo
                                        ? "bg-amber-600 hover:bg-amber-700 shadow-amber-900/20"
                                        : "bg-red-600 hover:bg-red-700 shadow-red-900/20 disabled:bg-zinc-800"
                                }`}
                            >
                                {editingVideo ? (
                                    <>
                                        <Edit2 size={16} />
                                        Mettre à jour
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Mettre en ligne
                                    </>
                                )}
                            </button>
                        </form>
                    </section>

                    {/* COLONNE DROITE : LISTE DES VIDÉOS EXISTANTES */}
                    <section className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                Vidéos en ligne
                                <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-semibold border border-zinc-700/60">
                                    {videos.length}
                                </span>
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            {videos.length === 0 ? (
                                <p className="text-center text-zinc-500 py-16 text-sm italic">
                                    Aucune vidéo disponible pour le moment.
                                </p>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-zinc-900 bg-zinc-900/10 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                            <th className="px-6 py-4">
                                                Miniature & Infos
                                            </th>
                                            <th className="px-6 py-4">
                                                Catégorie
                                            </th>
                                            <th className="px-6 py-4 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-900 text-sm">
                                        {videos.map((video) => (
                                            <tr
                                                key={video.id}
                                                className={`hover:bg-zinc-900/20 transition duration-150 group ${editingVideo?.id === video.id ? "bg-amber-950/10" : ""}`}
                                            >
                                                {/* Miniature + Titre */}
                                                <td className="px-6 py-4 flex items-center gap-4 min-w-[280px]">
                                                    <div className="w-24 aspect-video bg-zinc-900 rounded-md overflow-hidden flex-shrink-0 border border-zinc-800">
                                                        <img
                                                            src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-zinc-200 truncate group-hover:text-white transition">
                                                            {video.title}
                                                        </h4>
                                                        <p className="text-xs text-zinc-500 font-semibold mt-0.5 flex items-center gap-1">
                                                            <Clock size={12} />{" "}
                                                            {video.duration ??
                                                                "--"}{" "}
                                                            min
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Catégorie */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-block bg-zinc-900 border border-zinc-800/80 text-zinc-400 text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                                                        {video.category}
                                                    </span>
                                                </td>

                                                {/* Actions (Modifier / Supprimer) */}
                                                <td className="px-6 py-4 text-right whitespace-nowrap space-x-1">
                                                    {/* Bouton Modifier */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditing(video)
                                                        }
                                                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${editingVideo?.id === video.id ? "bg-amber-500 text-black" : "text-zinc-500 hover:bg-zinc-900 hover:text-white"}`}
                                                        title="Modifier les détails"
                                                    >
                                                        <Edit2 size={15} />
                                                    </button>

                                                    {/* Bouton Supprimer */}
                                                    <Link
                                                        href={route(
                                                            "admin.videos.destroy",
                                                            video.id,
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-red-950/30 hover:text-red-500 transition"
                                                        title="Supprimer la vidéo"
                                                    >
                                                        <Trash2 size={15} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
