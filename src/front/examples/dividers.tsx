import { Divider, Heading } from "../../components"

export default function Badges(){
	return (
		<div className="flex flex-col gap-4">
			<Heading>Dividers</Heading>
			<div className="flex h-40">
				<div className="grow">
					Hello
					<Divider />
					World
					<Divider children="Horizontal text"/>
					Again
				</div>
				<div className="flex grow items-center gap-4">
					hello
      		<Divider orientation="vertical" children="Vertical Text" />
      		world
      		<Divider orientation="vertical" />
      		again
				</div>
			</div>
		</div>
	)
}
