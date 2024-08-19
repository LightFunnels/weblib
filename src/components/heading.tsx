import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"

const headingVariants = cva(
  "text-gray-900",
  {
    variants: {
      variant: {
        default: "text-xl font-medium",
        lg: "text-lg font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Props = VariantProps<typeof headingVariants> & {
	children: React.ReactNode
	className?: string
}

export function Heading({variant, className, ...props}: Props){
	return (
		<div className={cn(headingVariants({ variant, className }))}>
			{props.children}
		</div>
	)
}