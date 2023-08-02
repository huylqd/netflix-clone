"use client"
import { redirect, useRouter } from "next/navigation";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
export default function Watch() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin')
        }
    })
    const router = useRouter();
    const { movieId } = useParams();
    const { data } = useMovie(movieId as string);

    const storedWatchedFilms = localStorage.getItem("watchedFilms");
    const initialWatchedFilms = storedWatchedFilms ? JSON.parse(storedWatchedFilms) : [];
    const [watchedFilms, setWatchedFilms] = useState(initialWatchedFilms);
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
    }, [watchedFilms]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                const film = { id: movieId, watchedTime: currentTime };
                const updatedWatchedFilms = watchedFilms.filter((film: any) => film.id !== movieId);
                updatedWatchedFilms.push(film);
                setWatchedFilms(updatedWatchedFilms);
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [movieId, watchedFilms]);

    useEffect(() => {
        if (videoRef.current && data) {
              videoRef.current.pause();
            const film = watchedFilms.find((film: any) => film.id === movieId);
            if (film) {
                videoRef.current.currentTime = film.watchedTime;
            } else {
                videoRef.current.currentTime = 0;
            }
            videoRef.current.src = data.videoUrl;
              videoRef.current.load();
              videoRef.current.play();
            videoRef.current.muted = true;
        }
    }, [data, movieId, watchedFilms]);

    const debouncedUpdateWatchedTime = useRef<NodeJS.Timeout | null>(null);
    const handleVideoTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            if (debouncedUpdateWatchedTime.current) {
                clearTimeout(debouncedUpdateWatchedTime.current);
            }
            debouncedUpdateWatchedTime.current = setTimeout(() => {
                const film = { id: movieId, watchedTime: currentTime };
                const updatedWatchedFilms = watchedFilms.filter((film: any) => film.id !== movieId);
                updatedWatchedFilms.push(film);
                setWatchedFilms(updatedWatchedFilms);
            }, 1000);
        }
    };

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-50">
                <AiOutlineArrowLeft onClick={() => router.push('/home')} size={40} className="text-white cursor-pointer" />
                <p className="text-white text-1xl md:text-3xl">
                    <span className="font-light">
                        Watching:{" "}
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video
                ref={videoRef}
                className="h-full w-full"
                controls
                autoPlay
                src={data?.videoUrl}
                onTimeUpdate={handleVideoTimeUpdate}
            // onCanPlay={handleVideoCanPlay}
            ></video>
        </div>
    )

}