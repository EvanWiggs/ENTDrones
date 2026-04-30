import { cn } from "../../lib/utils";

interface TabsProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  tabs: { value: T; label: string }[];
}

export function Tabs<T extends string>({ value, onValueChange, tabs }: TabsProps<T>) {
  return (
    <div className="grid grid-cols-4 rounded-lg border border-border bg-muted/45 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "h-8 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors",
            value === tab.value && "bg-primary/20 text-primary ring-1 ring-primary/30",
          )}
          onClick={() => onValueChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
