import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Facility } from "@/types";

export async function getFacilities(): Promise<Facility[]> {
  try {
    const facilitiesRef = collection(db, "facilities");
    const snapshot = await getDocs(facilitiesRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Facility[];
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  try {
    const docRef = doc(db, "facilities", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Facility;
    }
    return null;
  } catch (error) {
    console.error("Error fetching facility by ID:", error);
    return null;
  }
}
