import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout hideHeroAndSearch={true}>
            <Head title="Mon Profil" />

            <div className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-zinc-900 border border-zinc-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl text-white"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-zinc-900 border border-zinc-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl text-white" />
                    </div>

                    <div className="p-4 sm:p-8 bg-zinc-900 border border-zinc-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl text-white" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
