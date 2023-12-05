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
	const [date, setDate] = React.useState("2023-12-01 00:00:00");
  return (
  	<div className="px-4 py-16 w-[800px] w-max-full mx-auto grid grid-cols-2 gap-4">
  		<div className="grid gap-4">
  			<Heading>
  				Default Heading
  			</Heading>
  			<Hr/>
  			<div>
	  			<Button>
	  				button
	  			</Button>
  			</div>
  			<Hr/>
  			<Text>
  				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat numquam ratione iure maxime, nobis minus assumenda nostrum placeat veritatis neque laudantium dolorem unde! Architecto, magni dolor at labore, ad molestias.
  			</Text>
  			<Hr/>
  			<div>
	  			<Button onClick={() => setM1(true)}>
	  				Modal
	  			</Button>
  			</div>
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
  			<Hr/>
  			<Label>
  				Input & Input
  			</Label>
  			<Input />
  			<FormGroup label={"Input with left icon/prefix"}>
  				<Input
  					leftIcon={
  						<span>https://www.example.com/</span>
  					}
  				/>
  			</FormGroup>
  			<FormGroup label={"Disabled Input"}>
  				<Input disabled/>
  			</FormGroup>
  			<FormGroup label={"Form Group Label"}>
  				<Input />
  			</FormGroup>
  			<Hr/>
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
  			<Hr/>
  			<Text>Avatar</Text>
  			<Avatar src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" />
  			<FormGroup label={"Select"}>
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
  			<Hr/>
  			<FormGroup label={"Date Picker"}>
	  			<DatePicker
	  				clearable
	  				onChange={value => setDate(value)}
	  				value={date}
	  			/>
  			</FormGroup>
  			<FormGroup label={"Date Picker - non clearable"}>
	  			<DatePicker
	  				onChange={value => setDate(value)}
	  				value={date}
	  			/>
  			</FormGroup>
  			<FormGroup label={"Date Picker"}>
	  			<RangeDatePicker
	  				clearable
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