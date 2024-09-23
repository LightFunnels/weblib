import { clsx } from 'clsx';
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Heading, Text, Label } from "..";

import "./alert.scss"

const variants = cva(
  "lfui-alert",
  {
    variants: {
      variant: {
			  destructive: "lfui-alert_destructive",
			  informative: "lfui-alert_informative",
			  primary: "lfui-alert_primary",
			},
    },
    defaultVariants: {
      variant: "primary",
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
		<div className={clsx(variants({ variant, className }))}>
			{
				props.icon &&
				<div>
					{props.icon}
				</div>
			}
			<div className="lfui-alertBody">
				<div>
					{
						!React.isValidElement(props.title) ?
							<Label children={props.title} /> :
							props.title
					}
				</div>
				<div>
					{
						!React.isValidElement(props.message) ?
							<div className="lfui-alertMessage">
								{props.message}
							</div> :
							props.message
					}
				</div>
			</div>
		</div>
	)
}