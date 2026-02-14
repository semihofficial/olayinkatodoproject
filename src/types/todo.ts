export interface Todo {
  id: string;
  name: string;
  description: string | null;
  start: string | null;
  end: string | null;
  duration: number | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  archived: boolean;
  isDefault: boolean;
  parentId: string | null;
  children: string;
  owner: string | null;
  tags: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  data: Todo[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleTodoResponse {
  data: Todo;
}

export interface CreateTodoPayload {
  name: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "DONE";
}

export interface UpdateTodoPayload {
  name?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "DONE";
}
