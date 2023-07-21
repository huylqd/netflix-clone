'use client'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAddCircle } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import useMovies from '@/hooks/useMovies'
interface DataProps {
    key: any
    data: Record<string, any>
}
const DataTable: React.FC<DataProps> = ({data, key}) => {
    const router = useRouter()
    const { deleteMovie } = useMovies()
    const delMovie = async (id: string) => {
      try {
        if(id) {
          deleteMovie(id)
          alert('delete sucess')
        }
      } catch (error) {
          console.log(error);
          return new Response('Error')
      }
  }

    return (
        <tr>
            <td className="whitespace-normal px-4 py-2 text-gray-700"></td>
            <td className="whitespace-normal px-4 py-2 text-gray-700">{data.title}</td>
            <td className="whitespace-normal px-4 py-2 text-gray-700">{data.description}</td>
            <td className="whitespace-normal px-4 py-2 text-gray-700">{data.duration}</td>
            <td className="whitespace-normal px-4 py-2 text-gray-700">{data.videoUrl}</td>
            <td className="">
                <img src={data.thumbnailUrl} alt="" className="w-28 h-28" />
            </td>
            <td className="whitespace-normal px-4 py-2 text-gray-700">{data.genre}</td>
            <td className="whitespace-normal px-4 py-2 flex gap-4 justify-center">
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">
          <IoMdAddCircle size={20} onClick={() => router.push('/admin/addMovies')}/>
          </button>
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">
            <AiFillEdit size={20} onClick={() => router.push(`/admin/updateMovie/${data.id}`)}/>
          </button>
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">
            <AiFillDelete size={20} onClick={() => delMovie(data.id)}/>
          </button>
        </td>
        </tr>
    )
}

export default DataTable