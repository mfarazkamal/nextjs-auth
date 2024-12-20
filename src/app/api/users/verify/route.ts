import {connect} from '@/dbConnect/dbConnect'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel'


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200})
        

    } catch (error:any) {
        // throw new Error(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}