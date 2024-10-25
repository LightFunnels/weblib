import { Code, Heading, Label, NativeLink, Text } from "../../components"

export default function Typography(){
	return (
		<div className="flex flex-col gap-4">
			<Heading>
				heading 1
			</Heading>
			<Heading version="h2">
				heading 2
			</Heading>
			<Heading version="h3">
				heading 3
			</Heading>
			<Text>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat numquam ratione iure maxime, nobis minus assumenda nostrum placeat veritatis neque laudantium dolorem unde! Architecto, magni dolor at labore, ad molestias.
			</Text>
			<Label children={<span>Label</span>}/>
			<NativeLink href="https://www.example.com" >Link</NativeLink>
			<NativeLink href="https://www.example.com" >Link</NativeLink>
			<NativeLink href="https://www.example.com" >Link</NativeLink>
			<Code copiable value="something" />
		</div>
	)
}
