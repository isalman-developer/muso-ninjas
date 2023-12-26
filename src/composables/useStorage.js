import { projectStorage } from "@/firebase/config";
import { ref } from 'vue';
import getUser from "./getUser";

const useStorage = () => {
    const error = ref(null);
    const filePath = ref(null);
    const url = ref(null);
    const { user } = getUser();

    const uploadImage = async (file) => {
        // shows us where the image resided on firebase, a path to its location
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file);
            // url is to display or download the image we will get the await because 
            // we are tying to get the url which is async task so its a promise we have to wait for its response
            url.value = await res.ref.getDownloadURL();
        } catch (err) {
            console.log("File cannot be uploaded.");
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path);
        try {
            await storageRef.delete();
        } catch (err) {
            error.value = err.message;
            console.log("File cannot be deleted.")
        }
    }

    return { error, filePath, url, uploadImage, deleteImage }

}

export default useStorage;