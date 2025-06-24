import { createContext } from "react";
import { Category } from "../models/category.model";

export interface CategoryContextType {
  categories: Category[]
}

export const CategoryContext = createContext<CategoryContextType | null>(null)
