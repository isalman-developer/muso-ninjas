import { ref } from 'vue';
import { projectFirestore } from '@/firebase/config';

const useDocument = (playlist, id) => {

    let error = ref(null);
    let isPending = ref(false);
    const refDoc = projectFirestore.collection(playlist).doc(id);

    const deleteDoc = async () => {
        isPending.value = true;
        error.value = null;
        try {
            const res = await refDoc.delete();
            isPending.value = false;
            return res;
        } catch (err) {
            console.log("Error in UseDocument.js : ",err.message);
            isPending.value = false;
            error.value = err.message;
        }
    }

    return { error, isPending, deleteDoc }

}

export default useDocument