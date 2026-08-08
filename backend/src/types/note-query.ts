export interface NoteQuery {
  search?: string;
  tag?: string;
  sort?: "title" | "createdAt" | "updatedAt";
}