import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React, { Fragment } from "react";
import "./divider.scss";


const dividerVariants = cva(
  "lfui-divider",
  {
    variants: {
      orientation: {
      	horizontal:"lfui-divider_horizontal",
      	vertical:"lfui-divider_vertical",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    }
  }
)

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof dividerVariants>;

export const Divider = React.forwardRef< HTMLDivElement, DividerProps >(
  (
    { className, orientation, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(dividerVariants({ orientation, className }))}
      {...props}
    >
    	<div className="lfui-dividerLine" />
      {
      	children && (
      		<Fragment>
      			<span className="lfui-dividerText">{children}</span>
    				<div className="lfui-dividerLine" />
      		</Fragment>
      	)
      }
    </div>
  )
)


Divider.displayName = "Divider";
