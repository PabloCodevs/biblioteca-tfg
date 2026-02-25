import { biblioApi   } from "@/api/biblioApi";
import type { Book } from "../interfaces";

export const getBooksActions = async () => {
    try {
      const { data } = await biblioApi.get<Book[]>("/admin/libros");
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch books");
    }
};