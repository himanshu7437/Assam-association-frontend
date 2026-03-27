import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Member } from "@/types";

export async function getCommitteeMembers(): Promise<Member[]> {
  try {
    const committeeRef = collection(db, "committee");
    const snapshot = await getDocs(committeeRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];
  } catch (error) {
    console.error("Error fetching committee members:", error);
    return [];
  }
}
