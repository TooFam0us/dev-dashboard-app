import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';



interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    bio: string;
}

export default function GitHubWidget({username}: {username: string}) {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            setUser(null);

            try {
                const res = await fetch(`https://api.github.com/users/${username}`);
                if(!res.ok){
                    throw new Error(`User not found: ${username}`);
                }

                const data: GitHubUser = await res.json();
                setUser(data);
            } catch (err) {
                setError(
                    err && typeof err === "object" && "message" in err
                        ? String((err as { message: unknown }).message)
                        : "An unexpected error occurred"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);


    return (
        <motion.div
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all"
            initial={{ opacity: 0, y: 10}}
            animate={{ opacity: 1, y: 0}}
        >
            <h2 className="text-xl font-semibold mb-2">GitHub Profile</h2>

            {loading && (
                <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"/>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"/>
                </div>
            )}

            {error && (
                <div className="text-red-500 font-medium">{error}</div>
            )}

            {user && (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border shadow-sm transition-transform duration-200 hover:scale-105"
                        style={{
                            width: 'clamp(64px, 15vw, 96px)',
                            height: 'clamp(64px, 15vw, 96px)',
                        }}
                    />
                    <div>
                        <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-lg font-medium text-indigo-600 hover:underline break-all"
                            >
                                {user.login}
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{user.bio}</p>
                            <p className="text-sm mt-1">
                                📦 {user.public_repos} repos · 👥 {user.followers} followers
                            </p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}