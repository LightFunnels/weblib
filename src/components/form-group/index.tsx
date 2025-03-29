import {cx as clsx} from "class-variance-authority";
import { Label } from "../";
import { Fallback } from "../utilities";

import "./form-group.scss";

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & T;

export function FormGroup({label, action, ...props}: FormGroupProps){
	return (
		<div {...props} className={clsx(props.className, "lfui-formgroup")} >
			{
				(label || action) &&
				<FormgroupHeader action={action} label={label} />
			}
			{props.children}
		</div>
	)
}

FormGroup.displayName = "FormGroup";

type T = {
	label?: React.ReactNode
	action?: React.ReactNode
}

export type formgroupHeaderProps = React.HTMLAttributes<HTMLDivElement> & T;

export function FormgroupHeader(props: formgroupHeaderProps){
	return (
		<div className="lfui-formgroupHeader">
			{Fallback(props.label, <Label children={props.label} />)}
			{/* force space betwen alignemt */}
			{
				!props.label &&
				!props.action &&
				<div />
			}
			{props.action}
		</div>
	)
}

