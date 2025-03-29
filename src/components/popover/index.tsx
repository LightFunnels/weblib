import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from 'react';

import "./popover.scss";

const popoverVariants = cva(
  "lfui-popover",
);

type PopoverVariantProps = VariantProps<typeof popoverVariants>;

export type PopoverProps = React.HTMLAttributes<HTMLDivElement>

export const PopoverCard = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, children, ...props }, ref) => {
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
