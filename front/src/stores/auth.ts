import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { loginAction } from '@/modules/auth/actions/login.actions';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<number | null>(null);
    const user = ref<string | null>(null);

    const isAuthenticated = computed(() => token.value !== null && token.value !== -1);
    const isAdmin = computed(() => user.value === 'admin');

    async function login(username: string, password: string) {
        const response = await loginAction(username, password);
        token.value = response.token;

        if (response.token !== -1) {
            user.value = response.user || null;
            if (isAdmin.value) {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        } else {
            console.error('Credenciales incorrectas');
            user.value = null;
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
        router.push('/login');
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
    };
});