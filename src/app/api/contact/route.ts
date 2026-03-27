import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Save contact message to Firestore
    await addDoc(collection(db, "contacts"), {
      ...body,
      createdAt: serverTimestamp(),
      status: "new"
    });

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully! We will get back to you soon." 
    }, { status: 200 });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send message. Please try again later." 
    }, { status: 500 });
  }
}
