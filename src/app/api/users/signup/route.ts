import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import toast from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    if (username === "") {
      return NextResponse.json(
        { error: "Please provide the username" },
        { status: 400 }
      );
    }

    if (email === "") {
      return NextResponse.json(
        { error: "Please provide the email" },
        { status: 400 }
      );
    }

    if (password === "") {
      return NextResponse.json(
        { error: "Please provide the password" },
        { status: 400 }
      );
    }

    console.log(requestBody);

    const user = await User.findOne({ email });
    if (user) {
    //   toast.error("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
