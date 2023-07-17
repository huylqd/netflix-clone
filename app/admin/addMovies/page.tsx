'use client'
import SideBar from "@/components/admin/Sidebar";
import Input from "@/components/input"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
export default function AddMovies() {
    const { register, watch, handleSubmit, formState: {isValid, errors } } = useForm({
        mode: 'onBlur' && 'onChange',
        
    })

    const passDigital = new RegExp(/^([^0-9, S]*)$/)
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const formData = watch();
    const formSubmit = (data: any) => {

        console.log(data);
        setShow(true)
    }

    
    return (
        <div className="relative w-full">
            <SideBar />
            <div className="flex justify-center absolute top-5 w-full" style={{ left: 70 }}  >
                <div className="bg-black bg-opacity-70 px-16 py-6 self-center mt-2 rounded-md w-3/5 ">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        Add Movies
                    </h2>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                {...register('title', { required: true, pattern: { value: passDigital, message: 'Invalid input.' }, minLength: { value: 5, message: 'Minimum length is 5 characters.' } })}
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
                            {errors.title?.type === 'required' && <p className="error text-white">Title is required.</p>}
                            {errors.title?.type === 'pattern' && <p className="error text-white">Title no space.</p>}
                            {errors.title?.type === 'minLength' && <p className="error text-white">Minlength is 8 characters.</p>}
                            <input
                                type="text"
                                {...register('description', { required: true })}
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
                            {errors.description && <p className="error text-white">description is required.</p>}
                            <input
                                type="text"
                                {...register('videoUrl', { required: true })}
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
                            {errors.videoUrl && <p className="error text-white">videoUrl is required.</p>}
                            <input
                                type="text"
                                {...register('thumbnailUrl', { required: true })}
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
                            {errors.thumbnailUrl && <p className="error text-white">thumbnailUrl is required.</p>}
                            <input
                                type="text"
                                {...register('genre', { required: true })}
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
                            {errors.genre && <p className="error text-white">Genre is required.</p>}
                            <input
                                type="text"
                                {...register('duration', { required: true })}
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
                            {errors.duration && <p className="error text-white">duration is required.</p>}




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