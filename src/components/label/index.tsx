import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import "./label.scss";

const labelVariants = cva("lfui-label");

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label ({ className, ...props }, ref) {
  	return (
			<label
				{...props}
		    className={clsx(labelVariants(), className)}
		    children={props.children}
		    ref={ref}
			/>
  	)
  }
);

Label.displayName = "Label";