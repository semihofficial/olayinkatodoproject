import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, Trash2, Clock } from "lucide-react";
import type { Todo } from "@/types/todo";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

const statusIcon = (status: string) => {
  if (status === "DONE") return <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />;
  if (status === "IN_PROGRESS") return <Clock className="h-5 w-5 text-warning" aria-hidden="true" />;
  return <Circle className="h-5 w-5" aria-hidden="true" />;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextStatus = todo.status === "DONE" ? "TODO" : "DONE";
    updateTodo.mutate({ id: todo.id, payload: { status: nextStatus } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (showConfirm) {
      deleteTodo.mutate(todo.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <article className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-sm animate-fade-in">
      <button
        onClick={handleToggle}
        className="shrink-0 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
        aria-label={`Mark "${todo.name}" as ${todo.status === "DONE" ? "todo" : "done"}`}
        disabled={updateTodo.isPending}
      >
        {statusIcon(todo.status)}
      </button>

      <Link to={`/todos/${todo.id}`} className="flex flex-1 items-center gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className={`truncate text-sm font-medium ${todo.status === "DONE" ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {todo.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${
              todo.priority === "HIGH" ? "text-destructive" : todo.priority === "MEDIUM" ? "text-warning" : "text-muted-foreground"
            }`}>
              {todo.priority}
            </span>
            <time className="text-xs text-muted-foreground" dateTime={todo.createdAt}>
              {new Date(todo.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </Link>

      <div className="shrink-0 flex items-center gap-1">
        {showConfirm && <span className="text-xs text-destructive mr-1">Sure?</span>}
        <button
          onClick={handleDelete}
          onBlur={() => setShowConfirm(false)}
          className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Delete "${todo.name}"`}
          disabled={deleteTodo.isPending}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
