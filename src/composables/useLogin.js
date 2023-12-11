import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("User is not logged in!!!");
    }
    error.value = null;
    isPending.value = false;
    return res;
  }
  catch (err) {
    console.log(err);
    error.value = err.message;
    isPending.value = false;
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin