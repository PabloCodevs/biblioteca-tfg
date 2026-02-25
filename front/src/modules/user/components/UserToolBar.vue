<script setup lang="ts">



</script>


<template>
   <Toolbar class="mb-6">
      <template #start>
          <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" />
          <Button label="Delete" icon="pi pi-trash" severity="secondary"  />

      </template>

      <template #end>
          <Button label="Export" icon="pi pi-upload" severity="secondary"  />
      </template>
  </Toolbar>
</template>
