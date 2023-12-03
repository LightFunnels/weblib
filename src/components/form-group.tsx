import { Label } from "@/components";

type Props = {
	label?: React.ReactNode
	children: React.ReactNode
}

export function FormGroup(props: Props){
	return (
		<div>
			{
				props.label &&
				<Label className={"mb-4"} children={props.label} />
			}
			{props.children}
		</div>
	)
}