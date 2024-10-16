import clsx from "clsx";
import * as React from "react";
import { Label, isHTMLElement } from "../";
 
import "./checkbox.scss";

export type CheckboxProps = React.HTMLAttributes<HTMLInputElement> & {
	checked: boolean
	label?: React.ReactNode
  disabled?: boolean 
}

export function Checkbox({label,checked,disabled,...props}: CheckboxProps){
	return (
		<Label className={clsx("lfui-checkbox", props.className ,{ "lfui-checkbox_disabled": disabled })}>
			<input 
        {...props}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        className="lfui-checkboxInput"
      />
			<div
				className={clsx("lfui-checkboxIcon", {"lfui-checkbox_checked" : checked,"lfui-checkbox_disabled": disabled})}
			>
				{checked && (
					<CheckIcon className="lfui-checkboxCheckIcon" />
				)}
			</div>
      {isHTMLElement(label) ? 
      <label.type {...label.props} className={clsx(label.props.className)} key={label.key}/>
      : label && (
        <span className={clsx("lfui-checkboxLabel")}>
          {label}
        </span>
      )}
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
