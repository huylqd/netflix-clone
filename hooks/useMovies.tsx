import fetcher from '@/lib/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr'

const useMovies = () => {
    const { data, error, isLoading } = useSWR(`/api/movies/` , fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const addMovie = async (data: any) => {
        await axios.post('/api/addMovie', { data })
        mutate('/api/movies/');
    }
    const deleteMovie = async (id: string) => {
        await axios.delete(`/api/movies/${id}`)
        mutate('/api/movies/');
    }
    const updateMovie = async (id?: string, data?: any) => {
        await axios.put( `/api/movies/${id}`, {data})
        mutate('/api/movies/');
    }
    const uploadVideo = async (data: any) => {
        await axios.post('/api/uploadVideo', { data })
        mutate('/api/movies/');
    }
    return {
        data,
        error,
        isLoading,
        addMovie,
        deleteMovie,
        updateMovie,
        uploadVideo
    }
}
export default useMovies;