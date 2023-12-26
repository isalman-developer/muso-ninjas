<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h4>Create a New Playlist</h4>
            <input type="text" required placeholder="Playlist title" v-model="title">
            <textarea required placeholder="Playlist description..." v-model="description"></textarea>
            <!-- upload playlist image -->
            <label>Upload Playlist Cover Image</label>
            <input type="file" @change="handleChange">
            <div class="error"> {{ fileError }}</div>

            <button v-if="!isPending">Create</button>
            <button v-else disabled>Saving....</button>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { timestamp } from '@/firebase/config';
import { useRouter } from 'vue-router';

export default {
    setup() {

        const { filePath, url, uploadImage } = useStorage();
        const { error, addDoc } = useCollection('playlists');
        const { user } = getUser();
        const router = useRouter();

        const title = ref('');
        const description = ref('');
        const file = ref(null);
        const fileError = ref(null);
        const isPending = ref(false);

        const handleSubmit = async () => {
            if (file.value) {
                // before both await we set local isPending to true 
                isPending.value = true;
                await uploadImage(file.value);

                // in useCollection we have return response after adding document and here we are catching that to get the id from the latest record that is inserted.
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    // to show or download the image
                    coverUrl: url.value,
                    // can be used to delete the image in future, it actually tells us where the image resides.
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                // after both await we set local isPending to false 
                isPending.value = false;
                if (!error.value) {
                    router.push({ name: 'PlaylistDetails', params: { id: res.id } });
                }
            }
        }

        //allowed file types to let them uploaded
        const types = ['image/png', 'image/jpg', 'image/jpeg'];

        // e is event that has been occured on change and from this event we get the information about the file the user has selected.
        const handleChange = (e) => {
            const selected = e.target.files[0];
            if (selected && types.includes(selected.type)) {
                file.value = selected;
                fileError.value = null;
            } else {
                file.value = null;
                fileError.value = "Please select an image file (png, jpeg, jpg)";
            }
        }
        return { title, description, fileError, isPending, handleSubmit, handleChange }
    }
}
</script>
  
<style>
form {
    background: white;
}

input[type="file"] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}
</style>