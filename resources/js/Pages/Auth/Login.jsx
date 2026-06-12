import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status }) {
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
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Connexion Lolflix" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Adresse Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-zinc-800 text-white border-zinc-700 focus:border-red-500 focus:ring-red-500"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-zinc-800 text-white border-zinc-700 focus:border-red-500 focus:ring-red-500"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-400">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link
                        href={route("register")}
                        className="text-sm text-gray-400 hover:text-gray-100 underline"
                    >
                        Créer un compte ?
                    </Link>

                    <div className="flex space-x-3">
                        {/* BOUTON INVITÉ */}
                        <Link
                            href="/guest-login"
                            method="post"
                            as="button"
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-md text-sm transition"
                        >
                            Mode Invité
                        </Link>

                        <PrimaryButton
                            className="ms-4 bg-red-600 hover:bg-red-700 text-white font-bold"
                            disabled={processing}
                        >
                            Se connecter
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
