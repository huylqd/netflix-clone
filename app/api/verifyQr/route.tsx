import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy'

export async function POST(req: Request) {
  try {
    const userToken = await req.json()
    const verify = speakeasy.totp.verify({
        secret: process.env.SECRET_KEY_OTP as any,
        encoding: 'ascii',
        token: userToken,
      }); 
    if(verify) {
      console.log('OTP verified successfully');
      return NextResponse.json({message:"OTP verified successfully", status: 200 });
    }
    else{
      console.log('invalid');
      return NextResponse.json({message:"Invalid otp", status: 400 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Error')
  }

}