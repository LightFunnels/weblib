import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";
import "./divider.scss";


const dividerVariants = cva(
  "lfui-divider",
  {
    variants: {
      variant: {
        default: "lfui-divider_default",
        withText: "lfui-divider_with-text",
      },
      orientation: {
      	"horizontal":"lfui-divider_horizontal",
      	"vertical":"lfui-divider_vertical",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    }
  }
)

interface DividerProps extends React.HTMLAttributes<HTMLDivElement>,VariantProps<typeof dividerVariants>{
 text? : string;
};

export const Divider = React.forwardRef< HTMLDivElement, DividerProps >(
  (
    { className, orientation, variant,text, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(dividerVariants({ variant:text? "withText" :"default" ,orientation, className }))}
      {...props}
    >
        {text && <span className="lfui-divider_text">{text}</span>}
    </div>
  )
)


Divider.displayName = "Divider";