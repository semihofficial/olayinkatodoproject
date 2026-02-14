import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/api/todos";
import type { CreateTodoPayload, UpdateTodoPayload } from "@/types/todo";

export function useTodos(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["todos", page, limit],
    queryFn: () => fetchTodos(page, limit),
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoById(id),
    enabled: !!id,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoPayload }) =>
      updateTodo(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
