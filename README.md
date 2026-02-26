# Biblioteca TFG – Sistema de Gestión con Roles

Proyecto de **Fin de Grado (2º DAW)**. Consiste en un monorepo que integra un backend en Java/Spring Boot y un frontend desarrollado con Vue 3 + TypeScript, diseñado para la gestión de catálogos y préstamos con control de acceso.

## Stack Tecnológico

| Parte | Tecnología | Versión |
| :--- | :--- | :--- |
| **Backend** | Java + Spring Boot | 21 / 3.x |
| **Frontend** | Vue 3 + TypeScript + Vite | 3.5+ |
| **Estado** | Pinia | 3.x |
| **UI** | PrimeVue + TailwindCSS | 4.x / 3.x |
| **HTTP** | Axios (Interceptor Auth) | 1.x |

##  Estructura del Repositorio

* **`/backend`**: API REST robusta con Spring Security, JPA y documentación en Swagger.
* **`/frontend`**: SPA modularizada por dominios (`admin`, `auth`, `user`). Utiliza Composition API e interceptores para la gestión de seguridad.


##  Flujo de Seguridad
* **Autenticación**: Gestión centralizada en `authStore` (Pinia).
* **Protección**: Router Guards (`beforeEach`) que validan metadatos de ruta (`requiresAuth`, `requiresAdmin`).
* **Interceptores**: Inyección automática de cabeceras `Authorization` en cada petición Axios según el rol del usuario.

## Arquitectura
El proyecto destaca por su **modularidad**, facilitando la escalabilidad al separar las vistas y componentes por módulos de negocio, permitiendo un mantenimiento desacoplado entre el panel de administración y la vista de usuario.
