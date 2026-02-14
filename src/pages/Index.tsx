import { useState, useMemo } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem";
import SearchFilterBar from "@/components/SearchFilterBar";
import PaginationControls from "@/components/PaginationControls";
import TodoSkeleton from "@/components/TodoSkeleton";
import { Link } from "react-router-dom";
import { Plus, Inbox } from "lucide-react";

const Index = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  const { data, isLoading, isError, error } = useTodos(page, 10);

  const filteredTodos = useMemo(() => {
    if (!data?.data) return [];
    let todos = data.data;

    if (search.trim()) {
      const q = search.toLowerCase();
      todos = todos.filter((t) => t.name.toLowerCase().includes(q));
    }

    if (filter === "completed") {
      todos = todos.filter((t) => t.status === "DONE");
    } else if (filter === "incomplete") {
      todos = todos.filter((t) => t.status !== "DONE");
    }

    return todos;
  }, [data, search, filter]);

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Todos</h1>
          <p className="text-sm text-muted-foreground">
            {data?.meta?.total
              ? `${data.meta.total} total tasks`
              : "Manage your tasks"}
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Todo
        </Link>
      </div>

      <div className="mb-4">
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {isLoading ? (
        <TodoSkeleton />
      ) : isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center" role="alert">
          <p className="text-sm font-medium text-destructive">Failed to load todos</p>
          <p className="mt-1 text-xs text-muted-foreground">{(error as Error)?.message}</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Inbox className="h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            {search || filter !== "all" ? "No todos match your filters." : "No todos yet. Create one to get started!"}
          </p>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Todo list">
          {filteredTodos.map((todo) => (
            <div key={todo.id} role="listitem">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      )}

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Index;
