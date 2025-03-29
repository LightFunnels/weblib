import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";

import "./button.scss";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "lfui-button",
  {
    variants: {
      variant: {
        primary: "lfui-button_primary",
        destructive: "lfui-button_destructive",
        secondary: "lfui-button_secondary",
      },
    },
    defaultVariants: {
      variant: "primary",
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  loading?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, loading, children, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant }), className)}
        ref={ref}
        disabled={props.disabled}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
           {children} 
          </>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants };
