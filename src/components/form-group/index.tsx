import clsx from "clsx";
import { Label } from "../";

import "./form-group.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {label?: React.ReactNode};

export function FormGroup({label, ...props}: Props){
	return (
		<div {...props} className={clsx(props.className, "lfui-formgroup")} >
			{
				label &&
				<Label>
					{label}
				</Label>
			}
			{props.children}
		</div>
	)
}

FormGroup.displayName = "FormGroup";