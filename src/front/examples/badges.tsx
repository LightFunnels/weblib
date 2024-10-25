import { Badge, Close, Heading } from "../../components"

export default function Badges(){
	return (
		<div className="flex flex-col gap-4">
			<Heading>Badge</Heading>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<Badge>
						Badge
					</Badge>
					<Badge variant="warning">
						Badge
					</Badge>
					<Badge variant="success">
						Badge
					</Badge>
					<Badge variant="destructive">
						Badge
					</Badge>
					<Badge variant="destructive">
						<Close style={{width: 16}} />
						Badge
					</Badge>
				</div>
			</div>
		</div>
	)
}
