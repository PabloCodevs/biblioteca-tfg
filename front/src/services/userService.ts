import { biblioApi } from '@/api/biblioApi';
import type { Book } from '@/modules/admin/interfaces/book.interface';

export const getAvailableBooks = async (): Promise<Book[]> => {
    const { data } = await biblioApi.get<Book[]>('/usuarios/libros/disponibles');
    return data;
};

export const getBorrows = async (userId: number): Promise<any[]> => {
    const { data } = await biblioApi.get<any[]>(`/usuarios/${userId}/prestamos`);
    return data;
};

export const borrowBook = async (userId: number, bookId: number): Promise<any> => {
    const { data } = await biblioApi.post<any>(`/usuarios/${userId}/prestamos/${bookId}`);
    return data;
};

export const returnBook = async (userId: number, borrowId: number): Promise<any> => {
    const { data } = await biblioApi.post<any>(`/usuarios/${userId}/devoluciones/${borrowId}`);
    return data;
};