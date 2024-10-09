import {
	Avatar,
	Button,
	Checkbox,
	DatePicker,
	Dropdown,
	DropdownItem,
	FormGroup,
	Heading,
	Input,
	Label,
	Modal,
	RangeDatePicker,
	Select,
	Text,
	Code,
	// ErrorBoundary,
	Spinner,
	// AsyncSelect,
	Alert,
    Link,
    Divider,
} from "../components";

import Buttons from "./examples/buttons"

import React from 'react';
import { createRoot } from "react-dom/client";

import "./styles.scss";

function Front() {
	const [m1, setM1] = React.useState(false);
	const [checked, setChecked] = React.useState(false);
	const [range, setRange] = React.useState({
		startDate: "2023-12-01 00:00:00",
		endDate: "2023-12-10 00:00:00",
	});
	const [date, setDate] = React.useState("2023-12-01 00:00:00");
  return (
  	<>
	  	<div className="px-4 py-16 w-[1200px] w-max-full mx-auto flex flex-col gap-10">
		  	<Buttons />
	  		<div className="grid grid-cols-2 gap-4 items-start">
		  		<div className="grid gap-4">
            <Label helpIcon="label with popover" children={
              <span>test</span>
            }/>
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
		  						footer={"Footer"}
		  					/>
		  				)
		  			}
		  			<Label>
		  				Input
		  			</Label>
		  			<Input />
		  			<FormGroup label={"Input with left icon/prefix"}>
		  				<Input
		  					error={
		  						"Something went wrong"
		  					}
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
	  				<div className="flex gap-2 items-center">
			  			<Dropdown
			  				label={
			  					<Label>Text Dropdown</Label>
			  				}
			  			>
								<DropdownItem>
									<span className="w-4 h-4 inline-block bg-gray-300" />
									Item 1
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
			  			</Dropdown>
	  				</div>
		  			<Label>Avatar</Label>
		  			<div className="flex gap-2">
		  				<Avatar src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" />
		  				<Avatar src="https://websites.umich.edu/~bbowman/photos/moon/the_Moon(60x)-072907-1156pm-tan-th.jpg" rounded="full" />
		  				<Avatar children="NB" rounded="full" />
		  			</div>
		  			<FormGroup label={"Select List"}>
			  			<Select
			  				labelClassName="self-start"
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
		  			<FormGroup label={"Searchable Select"}>
			  			<Select
			  				isSearchable
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
            <div className="flex items-center gap-3">
              <RangeDatePicker
			  				clearable
			  				onChange={setRange}
			  				value={range}
			  			/>
              <Divider orientation="vertical"/>
              <RangeDatePicker
			  				clearable
			  				onChange={setRange}
			  				value={range}
			  			/>
            </div>
		  			<Divider text="testing"/>
            <Divider/>
		  			<Link href="https://www.example.com" >Link</Link>
		  			<Link button variant="destructive" href="https://www.example.com" >Link</Link>
		  			<Link button variant="primary" href="https://www.example.com" >Link</Link>
		  			<Code copiable value="something" />
		  		</div>
		  		<div className="grid gap-4">
		  			<Heading version="h3" className="mb-2">
		  				Loading
		  			</Heading>
		  			<div>
			  			<Spinner />
			  			<Spinner className="w-10 h-10" />
		  			</div>
		  			{/*<FormGroup label="Async Select">
		  				<AsyncSelect
		  					value={[]}
		  					onChange={console.log}
		  					load={async () => {
		  						// won´t work, requires observer
		  						return {
		  							
		  						}
		  					}}
		  				/>
		  			</FormGroup>*/}
		  			<Heading version="h3" children="Alert" />
		  			<Alert
              variant="warning"
		  				icon={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
		  				label="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
		  			<Alert
              variant='success'
		  				icon={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
		  			  label="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
		  			<Alert
		  				icon={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
		  				variant="info"
		  				label="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
            <Alert
		  				icon={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
		  				variant="error"
		  				label="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
		  		</div>
	  		</div>
	  		{/*<Hr className="my-4" />
		  	<div>
		  		<Heading className="mb-4">
		  			Error
		  		</Heading>
		  		<ErrorBoundary>
		  			<ForceError />
		  		</ErrorBoundary>
		  	</div>*/}
	  	</div>
	  </>
  )
}

function ForceError(){
	React.useEffect(() => {
		// throw new Error("Something went wrong")
	}, [])
	return <></>;
}

createRoot(document.getElementById('app')).render(<Front />)
