<script lang="ts" setup>
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'

interface MenuItem {
  label: string
  icon?: string
  to?: string
  url?: string
  items?: MenuItem[]
  class?: string
  target?: string
  disabled?: boolean
  visible?: boolean
  command?: (event: { originalEvent: Event; item: MenuItem }) => void
}

const model = ref<MenuItem[]>([
  {
    label: 'Pages',
    items: [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-user',
        to: '/admin',
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        to: '/user',
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        to: '/auth/login',
      },
      {
        label: '404',
        icon: 'pi pi-fw pi-question-circle',
        to: '/pages/not-found',
      },
      {
        label: 'Error',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/pages/error',
      },
    ],
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
      <!-- <li v-if="item.separator" class="menu-separator"></li> -->
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
