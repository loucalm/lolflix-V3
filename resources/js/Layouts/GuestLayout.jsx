import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-10 text-white selection:bg-red-600">
            <div className="absolute inset-0 bg-[url('/public/images/background.jpg')] bg-fixed opacity-60 bg-cover bg-center" />
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[18px] bg-black/80 backdrop-blur-sm  shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                <div className="px-7 pb-8 pt-8 sm:px-8">
                    <div className="flex flex-col items-center text-center">
                        <Link href="/" className="inline-flex">
                            <ApplicationLogo className="h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="mt-7">{children}</div>
                </div>
            </div>
        </div>
    );
}
