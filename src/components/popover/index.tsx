import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from 'react';

import "./popover.scss";

const popoverVariants = cva(
  "lfui-popover",
  {
    variants: {
      placement: {
        top: "lfui-popover_top",
        bottom: "lfui-popover_bottom",
        left: "lfui-popover_left",
        right: "lfui-popover_right",
      },
    },
    defaultVariants: {
      placement: "bottom",
    }
  }
);

type PopoverVariantProps = VariantProps<typeof popoverVariants>;

export type PopoverProps = React.HTMLAttributes<HTMLDivElement> & {
  arrowClassName?: string;
  offset?: [number, number];
}

export const PopoverCard = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, arrowClassName, children, ...props }, ref) => {
    const arrowRef = React.useRef<HTMLDivElement>(null);
    return (
      <div
        className={clsx(popoverVariants({}), className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

PopoverCard.displayName = "PopoverCard";

export { popoverVariants };
