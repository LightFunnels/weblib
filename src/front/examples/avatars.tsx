import { Avatar, Heading } from "../../components"

export default function Avatars(){
	return (
		<div className="flex flex-col gap-4">
			<Heading>Avatars</Heading>
			<div className="flex gap-2">
				<Avatar src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" />
				<Avatar src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" rounded="full" />
				<Avatar children="NB" rounded="full" />
			</div>
		</div>
	)
}
