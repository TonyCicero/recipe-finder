import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10"
          />
        </div>
        {value && (
          <Button className="cursor-pointer" variant="outline" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Separate multiple ingredients with commas
      </p>
    </div>
  );
}