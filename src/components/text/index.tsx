import { cva, type VariantProps } from "class-variance-authority";
import clsx from 'clsx';
import React from "react";

import "./text.scss";

const textVariants = cva(
  "lfui-text",
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = VariantProps<typeof textVariants> & {
	children?: React.ReactNode
	className?: string
}

export const Text = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	function Text({className, ...props}: Props, ref){
		return (
			<p ref={ref} className={clsx(textVariants({ className }))}>
				{props.children}
			</p>
		)
	}
)