import * as React from "react"
import {Label} from "./";
 
import { cn } from "@/lib/utils"
 
type Props = React.HTMLAttributes<HTMLInputElement> & {
	checked: boolean
	label: React.ReactNode
}

export function Checkbox(props: Props){
	return (
		<Label className={cn("flex items-center cursor-pointer", props.className)}>
			<input checked={props.checked} onChange={props.onChange} type="checkbox" className="hidden" />
			<div
				data-state="checked"
				className={cn(
				  "peer h-4 w-4 align-middle mr-1 cursor-pointer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				)}
			/>
			<span>
				{props.label}
			</span>
		</Label>
	)
}