
import useMovies from "@/hooks/useMovies"
import DataTable from "./DataTable";

const Table = () => {
    const { data } = useMovies()


    return (
        <div className="w-5/5 absolute left-56 top-10 h-16 ...">
            <div className="overflow-x-auto">
                <table className="max-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                                STT
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                                Name
                            </th>

                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900 w-48">
                                Description
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900 ">
                                Duration
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900 w-8">
                                Link Video
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                                Thumbnail
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                                Gener
                            </th>
                            <th className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                                Action
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200">
                        {
                            data?.map((items: any, index: any) => {
                                
                                return <DataTable data={items} key={index} />
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table