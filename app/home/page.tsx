"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import BillBoard from "@/components/BillBoard"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"
import InfoModal from "@/components/InfoModal"
import useInfoModal from "@/hooks/useInfoModal"
import useCurrentUser from "@/hooks/useCurrentUser"
import usePayCard from "@/hooks/usePayCard"
import PayCard from "@/components/PayCard"
import { useVideoContext } from "../VideoProvider";
export default function Home() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth')
        }
    })
    const { videoState, setVideoState } = useVideoContext();
    console.log('video state', videoState);
    
    const { data: user } = useCurrentUser();
    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useInfoModal();
    const { isOpenPayCard, closePayCard } = usePayCard()
    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            {user?.customer === "FALSE" && <PayCard visible={isOpenPayCard} onClose={closePayCard}/>}
            
            <Navbar />
            <BillBoard />
            <div className="pb-40">
                <MovieList title="Trending Now" data={movies} />
                <MovieList title="My List" data={favorites} />
            </div>
        </>
    )
}