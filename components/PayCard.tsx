import { AiOutlineClose } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import PlayButton from './PlayButton'
import FavoriteButton from './FavoriteButton'
import useInfoModal from '@/hooks/useInfoModal'
import usePayCard from '@/hooks/usePayCard'
import useMovie from '@/hooks/useMovie'
import { useCallback, useEffect, useState } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'


interface PayCardProps {
    visible?: boolean,
    onClose: any
}

const PayCard: React.FC<PayCardProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible)
    const router = useRouter()
    const { data: user } = useCurrentUser()
    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible])
    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => { onClose() }, 300)
    }, [onClose])

    if (!visible) {
        return null
    }
    return (
        <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 fixed'>
            <div className='relative w-5/6 mx-auto max-w-2xl rounded-md overflow-hidden'>
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md p-11 `}>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <div className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black flex bg-opacity-70 items-center justify-center' onClick={handleClose}>
                            <AiOutlineClose size={20} className='text-white' />
                        </div>
                        <h3 className="mb-4 text-2xl font-semibold">NetFlix Plus</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$99</span>
                            <label htmlFor="">/months</label>
                        </div>

                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <TiTick className='text-green-500' size={25} />
                                <span>Độ phân giải <span className="font-semibold">4K (Ultra HD) + HDR</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <TiTick className='text-green-500' size={25} />
                                <span>Chất lượng video: <span className="font-semibold">Tốt nhất</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <TiTick className='text-green-500' size={25} />
                                <span>Tình trạng films: <span className="font-semibold">Cập nhật liên tục</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <TiTick className='text-green-500' size={25} />
                                <span>Thiết bị được hỗ trợ <span className="font-semibold">TV, máy tính, điện thoại di động, máy tính bảng</span></span>
                            </li>
                        </ul>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => router.push('/pay')}>
                            Upgrade to Plus
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PayCard