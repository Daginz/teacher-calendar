import * as React from "react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";


type ButtonProps = ComponentProps<"button"> & {
variant?: "default" | "outline" | "ghost";
};


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant = "default", ...props }, ref) => {
const styles =
variant === "outline"
? "border bg-background hover:bg-accent"
: variant === "ghost"
? "hover:bg-accent"
: "bg-foreground text-background hover:opacity-90";


return (
<button ref={ref} className={cn("px-3 py-1 rounded text-sm", styles, className)} {...props} />
);
}
);


Button.displayName = "Button";