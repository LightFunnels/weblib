import { Button, Dropdown, DropdownItem, Label } from "../../components"

export default function Dropdowns(){
	return (
		<div className="flex flex-col gap-4">
			<Dropdown
				label={
					<Label>Text Dropdown</Label>
				}
			>
				<DropdownItem>
					<span className="w-4 h-4 inline-block bg-gray-300" />
					Item 1
				</DropdownItem>
				<DropdownItem>
					<span className="w-4 h-4 inline-block bg-gray-300" />
					Item 2
				</DropdownItem>
			</Dropdown>
			<Dropdown
				label={
					<Button>Button</Button>
				}
			>
				<DropdownItem>
					<span className="w-4 h-4 inline-block bg-gray-300" />
					Item 1
				</DropdownItem>
				<DropdownItem>
					<span className="w-4 h-4 inline-block bg-gray-300" />
					Item 2
				</DropdownItem>
			</Dropdown>
		</div>
	)
}
