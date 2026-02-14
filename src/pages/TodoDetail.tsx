import { useParams, useNavigate } from "react-router-dom";
import { useTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import { ArrowLeft, CheckCircle2, Circle, Clock, Trash2, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const priorityColor = (p: string) => {
  if (p === "HIGH") return "text-destructive bg-destructive/10";
  if (p === "MEDIUM") return "text-warning bg-warning/10";
  return "text-muted-foreground bg-muted";
};

const statusLabel = (s: string) => {
  if (s === "DONE") return { label: "Done", cls: "text-primary bg-primary/10" };
  if (s === "IN_PROGRESS") return { label: "In Progress", cls: "text-warning bg-warning/10" };
  return { label: "Todo", cls: "text-muted-foreground bg-muted" };
};

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todo, isLoading, isError, error } = useTodo(id!);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg space-y-4 animate-fade-in">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !todo) {
    return (
      <div className="mx-auto max-w-lg text-center animate-fade-in" role="alert">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Todo not found</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {(error as Error)?.message || "This todo doesn't exist or was deleted."}
        </p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Todos
        </button>
      </div>
    );
  }

  const handleToggle = () => {
    const nextStatus = todo.status === "DONE" ? "TODO" : "DONE";
    updateTodo.mutate({ id: todo.id, payload: { status: nextStatus } });
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id, { onSuccess: () => navigate("/") });
  };

  const st = statusLabel(todo.status);

  return (
    <article className="mx-auto max-w-lg animate-fade-in">
      <button onClick={() => navigate("/")} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Todos
      </button>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <button onClick={handleToggle} className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded" aria-label={`Mark as ${todo.status === "DONE" ? "todo" : "done"}`} disabled={updateTodo.isPending}>
              {todo.status === "DONE" ? <CheckCircle2 className="h-6 w-6 text-primary" /> : todo.status === "IN_PROGRESS" ? <Clock className="h-6 w-6 text-warning" /> : <Circle className="h-6 w-6" />}
            </button>
            <h1 className={`text-xl font-bold ${todo.status === "DONE" ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {todo.name}
            </h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>{st.label}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColor(todo.priority)}`}>{todo.priority}</span>
          </div>
        </div>

        {todo.description && (
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{todo.description}</p>
        )}

        <div className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">ID: {todo.id}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2 border-t pt-4">
          <button onClick={handleToggle} disabled={updateTodo.isPending} className="flex-1 rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50">
            {updateTodo.isPending ? "Updating..." : todo.status === "DONE" ? "Mark Todo" : "Mark Done"}
          </button>

          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <button onClick={handleDelete} disabled={deleteTodo.isPending} className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50">
                {deleteTodo.isPending ? "Deleting..." : "Confirm"}
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowDeleteConfirm(true)} className="inline-flex items-center gap-1 rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default TodoDetailPage;
