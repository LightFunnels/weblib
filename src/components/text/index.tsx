import { cva, type VariantProps } from "class-variance-authority";
import clsx from 'clsx';
import React from "react";

import "./text.scss";

const textVariants = cva(
  "lfui-text",
  {
    variants: {
      size: {
        large: "lfui-text_large",
        medium: "lfui-text_medium",
        small: "lfui-text_small",
      }
    },
    defaultVariants: {
      size: "large",
    }
  }
)

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  children?: React.ReactNode;
  className?: string;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  function Text({ className, size, ...props }, ref) {
    return (
      <p ref={ref} className={clsx(textVariants({ size, className }))}>
        {props.children}
      </p>
    )
  }
)

Text.displayName = "Text";
