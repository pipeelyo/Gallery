import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { IGallery } from "../types/Gallery";

export const firestore = getFirestore(app);

// GALLERY COLLECTION
export const galleryCollection = collection(firestore, "gallery")

//FILES
export const uploadFiles = async (data: IGallery) => {
    const fileName = uuidv4();
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, data?.image);
    const imagesave = await getImages(fileName);
    const newData: IGallery = {
        user: data?.user,
        name: data?.name,
        description: data?.description,
        image: imagesave
    };
    await addDocumentGallery(newData);
}

export const getImages = async (fileName: string) => {
    const storageRef = ref(storage, fileName);
    return await getDownloadURL(storageRef)
}

//FIRESTORE
export const addDocumentGallery = async (document: IGallery) => {
    const galleryCollectionRef = collection(db, 'gallery');
    try {
        await addDoc(galleryCollectionRef, document);
        console.log('Imagen agregada exitosamente');
    } catch (error) {
        console.error('Error al agregar la imagen:', error);
    }
}

export const getDocumentGallery = async (docId: string) => {
    const docRef = doc(db, 'gallery', docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log('Document data:', data);
    } else {
        console.log('No such document!');
    }
}

export const deleteDocumentGallery = async (docId:any) => {
    try {
        const docRef = doc(db, 'gallery', docId);
        await deleteDoc(docRef);
        console.log('Documento eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
    }
}

export const updateDocumentGallery = async (itemId: any, document: IGallery) => {
    try {
        const docRef = doc(db, "gallery", itemId);
        const gallery: any = {};
        if (document?.description !== undefined) gallery.description = document.description;
        if (document?.image !== undefined) gallery.image = document.image;
        if (document?.name !== undefined) gallery.name = document.name;
        if (document?.user !== undefined) gallery.user = document.user;
        await updateDoc(docRef, gallery);
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
}

export const getByUser = async (user: any) => {
    const q = query(collection(db, "gallery"), where("user", "==", user));
    const querySnapshot = await getDocs(q);
    const datos = querySnapshot.docs.map(doc => {
        const dataResult: IGallery = {
            id: doc?.id,
            ...doc.data()
        } 
        return dataResult
    });
    return datos;
}

export const getGalleryItemById = async (itemId: string) => {
    try {
      const docRef = doc(db, "gallery", itemId);
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as IGallery : null; 
      return currentData;
    } catch (error) {
      console.error("Error updating gallery item:", error);
    }
  };