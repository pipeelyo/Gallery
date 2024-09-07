import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { IGallery } from "../types/Gallery";

export const firestore = getFirestore(app);

// GALLERY COLLECTION
export const galleryCollection = collection(firestore, "gallery")

//FILES
export const uploadFiles = async (file: any) => {
    const fileName = uuidv4();
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    const imagesave = await getImages(fileName);
    console.log(imagesave);
}

export const getImages = async (fileName: string) => {
    const storageRef = ref(storage, fileName);
    return await getDownloadURL(storageRef)
}

//FIRESTORE
export const addDocumentGallery = async (document: IGallery) => {
    const galleryCollectionRef = collection(db, 'gallery');
    const gallery: IGallery = {
        description: document?.description,
        image: document?.image,
        name: document?.name,
        user: document?.user
    }
    try {
        await addDoc(galleryCollectionRef, gallery);
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

export const deleteDocumentGallery = async (docId: string) => {
    try {
        const docRef = doc(db, 'gallery', docId);
        await deleteDoc(docRef);
        console.log('Documento eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
    }
}

export const updateDocumentGallery = async (docId: string, document: IGallery) => {
    try {
        const docRef = doc(db, 'gallery', docId);
        const gallery: any = {
            description: document?.description,
            image: document?.image,
            name: document?.name,
            user: document?.user
        }
        await updateDoc(docRef, gallery);
        console.log('Documento actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
}

export const getByUser = async (user: any) => {
    const q = query(collection(db, "gallery"), where("user", "==", user));
    const querySnapshot = await getDocs(q);
    const datos = querySnapshot.docs.map(doc => doc.data());
    return datos;
}