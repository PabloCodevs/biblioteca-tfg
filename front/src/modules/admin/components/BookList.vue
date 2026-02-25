<script setup lang="ts">
import type { Book } from '../interfaces';

interface Props {
    books: Book[],
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    loading: false
})

const emit = defineEmits<{
    edit: [book: Book],
    delete: [book: Book]
}>()

const handleEdit = (book: Book) => {
    emit('edit', book)
}

const handleDelete = (book: Book) => {
    emit('delete', book)
}

const getEstadoSeverity = (estado: string) => {
    switch(estado) {
        case 'DISPONIBLE':
            return 'success'
        case 'PRESTADO':
            return 'warn'
        case 'RESERVADO':
            return 'danger'
        default:
            return 'info'
    }
}
</script>

<template>
  <div class="card">
    <DataTable
      :value="books"
      dataKey="id"
      :loading="loading"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[5, 10, 15]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div class="table-header">
          <h5 class="mx-0 my-1">Libros ({{ books.length }})</h5>
        </div>
      </template>
      <template #empty>
        <div class="p-4 text-center">
          <p>No se encontraron libros. Verifica que la API está conectada.</p>
        </div>
      </template>
      <Column selectionMode="multiple" :exportable="false" headerStyle="width: 3rem"></Column>
      <Column field="id" header="ID" sortable style="min-width: 4rem"></Column>
      <Column field="titulo" header="Título" sortable style="min-width: 12rem"></Column>
      <Column field="autor" header="Autor" sortable style="min-width: 10rem"></Column>
      <Column field="isbn" header="ISBN" sortable style="min-width: 8rem"></Column>
      <Column field="anioPublicacion" header="Año" sortable style="min-width: 6rem"></Column>
      <Column field="editorial" header="Editorial" sortable style="min-width: 10rem"></Column>
      <Column field="estadoLibro" header="Estado" sortable style="min-width: 8rem">
        <template #body="slotProps">
          <Tag :value="slotProps.data.estadoLibro" :severity="getEstadoSeverity(slotProps.data.estadoLibro)" />
        </template>
      </Column>

      <Column header="" :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" outlined rounded severity="secondary" class="mr-1" @click="handleEdit(slotProps.data)" />
        <Button
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          @click="handleDelete(slotProps.data)"
        />
      </template>
    </Column>

    </DataTable>

  </div>
</template>


<style>

</style>