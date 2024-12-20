import {connect} from '@/dbConnect/dbConnect'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect();

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const {email, password} = requestBody;

        if(email === ""){
            return NextResponse.json({error: "Please provide the email"}, {status: 400})
        }

        if(password === ""){
            return NextResponse.json({error: "Please provide the password"}, {status: 400})
        }
        console.log(requestBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Enter the correct details"}, {status: 400})
        }

        // token data which we will send in the response
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        })

        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}