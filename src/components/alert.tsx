import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Heading, Text } from ".";

const variants = cva(
  "p-2 border rounded-md flex gap-2",
  {
    variants: {
      variant: {
			  default: "",
			  destructive: "text-destructive border-destructive"
			},
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Props = VariantProps<typeof variants> & {
	className?: string
	title?: React.ReactNode
	icon?: React.ReactNode
	message: React.ReactNode
}

export function Alert({variant, className, ...props}: Props){
	return (
		<div className={cn(variants({ variant, className }))}>
			{
				props.icon &&
				<div>
					{props.icon}
				</div>
			}
			<div className="grow flex flex-col gap-2">
				<div>
					{
						!React.isValidElement(props.title) ?
							<div className="text-base font-medium">
								{props.title}
							</div> :
							props.title
					}
				</div>
				<div>
					{
						!React.isValidElement(props.message) ?
							<div className="text-sm">
								{props.message}
							</div> :
							props.message
					}
				</div>
			</div>
		</div>
	)
}