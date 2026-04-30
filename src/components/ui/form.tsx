import * as React from "react";
import { cn } from "../../lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-9 rounded-md border border-input bg-background/70 px-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-20 resize-none rounded-md border border-input bg-background/70 p-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
        props.className,
      )}
    />
  );
}
