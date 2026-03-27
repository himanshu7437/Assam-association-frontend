import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Album } from "@/types";

export async function getAlbums(): Promise<Album[]> {
  try {
    const albumsRef = collection(db, "albums");
    // Ideally sort by createdAt desc, fallback to date locally if needed
    // Assuming createdAt exists based on the request
    const q = query(albumsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const albums = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Album[];

    // Fallback sorting by date if createdAt is missing or identical
    return albums.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt.seconds ? a.createdAt.seconds * 1000 : a.createdAt).getTime() : new Date(a.date).getTime();
      const dateB = b.createdAt ? new Date(b.createdAt.seconds ? b.createdAt.seconds * 1000 : b.createdAt).getTime() : new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

export async function getAlbumById(id: string): Promise<Album | null> {
  try {
    const docRef = doc(db, "albums", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Album;
    }
    return null;
  } catch (error) {
    console.error("Error fetching album by id:", error);
    return null;
  }
}
