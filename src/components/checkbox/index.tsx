import clsx from "clsx";
import * as React from "react";
import { Label } from "../";
 
import "./checkbox.scss";

type Props = React.HTMLAttributes<HTMLInputElement> & {
	checked: boolean
	label: React.ReactNode
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox(props: Props){
	return (
		<Label className={clsx("lfui-checkbox", props.className)}>
			<input checked={props.checked} onChange={props.onChange} type="checkbox" className="lfui-checkboxInput" />
			<div
				className={clsx("lfui-checkboxIcon", {"lfui-checkbox_checked": props.checked})}
			>
				{props.checked && (
					<CheckIcon className="lfui-checkboxCheckIcon" />
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