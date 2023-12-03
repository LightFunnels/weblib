import { Label } from "./";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	label?: React.ReactNode
}

export function FormGroup(props: Props){
	return (
		<div {...props} >
			{
				props.label &&
				<Label className={"mb-4"} children={props.label} />
			}
			{props.children}
		</div>
	)
}