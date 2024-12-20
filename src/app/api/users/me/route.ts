import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConnect/dbConnect";

connect();

export async function GET(request: NextRequest){

    try {

        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json(user, {
            message: "User fetched successfully",
            success: true
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}