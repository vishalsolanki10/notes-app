export interface NoteQuery {
  search?: string;
  tag?: string;
  sort?: "title" | "createdAt" | "updatedAt";
  page?: number;
  limit?: number;
}