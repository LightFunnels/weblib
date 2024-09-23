import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

import "./label.scss";


const labelVariants = cva("lfui-label");

const Label = React.forwardRef<
  HTMLLabelElement,
  React.InputHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cx(labelVariants(), className)}
    {...props}
  />
))

Label.displayName = "Label";

export { Label };
