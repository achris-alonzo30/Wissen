import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", { status: 401 })

    const course = await db.course.create({
      data: {
        title,
        userId
      }
    });

    // return NextResponse.json({ course }, { status: 201 }) Try this one out
    return NextResponse.json(course)

  } catch (error) {
    console.log("[COURSES", error)
    return new NextResponse("Failed to create course", { status: 500 })
  }
}