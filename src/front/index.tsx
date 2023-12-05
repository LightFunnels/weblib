import {
	Button,
	Dropdown,
	DropdownItem,
	FormGroup,
	Heading,
	Hr,
	Input,
	Label,
	Modal,
	Text,
	Avatar,
	Checkbox,
	Select,
	DatePicker,
	RangeDatePicker,
} from "@/components";
import React, { Fragment } from 'react';

export default function Front() {
	const [m1, setM1] = React.useState(false);
	const [checked, setChecked] = React.useState(false);
	const [range, setRange] = React.useState({
		startDate: "2023-12-01 00:00:00",
		endDate: "2023-12-10 00:00:00",
	});
  return (
  	<div className="px-4 py-16 w-[800px] w-max-full mx-auto grid grid-cols-2 gap-4">
  		<div>
  			<Heading>
  				Default Heading
  			</Heading>
  			<Hr className="my-4" />
  			<Button>
  				button
  			</Button>
  			<Hr className="my-4" />
  			<Text>
  				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat numquam ratione iure maxime, nobis minus assumenda nostrum placeat veritatis neque laudantium dolorem unde! Architecto, magni dolor at labore, ad molestias.
  			</Text>
  			<Hr className="my-4" />
  			<Button onClick={() => setM1(true)}>
  				Modal
  			</Button>
  			{
  				m1 && (
  					<Modal
  						close={() => {setM1(false)}}
  						header={"Header" }
  						bodyClassName={"w-[600px]"}
  						body={
  							<Text>
  								Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat numquam ratione iure maxime, nobis minus assumenda nostrum placeat veritatis neque laudantium dolorem unde! Architecto, magni dolor at labore, ad molestias.
  							</Text>
  						}
  						footer={"Footer" }
  					/>
  				)
  			}
  			<Hr className="my-4" />
  			<Label>
  				Input
  			</Label>
  			<Input className="mb-4" />
  			<FormGroup label={"Form Group Label"}>
  				<Input />
  			</FormGroup>
  			<Hr className="my-4" />
  			<Dropdown
  				label={
  					<Text>Drop Down</Text>
  				}
  			>
					<DropdownItem>
						<span className="w-4 h-4 inline-block bg-primary"></span>
						Item 1
					</DropdownItem>
  			</Dropdown>
  			<Hr className="my-4" />
  			<Text className="mb-4">Avatar</Text>
  			<Avatar className="mb-4" src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" />
  			<FormGroup className="mb-4" label={"Select"}>
	  			<Select
	  				onChange={console.log}
	  				value="morocco"
	  				options={[
		  				{
		  					value: "morocco",
		  					label: "Morocco",
		  				}
	  				]}
	  			/>
  			</FormGroup>
  			<Checkbox onChange={event => setChecked(event.target.checked)} checked={checked} label="Checkbox" />
  			<Hr className="my-4" />
  			<FormGroup label={"Date Picker"}>
	  			<DatePicker
	  				onChange={console.log}
	  				value={"2023-12-05"}
	  			/>
  			</FormGroup>
  			<FormGroup className="mt-4" label={"Date Picker"}>
	  			<RangeDatePicker
	  				cancellable
	  				onChange={setRange}
	  				value={range}
	  			/>
  			</FormGroup>
  		</div>
  		<div>
  		</div>
  	</div>
  )
}