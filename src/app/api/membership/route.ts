import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Save membership application to Firestore
    await addDoc(collection(db, "membership_applications"), {
      ...body,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Membership application submitted successfully! Our team will review it." 
    }, { status: 200 });

  } catch (error) {
    console.error("Membership Form Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to submit application. Please check your connection and try again." 
    }, { status: 500 });
  }
}
