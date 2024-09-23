import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";
import "./hr.scss";


const HRVariants = cva(
  "lfui-hr",
  {
    variants: {
      orientation: {
      	"horizontal":"lfui-hr-horizontal",
      	"vertical":"lfui-hr-vertical",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    }
  }
)

type Props = VariantProps<typeof HRVariants> & React.HTMLAttributes<HTMLDivElement>;

export const Hr = React.forwardRef< HTMLDivElement, Props >(
  (
    { className, orientation, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(HRVariants({ orientation, className }))}
      {...props}
    />
  )
)


Hr.displayName = "Hr";