import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

// collection to define table and id to get specific document
const getDocument = (collection, id) => {

    const document = ref(null);
    const error = ref(null);

    // register the firestore collection reference
    let documentRef = projectFirestore.collection(collection).doc(id);

    const unsub = documentRef.onSnapshot(doc => {
        if (doc.data) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = "Document does not exist!!"
        }
    }, err => {
        document.value = null;
        error.value = 'could not fetch the data'
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { error, document }
}

export default getDocument