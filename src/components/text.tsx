import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"
import React from "react";

const headingVariants = cva(
  "text-neutral-900",
  {
    variants: {
      variant: {
        default: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Props = VariantProps<typeof headingVariants> & {
	children?: React.ReactNode
	className?: string
}

export const Text = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	function Text({variant, className, ...props}: Props, ref){
		return (
			<p ref={ref} className={cn(headingVariants({ variant, className }))}>
				{props.children}
			</p>
		)
	}
)