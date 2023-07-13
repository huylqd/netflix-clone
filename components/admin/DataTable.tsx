
interface DataProps {
    key: any
    data: Record<string, any>
}
const DataTable: React.FC<DataProps> = ({data, key}) => {
    console.log(data, key);
    
    return (
        <tr>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.title}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.description}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.duration}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.videoUrl}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <img src={data.thumbnailUrl} alt="" />
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.genre}</td>
            <td className="whitespace-nowrap px-4 py-2">
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
            View
          </button>
        </td>
        </tr>
    )
}

export default DataTable