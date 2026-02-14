import { Search, Filter } from "lucide-react";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "completed" | "incomplete";
  onFilterChange: (value: "all" | "completed" | "incomplete") => void;
}

const SearchFilterBar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: SearchFilterBarProps) => {
  const filters: { value: "all" | "completed" | "incomplete"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "completed", label: "Complete" },
    { value: "incomplete", label: "Incomplete" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search todos by title"
        />
      </div>

      <div className="flex items-center gap-1 rounded-md border bg-card p-1" role="radiogroup" aria-label="Filter by status">
        <Filter className="ml-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            role="radio"
            aria-checked={filter === f.value}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBar;
