import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const biblioApi = axios.create({
    baseURL: 'http://localhost:8080'
});

biblioApi.interceptors.request.use((config) => {
    const authStore = useAuthStore();

    // Autenticación
    if (authStore.token !== null && authStore.token !== -1) {
        if (authStore.isAdmin) {
          config.headers.Authorization = `Basic ${btoa('admin:adminpass')}`;
        } else {
          config.headers.Authorization = `Basic ${btoa('user:userpass')}`;
        }
    }

    // Si el método es DELETE, obligamos a que lleve un body vacío y el header JSON (Me daba error al eliminar porque no le pasaba al menos un body vacio)
    if (config.method?.toLowerCase() === 'delete') {
        config.headers['Content-Type'] = 'application/json';
        config.data = {}; // Enviamos un objeto vacío en lugar de null
    }

    return config;
});
export { biblioApi };