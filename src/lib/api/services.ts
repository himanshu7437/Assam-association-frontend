import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Service } from "@/types";

export async function getServices(): Promise<Service[]> {
  try {
    const servicesRef = collection(db, "services");
    const snapshot = await getDocs(servicesRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
