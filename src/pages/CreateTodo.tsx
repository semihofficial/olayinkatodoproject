import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTodo } from "@/hooks/useTodos";
import { ArrowLeft } from "lucide-react";

const CreateTodoPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const createTodo = useCreateTodo();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createTodo.mutate(
      { name: name.trim(), description: description.trim() || undefined, priority },
      { onSuccess: () => navigate("/") }
    );
  };

  return (
    <div className="mx-auto max-w-lg animate-fade-in">
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back
      </button>

      <h1 className="mb-6 text-2xl font-bold text-foreground">Create Todo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="What needs to be done?" className="w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add more details (optional)" rows={3} className="w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        <div>
          <label htmlFor="priority" className="mb-1.5 block text-sm font-medium text-foreground">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")} className="w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <button type="submit" disabled={createTodo.isPending || !name.trim()} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {createTodo.isPending ? "Creating..." : "Create Todo"}
        </button>

        {createTodo.isError && (
          <p className="text-sm text-destructive" role="alert">Failed to create todo. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default CreateTodoPage;
