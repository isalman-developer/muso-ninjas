<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending">Loading</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '../../composables/useLogin';

export default {
    setup() {
        const { login, error, isPending } = useLogin();
        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            const response = await login(email.value, password.value);
            if (!error.value) {
                console.log("User logged in");
            }
        }
        return { email, password, error,isPending, handleSubmit }
    }
}
</script>