import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const secret_otp: any = process.env.SECRET_KEY_OTP
    var url = speakeasy.otpauthURL({ secret: secret_otp, label:'netflix@huy.com' });
    // const secretUrl: any | undefined = secret?.otpauth_url;

    // QRCode.toDataURL(url, function (err: any, data_url: string) {
    //     if (err) {
    //         console.error("Error generating QR code:", err);
    //     } else {
    //         console.log(data_url);
            
    //         return NextResponse.json(data_url)
    //     }
    // });
    try {
        const data_url = await new Promise<string>((resolve, reject) => {
            QRCode.toDataURL(url, function (err: any, data_url: string) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_url);
                }
            });
        });
        return NextResponse.json(data_url);
    } catch (error) {
        return NextResponse.json({message:'SERVER ERROR', statusCode: 500 });
    }
}