import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PublicationItem } from "@/types";

export async function getPublications(): Promise<PublicationItem[]> {
  try {
    const ref = collection(db, "publications");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PublicationItem[];
  } catch (error) {
    console.error("Error fetching publications:", error);
    return [];
  }
}
