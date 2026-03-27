import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DocumentItem } from "@/types";

export async function getDocuments(): Promise<DocumentItem[]> {
  try {
    const docsRef = collection(db, "documents");
    const q = query(docsRef, orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentItem[];
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}
