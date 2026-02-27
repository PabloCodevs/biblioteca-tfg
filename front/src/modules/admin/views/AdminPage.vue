<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getBooks, deleteBook as deleteBookService, createBook, updateBook } from '@/services/adminService';
import type { Book } from '@/modules/admin/interfaces/book.interface';
import BookList from '../components/BookList.vue';

/* PrimeVue (paar mostrar contenido) */
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();

const books = ref<Book[]>([]);
const loading = ref(true);
const bookDialog = ref(false);
const submitted = ref(false);

/* Modal de error */
const errorDialog = ref(false);
const errorMessage = ref('');

const book = ref<Partial<Book>>({});

// Con onMounted cargo los libros
onMounted(async () => {
  try {
    books.value = await getBooks();
  } catch (error) {
    console.error("Error al cargar los libros:", error);

    if (axios.isAxiosError(error)) {
      errorMessage.value =
        error.response?.data?.message ||
        "Error al cargar los libros.";
    } else {
      errorMessage.value = "Error inesperado al cargar los libros.";
    }

    errorDialog.value = true;
  } finally {
    loading.value = false;
  }
});

// Control de los Dialog
const openNewBookDialog = () => {
  book.value = {};
  submitted.value = false;
  bookDialog.value = true;
};

const hideDialog = () => {
  bookDialog.value = false;
  submitted.value = false;
};

// Guardar libro
const saveBook = async () => {
  submitted.value = true;

  if (!book.value.titulo || !book.value.autor) return;

  try {
    if (book.value.id) {
      const updatedBook = await updateBook(book.value as Book);

      const index = books.value.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) books.value[index] = updatedBook;

      toast.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Libro actualizado correctamente',
        life: 3000
      });

    } else {
      const newBook = await createBook(book.value as Omit<Book, 'id'>);
      books.value.push(newBook);

      toast.add({
        severity: 'success',
        summary: 'Creado',
        detail: 'Libro creado correctamente',
        life: 3000
      });
    }

    hideDialog();

  } catch (error) {
    console.error("Error al guardar:", error);

    if (axios.isAxiosError(error)) {
      errorMessage.value =
        error.response?.data?.message ||
        "No se pudo guardar el libro.";
    } else {
      errorMessage.value = "Error inesperado al guardar el libro.";
    }

    errorDialog.value = true;
  }
};

// Editar libro
const editBook = (bookToEdit: Book) => {
  book.value = { ...bookToEdit };
  bookDialog.value = true;
};

// Eliminar libro (Con modal/dialog de confirmación)
const deleteBook = (bookToDelete: Book) => {
  confirm.require({
    message: `¿Seguro que quieres eliminar "${bookToDelete.titulo}"?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Eliminar',
    rejectLabel: 'Cancelar',

    accept: async () => {
      try {
        await deleteBookService(bookToDelete.id);

        books.value = books.value.filter(
          b => b.id !== bookToDelete.id
        );

        toast.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Libro eliminado correctamente',
          life: 3000
        });

      } catch (error) {
        console.error("Error al eliminar:", error);

        if (axios.isAxiosError(error)) {
          errorMessage.value =
            error.response?.data?.message ||
            "No se pudo eliminar el libro.";
        } else {
          errorMessage.value =
            "Error inesperado al eliminar el libro.";
        }

        errorDialog.value = true;
      }
    }
  });
};
</script>

<template>
  <div class="card">
    <!-- PrimeVue global UI -->
    <ConfirmDialog />
    <Toast />

    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Nuevo Libro"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNewBookDialog"
        />
      </template>
    </Toolbar>

    <BookList
      :books="books"
      :loading="loading"
      @edit="editBook"
      @delete="deleteBook"
    />

    <!-- Dialog crear / editar -->
    <Dialog
      v-model:visible="bookDialog"
      header="Detalles del Libro"
      :modal="true"
      :style="{ width: '450px' }"
      class="p-fluid"
    >
      <div class="field">
        <label>Título</label>
        <InputText
          v-model.trim="book.titulo"
          autofocus
          :class="{ 'p-invalid': submitted && !book.titulo }"
        />
        <small class="p-error" v-if="submitted && !book.titulo">
          El título es obligatorio.
        </small>
      </div>

      <div class="field">
        <label>Autor</label>
        <InputText
          v-model.trim="book.autor"
          :class="{ 'p-invalid': submitted && !book.autor }"
        />
        <small class="p-error" v-if="submitted && !book.autor">
          El autor es obligatorio.
        </small>
      </div>

      <div class="field">
        <label>ISBN</label>
        <InputText v-model.trim="book.isbn" />
      </div>

      <div class="field">
        <label>Año de Publicación</label>
        <InputNumber v-model="book.anioPublicacion" />
      </div>

      <div class="field">
        <label>Editorial</label>
        <InputText v-model.trim="book.editorial" />
      </div>

      <div class="field">
        <label>Estado</label>
        <Dropdown
          v-model="book.estadoLibro"
          :options="['DISPONIBLE', 'PRESTADO', 'RESERVADO']"
        />
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveBook"/>
      </template>
    </Dialog>

    <!-- Modal Error -->
    <Dialog
      v-model:visible="errorDialog"
      header="Error"
      :modal="true"
      :style="{ width: '400px' }"
    >
      <p>{{ errorMessage }}</p>

      <template #footer>
        <Button
          label="Aceptar"
          icon="pi pi-check"
          @click="errorDialog = false"
        />
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