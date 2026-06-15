import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowRight,
    CirclePlay,
    Eye,
    EyeOff,
    LogIn,
    Shield,
    Sparkles,
    User,
} from "lucide-react";
import useSound from "use-sound";

export default function Login({ status }) {
    const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.15 });
    const [playClick] = useSound("/sounds/click.mp3", { volume: 0.3 });
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        playClick();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="space-y-6 text-left">
                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Ravi de vous revoir
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Connectez-vous pour accéder à vos clips et moments
                        gaming favoris.
                    </p>
                </div>

                {status && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-400 backdrop-blur-md">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="email"
                            value="Adresse Email"
                            className="text-zinc-300 font-medium"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center honesty pl-3 text-zinc-500">
                                <User size={18} />
                            </span>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                autoComplete="username"
                                isFocused={true}
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
                        <div className="flex items-center justify-between">
                            <InputLabel
                                htmlFor="password"
                                value="Mot de passe"
                                className="text-zinc-300 font-medium"
                            />
                        </div>
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
                                autoComplete="current-password"
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

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-zinc-800 bg-zinc-900 text-red-600 focus:ring-red-500 focus:ring-offset-zinc-950"
                            />
                            <span className="text-sm text-zinc-400 hover:text-zinc-300 transition">
                                Se souvenir de moi
                            </span>
                        </label>
                    </div>

                    <div className="space-y-4 pt-2">
                        <PrimaryButton
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white transition hover:bg-red-500 shadow-lg shadow-red-600/10 active:scale-[0.99]"
                            disabled={processing}
                            onMouseEnter={playHover}
                        >
                            <LogIn size={16} />
                            Se connecter
                        </PrimaryButton>

                        <Link
                            href="/guest-login"
                            method="post"
                            as="button"
                            onMouseEnter={playHover}
                            onClick={playClick}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                        >
                            <CirclePlay size={16} className="text-red-500" />
                            Mode Invité
                        </Link>

                        <p className="text-center text-sm text-zinc-500">
                            Pas encore de compte ?{" "}
                            <Link
                                href={route("register")}
                                onMouseEnter={playHover}
                                onClick={playClick}
                                className="font-semibold text-zinc-300 hover:text-red-400 transition underline underline-offset-4"
                            >
                                S'inscrire gratuitement
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
