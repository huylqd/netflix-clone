import { BsFillPlayFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import usePayCard from '@/hooks/usePayCard';
import useCurrentUser from '@/hooks/useCurrentUser';

interface PlayButtonProps {
    movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    const router = useRouter();
    const { openPayCard } = usePayCard();
    const {data: user} = useCurrentUser()
    
    const handleButtonClick = () => {
        if (user?.customer === "TRUE") {
          router.push(`/watch/${movieId}`);
        } else {
           openPayCard(user?.customer)
        }
      };
    return (
        <button onClick={handleButtonClick}
            className='
            bg-white
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs
            lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-neutral-300
            transition
            '
        >
            <BsFillPlayFill size={25} className='mr-1' />
            Play
        </button>
    )
}
export default PlayButton