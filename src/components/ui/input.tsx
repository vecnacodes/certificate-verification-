import * as React from "react";
import { cn } from "@/lib/utils";

// Define the properties that the Input component will accept, extending from the default HTML input attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Create a forwardRef component to handle refs
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// Set displayName for better debugging and React DevTools integration
Input.displayName = "Input";

export { Input };
