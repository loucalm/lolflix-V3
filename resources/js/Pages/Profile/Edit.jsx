// resources/js/Pages/Profile/Edit.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Settings, ShieldAlert, KeyRound, UserRound } from "lucide-react";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Paramètres du compte" />

            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-10 select-none">
                {/* EN-TÊTE DE SECTION */}
                <div className="flex flex-col gap-2 border-b border-zinc-800 pb-5">
                    <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3 sm:text-4xl">
                        <Settings
                            className="text-red-600 animate-[spin_4s_linear_infinite]"
                            size={28}
                        />
                        Paramètres du Profil
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Gérez vos informations personnelles, sécurisez votre
                        compte et configurez vos accès.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* BLOC 1 : INFORMATIONS PERSONNELLES */}
                    <section className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 mb-6">
                            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-800 text-red-500">
                                <UserRound size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Informations du compte
                                </h2>
                                <p className="text-xs text-zinc-500">
                                    Mettez à jour le nom d'utilisateur et
                                    l'adresse email de votre compte.
                                </p>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </section>

                    {/* BLOC 2 : MOT DE PASSE */}
                    <section className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-6">
                            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-500">
                                <KeyRound size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Sécurité du compte
                                </h2>
                                <p className="text-xs text-zinc-500">
                                    Assurez-vous d'utiliser un mot de passe long
                                    et complexe pour rester protégé.
                                </p>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <UpdatePasswordForm />
                        </div>
                    </section>

                    {/* BLOC 3 : DANGER ZONE (SUPPRESSION) */}
                    <section className="bg-zinc-950 border border-red-950/40 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-red-950/5 to-transparent">
                        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-6">
                            <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/30 text-red-500">
                                <ShieldAlert size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-red-500">
                                    Zone de danger
                                </h2>
                                <p className="text-xs text-zinc-500">
                                    Action irréversible. Une fois supprimé,
                                    toutes les données associées à votre compte
                                    seront perdues.
                                </p>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <DeleteUserForm />
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
