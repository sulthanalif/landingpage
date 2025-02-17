import { usePage } from '@inertiajs/react';

export default function Home() {
    const props = usePage().props;

    return (
        <>
            <div className="flex justify-center">
                <h1>{props.title}</h1>

            </div>
            <div className=" mt-4">
                <h2>Daftar Users:</h2>
                <ul>
                    {props.users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
