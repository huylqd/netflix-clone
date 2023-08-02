import useSWR from 'swr'
import axios from 'axios'
import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)
    const updateUser = async (id?: string, data?: any) => {
        await axios.put(`/api/current/${id}`, { data })
        mutate('api/current')
    } 
    return {
        data, 
        error,
        isLoading,
        mutate,
        updateUser
    }
}

export default useCurrentUser