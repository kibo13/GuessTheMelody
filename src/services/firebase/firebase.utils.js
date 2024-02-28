import { firestore, collection, addDoc, getDocs, storage, ref, uploadBytes, getDownloadURL } from './firebase.config';

export async function fetchData(collectioName) {
    let loading = true;
    let data = [];

    try {
        const querySnapshot = await getDocs(collection(firestore, collectioName));
        data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching data: ', error);
    } finally {
        loading = false;
    }

    return { data, loading };
}

export async function uploadFile(path, fileName, file) {
    try {
        const fileRef = ref(storage, `${path}/${fileName}`);
        await uploadBytes(fileRef, file);
        return fileRef;
    } catch (error) {
        console.error('Error uploading file: ' + error);
        throw error;
    }
}

export async function getFileUrl(fileRef) {
    try {
        return await getDownloadURL(fileRef);
    } catch (error) {
        console.error('Error getting reference of file: ' + error);
        throw error;
    }
}

export async function addData(collectioName, data) {
    try {
        return await addDoc(collection(firestore, collectioName), data);
    } catch (error) {
        console.error('Error adding data to Firestore: ' + error);
        throw error;
    }
}
