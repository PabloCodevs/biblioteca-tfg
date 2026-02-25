import { biblioApi   } from "@/api/biblioApi";
import type { Book } from "../interfaces";

export const deleteBookActions = async (id: number) => {
    try {
        const { data } = await biblioApi.delete<Book>(`/admin/libros/${id}`);
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch books");
    }
};