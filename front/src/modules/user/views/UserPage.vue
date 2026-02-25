<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getAvailableBooks, getBorrows, borrowBook, returnBook } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';
import type { Book } from '@/modules/admin/interfaces/book.interface';

const authStore = useAuthStore();
const userId = computed(() => 3);

const availableBooks = ref<Book[]>([]);
const myBorrows = ref<any[]>([]);
const loadingAvailable = ref(true);
const loadingBorrows = ref(true);

async function loadData() {
  loadingAvailable.value = true;
  loadingBorrows.value = true;
  try {
    availableBooks.value = await getAvailableBooks();

    try {
      myBorrows.value = await getBorrows(userId.value);
    } catch (error) {
      console.warn(`Usuario ${userId.value} no tiene préstamos o no existe:`, error);
      myBorrows.value = [];
    }
  } catch (error) {
    console.error("Error al cargar los datos del usuario:", error);
  } finally {
    loadingAvailable.value = false;
    loadingBorrows.value = false;
  }
}

onMounted(loadData);

const handleBorrow = async (bookId: number) => {
  try {
    await borrowBook(userId.value, bookId);
    await loadData();
  } catch (error) {
    console.error("Error al pedir el libro:", error);
  }
};

const handleReturn = async (borrowId: number) => {
  try {
    await returnBook(userId.value, borrowId);
    await loadData();
  } catch (error) {
    console.error("Error al devolver el libro:", error);
  }
};
</script>

<template>
  <div>
    <div class="card">
      <h2>Libros Disponibles</h2>
      <DataTable 
        :value="availableBooks" 
        :loading="loadingAvailable" 
        responsiveLayout="scroll"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 15, 20]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} libros"
      >
        <template #empty>No hay libros disponibles en este momento.</template>
        <template #loading>Cargando libros disponibles...</template>
        <Column field="id" header="ID" style="width: 6rem"></Column>
        <Column field="titulo" header="Título" style="width: 15rem"></Column>
        <Column field="autor" header="Autor" style="width: 12rem"></Column>
        <Column field="isbn" header="ISBN" style="width: 10rem"></Column>
        <Column field="anioPublicacion" header="Año" style="width: 6rem"></Column>
        <Column field="editorial" header="Editorial" style="width: 12rem"></Column>
        <Column headerStyle="width: 10rem">
          <template #body="slotProps">
            <Button label="Pedir Prestado" @click="handleBorrow(slotProps.data.id)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="card mt-4">
      <h2>Mis Préstamos</h2>
      <DataTable 
        :value="myBorrows" 
        :loading="loadingBorrows" 
        responsiveLayout="scroll"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 15, 20]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} préstamos"
      >
        <template #empty>No tienes ningún libro en préstamo.</template>
        <template #loading>Cargando tus préstamos...</template>
        <Column field="id" header="ID" style="width: 6rem"></Column>
        <Column field="titulo" header="Título" style="width: 15rem"></Column>
        <Column field="autor" header="Autor" style="width: 12rem"></Column>
        <Column field="isbn" header="ISBN" style="width: 10rem"></Column>
        <Column field="anioPublicacion" header="Año" style="width: 6rem"></Column>
        <Column field="editorial" header="Editorial" style="width: 12rem"></Column>
        <Column headerStyle="width: 10rem">
          <template #body="slotProps">
            <Button label="Devolver" icon="pi pi-undo" class="p-button-warning" @click="handleReturn(slotProps.data.id)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>