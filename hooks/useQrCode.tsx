import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useQrCode = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/thenQr', fetcher)
    return {
        data, 
        error,
        isLoading,
        mutate
    }
}

export default useQrCode