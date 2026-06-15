import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import useSound from "use-sound";
import { Home, LogOut, Search, UserCircle2, X } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function AppLayout({ children, search, setSearch }) {
    const { auth, isGuest } = usePage().props;
    const user = auth?.user;
    const [isTop, setIsTop] = useState(true);

    const [playHover] = useSound("/sounds/hover.mp3", {
        volume: 0.15,
        interrupt: true,
        preload: true,
    });
    const [playClick] = useSound("/sounds/click.mp3", {
        volume: 0.3,
        interrupt: true,
        preload: true,
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY <= 10);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const interactiveSelector =
            'a, button, [role="button"], input[type="button"], input[type="submit"]';

        const handleMouseOver = (event) => {
            const interactiveElement =
                event.target.closest(interactiveSelector);

            if (!interactiveElement) {
                return;
            }

            if (
                event.relatedTarget &&
                interactiveElement.contains(event.relatedTarget)
            ) {
                return;
            }

            playHover();
        };

        const handlePointerDown = (event) => {
            const interactiveElement =
                event.target.closest(interactiveSelector);

            if (!interactiveElement) {
                return;
            }

            playClick();
        };

        document.addEventListener("mouseover", handleMouseOver, true);
        document.addEventListener("pointerdown", handlePointerDown, true);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver, true);
            document.removeEventListener(
                "pointerdown",
                handlePointerDown,
                true,
            );
        };
    }, [playClick, playHover]);

    const logoutRoute = isGuest ? route("guest.logout") : route("logout");

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
            <header
                className={`fixed top-0 z-40 w-full transition-colors duration-500 ease-in-out ${
                    isTop
                        ? "bg-gradient-to-b from-black/70 to-transparent"
                        : "bg-zinc-950/80 backdrop-blur-sm"
                }`}
            >
                <div className="grid grid-cols-1 items-center gap-4 px-4 py-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-8 md:px-8">
                    <div className="flex items-center gap-8">
                        <Link href={route("catalog")}>
                            <ApplicationLogo className="h-6 w-auto md:h-10" />
                        </Link>
                    </div>

                    {typeof setSearch === "function" && (
                        <div className="w-full flex justify-center">
                            <div className="relative w-full max-w-3xl">
                                <Search
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                    size={18}
                                />
                                <input
                                    type="search"
                                    value={search || ""}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Rechercher une vidéo, une catégorie, un mot-clé..."
                                    className="w-full rounded-full border border-white/20 bg-black/50 py-2 px-11 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/60 focus:bg-white/10 focus:ring-0"
                                />
                                {search ? (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="text-nowrap absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X size={16} />
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-self-end gap-3 text-sm">
                        {user ? (
                            <>
                                <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 sm:inline-flex">
                                    <UserCircle2 size={16} />
                                    {user.name}
                                </span>
                                <Link
                                    href={logoutRoute}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-200 transition hover:bg-white/10 hover:text-white"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </Link>
                            </>
                        ) : isGuest ? (
                            <Link
                                href={route("guest.logout")}
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-200 transition hover:bg-white/10 hover:text-white"
                            >
                                <LogOut size={16} />
                                Quitter l'invité
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-200 transition hover:bg-white/10 hover:text-white"
                            >
                                Se connecter
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className={typeof setSearch === "function" ? "" : ""}>
                {children}
            </main>
        </div>
    );
}
