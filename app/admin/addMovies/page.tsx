'use client'
import SideBar from "@/components/admin/Sidebar";
import Input from "@/components/input"
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMovies() {
    const { register, watch, handleSubmit, formState: { isValid, errors } } = useForm({
        mode: 'all',

    })

    const passDigital = new RegExp(/^\S/)
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const formData = watch();
    const formSubmit = useCallback(async (data: any) => {
        try {
            await axios.post('/api/addMovie', { data })
            alert('Create Success')
            router.push('/admin')
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <div className="relative w-full">
            <SideBar />
            <div className="flex justify-center absolute top-5 w-full" style={{ left: 70 }}  >
                <div className="bg-black bg-opacity-70 px-16 py-6 self-center mt-2 rounded-md w-3/5 ">
                    <h2 className="text-rose-700 text-4xl mb-8 font-semibold">
                        Add Movies
                    </h2>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                {...register('title', {
                                    required: true, pattern: passDigital, minLength: 5,
                                })}
                                id="Title"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="title"
                            />

                            {errors.title?.type === 'required' && <p className="error text-rose-700">Title is required.</p>}
                            {errors.title?.type === 'pattern' && <p className="error text-rose-700">Title no space.</p>}
                            {errors.title?.type === 'minLength' && <p className="error text-rose-700">Minlength is 5 characters.</p>}
                            <input
                                type="text"
                                {...register('description', { required: true, pattern: passDigital, minLength: 5, })}
                                id="description"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="description"
                            />

                            {errors.description?.type === 'required' && <p className="error text-rose-700">Description is required.</p>}
                            {errors.description?.type === 'pattern' && <p className="error text-rose-700">Description no space.</p>}
                            {errors.description?.type === 'minLength' && <p className="error text-rose-700">Minlength is 5 characters.</p>}
                            <input
                                type="text"
                                {...register('videoUrl', { required: true, pattern: passDigital, minLength: 5, })}
                                id="videoUrl"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="videoUrl"
                            />

                            {errors.videoUrl?.type === 'required' && <p className="error text-rose-700">VideoUrl is required.</p>}
                            {errors.videoUrl?.type === 'pattern' && <p className="error text-rose-700">VideoUrl no space.</p>}
                            {errors.videoUrl?.type === 'minLength' && <p className="error text-rose-700">Minlength is 5 characters.</p>}
                            <input
                                type="text"
                                {...register('thumbnailUrl', { required: true, pattern: passDigital, minLength: 5, })}
                                id="thumbnailUrl"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="thumbnailUrl"
                            />

                            {errors.thumbnailUrl?.type === 'required' && <p className="error text-rose-700">ThumbnailUrl is required.</p>}
                            {errors.thumbnailUrl?.type === 'pattern' && <p className="error text-rose-700">ThumbnailUrl no space.</p>}
                            {errors.thumbnailUrl?.type === 'minLength' && <p className="error text-rose-700">Minlength is 5 characters.</p>}
                            <input
                                type="text"
                                {...register('genre', { required: true, pattern: passDigital, minLength: 5, })}
                                id="genre"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="genre"
                            />

                            {errors.genre?.type === 'required' && <p className="error text-rose-700">Genre is required.</p>}
                            
                            {errors.genre?.type === 'minLength' && <p className="error text-rose-700">Minlength is 5 characters.</p>}
                            <input
                                type="text"
                                {...register('duration', { required: true, pattern: passDigital })}
                                id="duration"
                                className="
                                block
                                rounded-md
                                px-6
                                pt-6
                                pb-1
                                w-full
                                text-md
                                text-white
                                bg-neutral-700
                                appearance-none
                                focus:outline-none
                                focus:ring-0
                                peer"
                                placeholder="duration"
                            />

                            {errors.duration?.type === 'required' && <p className="error text-rose-700">Duration is required.</p>}
                            {errors.duration?.type === 'pattern' && <p className="error text-rose-700">Duration no space.</p>}
                            <button className="bg-red-600 py-3 text-white rounded-md w-1/5 mt-10 hover:bg-red-700 transition" type="submit">
                                Add
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>


    )
}