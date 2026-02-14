import type {
  Todo,
  TodosResponse,
  SingleTodoResponse,
  CreateTodoPayload,
  UpdateTodoPayload,
} from "@/types/todo";

const BASE_URL = "https://api.oluwasetemi.dev";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message || `API Error: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

export async function fetchTodos(
  page: number = 1,
  limit: number = 10
): Promise<TodosResponse> {
  const res = await fetch(`${BASE_URL}/tasks?page=${page}&limit=${limit}`);
  return handleResponse<TodosResponse>(res);
}

export async function fetchTodoById(id: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  const data = await handleResponse<SingleTodoResponse>(res);
  return data.data;
}

export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<SingleTodoResponse>(res);
  return data.data;
}

export async function updateTodo(
  id: string,
  payload: UpdateTodoPayload
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<SingleTodoResponse>(res);
  return data.data;
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete todo: ${res.statusText}`);
  }
}
