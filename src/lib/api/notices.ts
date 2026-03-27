import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Notice } from "@/types";

export async function getPublicNotices(): Promise<Notice[]> {
  try {
    const noticesRef = collection(db, "notices");
    // Sort by date descending
    const q = query(noticesRef, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    
    const notices: Notice[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notice[];

    // Sort so pinned are first
    return notices.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0; // maintain date roughly
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}
