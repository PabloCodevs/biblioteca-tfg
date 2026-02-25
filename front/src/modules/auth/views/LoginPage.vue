<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import FloatingConfigurator from '@/modules/common/components/FloatingConfigurator.vue';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = () => {
  authStore.login(username.value, password.value);
};
</script>

<template>
  <FloatingConfigurator />
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="text-center mb-8">
            <div style="display: inline-flex">
              <img src="/demo/images/logo_ia.png" alt="plex" class="h-48" />
            </div>
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              Bienvenido a la Biblioteca
            </div>
            <span class="text-muted-color font-medium">Inicia sesión para continuar</span>
          </div>
          <form @submit.prevent="handleLogin">
            <div>
              <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-3">User Name</label>
              <IconField>
                <InputIcon class="pi pi-user" />
                <InputText v-model="username" class="mb-3" id="userName" placeholder="Username" required="true" autofocus fluid />
              </IconField>

              <label for="userPassword" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-3">Password</label>
              <Password v-model="password" class="mb-3" id="userPassword" placeholder="Password" autofocus toggleMask fluid />

              <Button type="submit" class="button" label="Iniciar Sesión" icon="pi pi-sign-in" />
            </div>
          </form>

          <div>
            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">
                ¿Has olvidado la contraseña?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
.button {
  display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    color: var(--p-button-primary-color);
    background: var(--p-button-primary-background);
    border: 1px solid var(--p-button-primary-border-color);
    padding: var(--p-button-padding-y) var(--p-button-padding-x);
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background var(--p-button-transition-duration), color var(--p-button-transition-duration), border-color var(--p-button-transition-duration), outline-color var(--p-button-transition-duration), box-shadow var(--p-button-transition-duration);
    border-radius: var(--p-button-border-radius);
    outline-color: transparent;
    gap: var(--p-button-gap);
    width: 100%;
}

.h-48{
  width: 300px;
  height: 300px;
}

</style>