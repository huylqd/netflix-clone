"use client"
import { redirect, useRouter } from "next/navigation";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../../VideoProvider";
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
    const videoRef: any = useRef(null);
    const { videoState, setVideoState } = useVideoContext();
    console.log('videoState',videoState);

    useEffect(() => {
        if (
            videoState.movieId === movieId &&
            videoRef.current &&
            videoState.currentTime
        ) {
            videoRef.current.currentTime = videoState.currentTime;
        }
    }, [movieId]);
    
    useEffect(() => {
        const saveTime = () => {
            const currentTime = videoRef.current?.currentTime;
            setVideoState((prevState) => ({
                ...prevState,
                movieId,
                currentTime,
            }));
        };

        const handleBeforeUnload = () => {
            saveTime();
        };

        const handleLoadedMetadata = () => {
            if (videoState.movieId === movieId && videoState.currentTime) {
                videoRef.current.currentTime = videoState.currentTime;
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        videoRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
            saveTime();
            window.removeEventListener("beforeunload", handleBeforeUnload);
            videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [movieId, setVideoState]);
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

            ></video>
        </div>
    )

}