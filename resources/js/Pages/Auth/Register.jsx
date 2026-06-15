import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowRight,
    BadgeCheck,
    Mail,
    Sparkles,
    User,
    UserPlus,
    Shield,
} from "lucide-react";
import useSound from "use-sound";

export default function Register() {
    const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.15 });
    const [playClick] = useSound("/sounds/click.mp3", { volume: 0.3 });
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        playClick();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="S'inscrire" />

            <div className="space-y-6 text-left">
                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Créer un compte
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Inscrivez-vous en quelques secondes pour configurer
                        votre profil Lolflix.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="name"
                            value="Nom d'utilisateur"
                            className="text-zinc-300 font-medium"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                <User size={18} />
                            </span>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Pseudo_Gaming"
                                required
                            />
                        </div>
                        <InputError
                            message={errors.name}
                            className="text-xs text-red-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="email"
                            value="Adresse Email"
                            className="text-zinc-300 font-medium"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                <Mail size={18} />
                            </span>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        <InputError
                            message={errors.email}
                            className="text-xs text-red-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            className="text-zinc-300 font-medium"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                <Shield size={18} />
                            </span>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="text-xs text-red-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmer le mot de passe"
                            className="text-zinc-300 font-medium"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                <BadgeCheck size={18} />
                            </span>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password_confirmation}
                            className="text-xs text-red-400"
                        />
                    </div>

                    <div className="space-y-4 pt-4">
                        <PrimaryButton
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white transition hover:bg-red-500 shadow-lg shadow-red-600/10 active:scale-[0.99]"
                            disabled={processing}
                            onMouseEnter={playHover}
                        >
                            <UserPlus size={16} />
                            S'inscrire
                            <ArrowRight size={16} />
                        </PrimaryButton>

                        <p className="text-center text-sm text-zinc-500">
                            Déjà inscrit ?{" "}
                            <Link
                                href={route("login")}
                                onMouseEnter={playHover}
                                onClick={playClick}
                                className="font-semibold text-zinc-300 hover:text-red-400 transition underline underline-offset-4"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
