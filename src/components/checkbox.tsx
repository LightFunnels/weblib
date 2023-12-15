import * as React from "react"
import {Label} from "./";
import { cn } from "@/lib/utils"
 
type Props = React.HTMLAttributes<HTMLInputElement> & {
	checked: boolean
	label: React.ReactNode
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox(props: Props){
	return (
		<Label className={cn("flex items-center cursor-pointer", props.className)}>
			<input checked={props.checked} onChange={props.onChange} type="checkbox" className="hidden" />
			<div
				data-state={props.checked ? "checked" : "unchecked"}
				className={cn(
				  "peer h-4 w-4 flex items-center justify-center mr-1 cursor-pointer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				)}
			>
				{props.checked && (
					<CheckIcon className="w-3 h-3" />
				)}
			</div>
			<span>
				{props.label}
			</span>
		</Label>
	)
}

function CheckIcon(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
		<svg viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path className={"fill-primary-foreground"} fillRule="evenodd" clipRule="evenodd" d="M22.276 10.1116L12.7583 20.2231L7.98223 15.1496L3.2062 10.0761L1.60308 11.7792L0 13.4822L6.3621 20.2411L12.7242 27L23.8621 15.1677L35 3.33531L33.4313 1.66763C32.5685 0.750428 31.8472 0 31.8282 0C31.8093 0 27.5108 4.55018 22.276 10.1116Z" />
		</svg>
	)
}