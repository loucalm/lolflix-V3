import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ videos }) {
    const [editingVideo, setEditingVideo] = useState(null);

    // Formulaire Inertia unique pour l'ajout et la modification
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        reset,
        errors,
        processing,
    } = useForm({
        title: "",
        description: "",
        youtube_id: "",
        category: "Vlogs",
        duration: "",
    });

    // Soumission du formulaire (Ajout ou Édition)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVideo) {
            patch(route("admin.videos.update", editingVideo.id), {
                onSuccess: () => {
                    setEditingVideo(null);
                    reset();
                },
            });
        } else {
            post(route("admin.videos.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    // Préparer le formulaire pour la modification
    const handleEdit = (video) => {
        setEditingVideo(video);
        setData({
            title: video.title,
            description: video.description,
            youtube_id: video.youtube_id,
            category: video.category,
            duration: video.duration,
        });
    };

    // Annuler la modification en cours
    const cancelEdit = () => {
        setEditingVideo(null);
        reset();
    };

    // Supprimer une vidéo
    const handleDelete = (id) => {
        if (
            confirm("Voulez-vous vraiment supprimer cette vidéo de Lolflix ?")
        ) {
            destroy(route("admin.videos.destroy", id));
        }
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans p-6 lg:p-12">
            <Head title="Gestion des vidéos - Lolflix" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER PANEL */}
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-3xl font-black text-red-600 uppercase tracking-wider">
                            Back-Office Lolflix
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Ajouter, modifier ou supprimer les vidéos du
                            catalogue
                        </p>
                    </div>
                    <Link
                        href={route("catalog")}
                        className="bg-zinc-800 hover:bg-zinc-700 text-sm px-4 py-2 rounded font-bold transition"
                    >
                        ← Retour au Site
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* COLONNE 1 : FORMULAIRE D'AJOUT / MODIFICATION */}
                    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 h-fit">
                        <h2 className="text-xl font-bold mb-4 text-gray-200">
                            {editingVideo
                                ? "📝 Modifier la vidéo"
                                : "➕ Ajouter une vidéo"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-1">
                                    Titre
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-white focus:border-red-600 focus:ring-0"
                                />
                                {errors.title && (
                                    <span className="text-red-500 text-xs">
                                        {errors.title}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows="3"
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-white focus:border-red-600 focus:ring-0"
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-xs">
                                        {errors.description}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-1">
                                        YouTube ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ex: dQw4w9WgXcQ"
                                        value={data.youtube_id}
                                        onChange={(e) =>
                                            setData(
                                                "youtube_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-white focus:border-red-600 focus:ring-0"
                                    />
                                    {errors.youtube_id && (
                                        <span className="text-red-500 text-xs">
                                            {errors.youtube_id}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-1">
                                        Durée (secondes)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                        className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-white focus:border-red-600 focus:ring-0"
                                    />
                                    {errors.duration && (
                                        <span className="text-red-500 text-xs">
                                            {errors.duration}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wide text-gray-400 font-bold mb-1">
                                    Catégorie
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-white focus:border-red-600 focus:ring-0"
                                >
                                    <option value="Vlogs">Vlogs</option>
                                    <option value="Films">Films</option>
                                    <option value="Séries">Séries</option>
                                    <option value="Documentaires">
                                        Documentaires
                                    </option>
                                </select>
                                {errors.category && (
                                    <span className="text-red-500 text-xs">
                                        {errors.category}
                                    </span>
                                )}
                            </div>

                            <div className="pt-2 flex space-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-bold transition"
                                >
                                    {editingVideo
                                        ? "Sauvegarder"
                                        : "Ajouter au catalogue"}
                                </button>
                                {editingVideo && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm font-bold transition"
                                    >
                                        Annuler
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* COLONNE 2 : TABLEAU DE LA LISTE DES VIDÉOS EXISTANTES */}
                    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 lg:col-span-2 overflow-x-auto">
                        <h2 className="text-xl font-bold mb-4 text-gray-200">
                            Vidéos en ligne ({videos.length})
                        </h2>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-gray-400">
                                    <th className="pb-3 font-bold">
                                        Miniature
                                    </th>
                                    <th className="pb-3 font-bold">
                                        Titre / Catégorie
                                    </th>
                                    <th className="pb-3 font-bold text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800 text-sm">
                                {videos.map((video) => (
                                    <tr
                                        key={video.id}
                                        className="group hover:bg-zinc-950/40 transition"
                                    >
                                        <td className="py-3 pr-4 w-32">
                                            <div className="aspect-video w-28 bg-black rounded overflow-hidden shadow">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                    className="w-full h-full object-cover"
                                                    alt=""
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <p className="font-bold text-gray-100 line-clamp-1">
                                                {video.title}
                                            </p>
                                            <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-0.5 rounded inline-block mt-1 font-semibold">
                                                {video.category}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    handleEdit(video)
                                                }
                                                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-gray-200 px-3 py-1.5 rounded font-bold transition"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(video.id)
                                                }
                                                className="text-xs bg-red-950/60 hover:bg-red-900 text-red-400 px-3 py-1.5 rounded font-bold transition"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
