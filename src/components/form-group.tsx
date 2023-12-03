import { Label } from "./";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	label?: React.ReactNode
}

export function FormGroup(props: Props){
	return (
		<div {...props} >
			{
				props.label &&
				<Label className={"mb-4"}>
					{props.label}
				</Label>
			}
			{props.children}
		</div>
	)
}

FormGroup.displayName = "FormGroup";