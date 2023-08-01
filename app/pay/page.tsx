'use client'
import useQrCode from '@/hooks/useQrCode'
import '../globals.css'
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

export default function Pay() {
    const { data: Qr } = useQrCode()
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { data: user } = useCurrentUser()
    const router = useRouter()
    const data = {
        name: user?.name,
        image:user?.image ,
        email: user?.email,
        emailVerified: user?.emailVerified,
        hashedPassword: user?.hashedPassword,
        createdAt:user?.createdAt ,
        updatedAt: user?.updatedAt,
        role: user?.role,
        favoriteIds: user?.favoriteIds,
        customer: "TRUE"
    }
    const customInputStyle = {
    };
    const userId = user?.id
    const handelClick = async () => {
        const verify = await axios.post('/api/verifyQr', otp)
        if (verify.data.status === 400) {
            setError(verify.data.message)
        }
        console.log(verify);
        
        if (verify.data.status === 200) {
            setSuccess(verify.data.message)
            const updateUser = await axios.put(`/api/current/${userId}`, { data })
            if(updateUser.status === 200) {
                router.push('/home')
            }

        }

        return verify
    }

    const containerStyle = {
        border: "1px solid red"
    }
    return (
        <div className="relative container">
            <div className="flex items-center absolute box1">
                <img src="	https://payment.momo.vn/v2/gateway/images/logo.png" alt="" className="w-12 m-4" />
                <span className="text-xl  ">Cổng thanh toán momo</span>
            </div>
            <div className='box2-container'>
                <div className='box2'>
                    <div className="pay" >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAt1BMVEX////kAADsJxb///38///u3tr00M7tz83qGgDsAAD9/PnuJBPnAAD/8/fmVUzwxcPhLhr89/feQTT73tvnTEHvIQzlT0r//P/31dH68fDplpH46+roOS/pSD7ttrPv29vv5Nvs2dDbIBzpNDTkW1Dje3zmm5rbAADrxr3lbmnjIRTtaWTlaWLsi4bvqaboKyDjf3bYaWLjo5joeHTvvbHdNSHgi4LxtqvjmIveVFTYU0PaSzrnXmC6EcrBAAAE0klEQVR4nO2XC3PiOAzHFVuwduwlTWh4BUrbo9CmPHqldG/3+v0/18lxEthOS3KvmZs5/WGGOE6UX2RZEgAsFovFYrFYLBaLxWKxWCwWi8VisVis/6Nk3JnPM5Qoww4pRoDreacWQNY50RDgph7Mxyjp2vlYVsbGxS0Ss871/IZ+hxgXRkGeQ4AvgQ1uxwgY/2Kt7dKZhbXaei0Q72ytgKa/BroeLiFMaBRhZWsUWLsKEbuBDuy9O/NAZ/JYDs8jKCFsJCXEl6lRDuFR5cIUUmuAjTLGDYWh60Y4DkQ5KfQW4kEqVFS/5Bcr0sMQQ0jo9ANK6OyMscsGJxACGXsCKWuENUGZNE0JoYew0XTsnkon7Ii8YMpJo58h7jmE+iVHgTEX5AXYKmFUJmFihbnok4sbEdLpGMgLRhQICyXy/JA4/SpxckimB0IQSTK7vSEE4ivmkt22RKhtjaxDkAgZuYwI8YJM7s+7oEQQ9oVioUIgs/rKTyJWDjYX9EvGCcEEpWclfowAIeyVSAfySgtj++0Q1OPPCPaKniIlovtK6AYmvXDelCUC0iTxyE8QALrKGXsjkEUjgUcwQQbxrEYw5IXiKWUcdb0X5AlCwfMeoe8RaIcXcdoTQgRXLRGEonWdVgiqWAgKsiqKutohFCMXC5boAB3eewTi816ApRUipe+hIRSPCCaRR4QqFuqbf0YgLwBlHTiLkAXOrLDPzU4oEWjLh0cEk65fXzeb1/HHXlCLxaLXmziEy88Q5INybzbNGnJChUAftTlFEKnSWk+zjxEE5QVFueQcAkRapLm6A5SNEIRgDjuTTuenCE7p7GMEP6saEJBSrFD9ImybEdLF2u3D444gp5CCT7xgDNUJbddnERASWofd+P3jPkX4Rl5bHPMCFYfNZvPbc3yCcPCHDmH1EkXdqHsOQUp3TMXHpbM2CL3OLhX5TpzmhVM5hMQ7tECoJ84sxJ12q7VG2W4hBvGT8gtcIti/jZD5mFEjbN4SHiGy/o5/DGGi/Tu9Njuh2BGDOFydeqEuU9KvZAsEV1IqBEqd48SVc+GGYUsvwBP1KUcv1Jnd7+oGBB9wOKwRJFCNzPOlK5QRNKpE6KrTWFCTaDuZ7BdP0OwFs9tNZ731foRYIlB9nSmqvpJqVbputyMGMboKIeoyJZTVlBn0Y4lADVmFYH2lPCII11Clyn6rEXyt1hEsde5qcEsE6hFPYoFwinVZ+2sia9IEC4YwoJxVh1g8S6tOkmot5YKda9yoa6VGYRpLty30ErCpgy4RRkXrUiBQnlKuChQdtLv7fjWdrr2Z8Pvj+scR4fdVsAooVVJF2SL0qc/cxYjXVKlpLB2KolVuWIsKIe4po3SBkM8Gbw/7zWS7vYciHGUYukRZHIJrparSg3GY9fv9+f3L1XZEm/LycnoIXeOv08Dl5ki5gGxKDYRAoHTVc375tqdGD+nPybjqicsmkZ7r7biOyLdPHkGevKGUw3Cczeno5XX/48nNxjNt9B4a3HAfBPmenAdhq5LSWmSRGs+r77fBKsPzf2XCImLdew2H2LyBWj4fhq719G9//bXJLoaFc1E29xZ/BqIIGR9KeD4YHJ+EFuXsr0iWAfxv2GaxWCwWi8VisVgsFovFYrFYLBaLxfpv6w/Vcl85/NAI3AAAAABJRU5ErkJggg=="
                            className='netflix'
                        />
                        <img src="https://payment.momo.vn/v2/gateway/images/icons/icon-link.svg" alt="" />
                        <img src="	https://payment.momo.vn/v2/gateway/images/logo.png" alt="" className='momo' />
                    </div>
                    <div className='text'>
                        <p className='font-semibold text-xl'>Quét mã QR để liên kết với Netflix</p>
                        <p>Sử dụng <span className='font-semibold'> App momo</span> hoặc ứng dụng camera hỗ trợ QR code để quét mã</p>
                    </div>
                    <div className='flex justify-center'>
                        <img src={Qr} alt="" />
                    </div>
                    <div className='flex justify-center'>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} style={{ ...customInputStyle, ...(error !== '' ? { border: '2px solid red' } : {}), }} />}
                            // containerStyle={`${error === '' ? "otp-container" : containerStyle }`}
                            containerStyle="otp-container"
                            inputStyle="otp-input"
                        />
                    </div>
                    <div className='flex justify-center '>
                        {error !== '' ? <p className='text-red-600'>{error}</p> : <p className='text-green-600'>{success}</p>}


                    </div>
                    <div className='flex justify-center mt-4 '>
                        <button
                            className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl
                            ${otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            onClick={handelClick}
                            disabled={otp.length !== 6}
                        >
                            Xác thực
                        </button>
                    </div>

                </div>
            </div>


        </div>
    )
}