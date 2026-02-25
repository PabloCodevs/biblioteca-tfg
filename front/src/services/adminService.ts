import { biblioApi } from '@/api/biblioApi';
import type { Book } from '@/modules/admin/interfaces/book.interface';

export const getBooks = async (): Promise<Book[]> => {
    const { data } = await biblioApi.get<Book[]>('/admin/libros');
    return data;
};

export const updateBook = async (book: Book): Promise<Book> => {
    const { data } = await biblioApi.put<Book>(`/admin/libros/${book.id}`, book);
    return data;
};

export const deleteBook = async (id: number): Promise<void> => {
    await biblioApi.delete(`/admin/libros/${id}`, {
        data: {}
    });
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
    const { data } = await biblioApi.post<Book>('/admin/libros', book);
    return data;
};

export const getUsers = async (): Promise<any[]> => {
    const { data } = await biblioApi.get<any[]>('/admin/usuarios');
    return data;
};

export const createUser = async (user: any): Promise<any> => {
    const { data } = await biblioApi.post<any>('/admin/usuarios', user);
    return data;
};