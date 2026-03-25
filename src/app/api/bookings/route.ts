import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would save this to a database
    // and send an email notification.
    console.log("New Booking Request:", body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: "Booking request received successfully" 
    }, { status: 201 });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to process booking" 
    }, { status: 500 });
  }
}
