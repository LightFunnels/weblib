import { Button, Heading } from "../../../components"

export default function Buttons(){
	return (
		<div className="flex flex-col gap-4">
			<Heading>Buttons</Heading>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<Button>
						button
					</Button>
					<Button disabled>
						button
					</Button>
					<Button size="small">
						Small
					</Button>
				</div>
				<div>
					<Button loading>
						button
					</Button>
				</div>
				<div>
					<Button variant="secondary">
						button
					</Button>
				</div>
				<div>
					<Button variant="destructive">
						button
					</Button>
				</div>
			</div>
		</div>
	)
}
