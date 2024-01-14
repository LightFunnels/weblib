import { Label } from "./";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	label?: React.ReactNode
}

export function FormGroup({label, ...props}: Props){
	return (
		<div {...props} >
			{
				label &&
				<Label className={"mb-2"}>
					{label}
				</Label>
			}
			{props.children}
		</div>
	)
}

FormGroup.displayName = "FormGroup";