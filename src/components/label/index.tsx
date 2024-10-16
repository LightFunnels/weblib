import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cx as clsx } from "class-variance-authority";


import "./label.scss";

const labelVariants = cva("lfui-label");

export type LabelProps=
  React.LabelHTMLAttributes<HTMLLabelElement>&
    VariantProps<typeof labelVariants>& {
  action?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ action, children, className, ...props }, ref) => (
    <div className="lfui-labelContainer">
      <label
        ref={ref}
        className={clsx(labelVariants(), className)}
        {...props}
      >
        {children}
      </label>
      {action}
    </div>
  )
);

Label.displayName = "Label";

export { Label, labelVariants };
