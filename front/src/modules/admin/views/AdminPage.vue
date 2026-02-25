<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getBooks, deleteBook as deleteBookService, createBook, updateBook } from '@/services/adminService';
import type { Book } from '@/modules/admin/interfaces/book.interface';
import BookList from '../components/BookList.vue';

const books = ref<Book[]>([]);
const loading = ref(true);
const bookDialog = ref(false);
const submitted = ref(false);

const book = ref<Partial<Book>>({});

onMounted(async () => {
  try {
    books.value = await getBooks();
    console.log('Libros cargados:', books.value);
  } catch (error) {
    console.error("Error al cargar los libros:", error);
    if (axios.isAxiosError(error)) {
      console.error("Detalles del error:", error.response?.data, error.response?.status);
    }
  } finally {
    loading.value = false;
  }
});

const openNewBookDialog = () => {
  book.value = {};
  submitted.value = false;
  bookDialog.value = true;
};

const hideDialog = () => {
  bookDialog.value = false;
  submitted.value = false;
};

const saveBook = async () => {
  submitted.value = true;
  if (!book.value.titulo || !book.value.autor) {
    return;
  }

  try {
    if (book.value.id) {
      // Actualizar libro existente
      const updatedBook = await updateBook(book.value as Book);
      const index = books.value.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) {
        books.value[index] = updatedBook;
      }
    } else {
      // Crear nuevo libro
      const newBook = await createBook(book.value as Omit<Book, 'id'>);
      books.value.push(newBook);
    }
    hideDialog();
  } catch (error) {
    console.error("Error al guardar el libro:", error);
  }
};

const editBook = (bookToEdit: Book) => {
  book.value = { ...bookToEdit };
  bookDialog.value = true;
};

const deleteBook = async (bookToDelete: Book) => {
  if (confirm(`¿Estás seguro de que quieres eliminar el libro "${bookToDelete.titulo}"?`)) {
    try {
      console.log('Intentando eliminar el libro con ID:', bookToDelete.id);
      await deleteBookService(bookToDelete.id);
      console.log('Libro eliminado con éxito de la API.');
      
      books.value = books.value.filter(b => b.id !== bookToDelete.id);
      console.log('Lista de libros actualizada en el front-end.');

    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error de Axios:", error.response?.data);
      }
      alert("No se pudo eliminar el libro. Revisa la consola para más detalles.");
    }
  }
};
</script>

<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button label="Nuevo Libro" icon="pi pi-plus" class="p-button-success mr-2" @click="openNewBookDialog" />
      </template>
    </Toolbar>

    <BookList 
      :books="books"
      :loading="loading"
      @edit="editBook"
      @delete="deleteBook"
    />

    <Dialog v-model:visible="bookDialog" :style="{width: '450px'}" header="Detalles del Libro" :modal="true" class="p-fluid">
      <div class="field">
        <label for="title">Título</label>
        <InputText id="title" v-model.trim="book.titulo" required="true" autofocus :class="{'p-invalid': submitted && !book.titulo}" />
        <small class="p-error" v-if="submitted && !book.titulo">El título es obligatorio.</small>
      </div>
      <div class="field">
        <label for="author">Autor</label>
        <InputText id="author" v-model.trim="book.autor" required="true" :class="{'p-invalid': submitted && !book.autor}" />
        <small class="p-error" v-if="submitted && !book.autor">El autor es obligatorio.</small>
      </div>
      <div class="field">
        <label for="isbn">ISBN</label>
        <InputText id="isbn" v-model.trim="book.isbn" />
      </div>
      <div class="field">
        <label for="anioPublicacion">Año de Publicación</label>
        <InputNumber id="anioPublicacion" v-model="book.anioPublicacion" />
      </div>
      <div class="field">
        <label for="editorial">Editorial</label>
        <InputText id="editorial" v-model.trim="book.editorial" />
      </div>
      <div class="field">
        <label for="estadoLibro">Estado</label>
        <Dropdown id="estadoLibro" v-model="book.estadoLibro" :options="['DISPONIBLE', 'PRESTADO', 'RESERVADO']" />
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveBook" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field {
  margin-bottom: 1rem;
}
</style>