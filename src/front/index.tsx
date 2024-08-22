import {
	Avatar,
	Button,
	Checkbox,
	DatePicker,
	Dropdown,
	DropdownItem,
	FormGroup,
	Heading,
	Hr,
	Input,
	Label,
	Modal,
	NativeLink,
	RangeDatePicker,
	Select,
	Text,
	ErrorBoundary,
	LoadingSpinner,
	AsyncSelect,
	Alert,
} from "@/components";
import React from 'react';
import { createRoot } from "react-dom/client";

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
	  	<div className="px-4 py-16 w-[800px] w-max-full mx-auto">
	  		<div className="grid grid-cols-2 gap-4 items-start">
		  		<div className="grid gap-4">
		  			<Heading>
		  				Default Heading
		  			</Heading>
		  			<Hr/>
		  			<div>
			  			<Button loading>
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
		  			<Hr />
		  			<NativeLink href="https://www.example.com" >Link</NativeLink>
		  		</div>
		  		<div className="grid gap-4">
		  			<Heading className="mb-2">
		  				Loading
		  			</Heading>
		  			<div>
			  			<LoadingSpinner className="mb-2" size="sm" />
			  			<LoadingSpinner className="mb-2" />
			  			<LoadingSpinner className="mb-2" size="lg" />
		  			</div>
		  			<FormGroup label="Async Select">
		  				<AsyncSelect
		  					value={[]}
		  					onChange={console.log}
		  					load={async () => {
		  						// won´t work, requires observer
		  						return {
		  							
		  						}
		  					}}
		  				/>
		  			</FormGroup>
		  			<Heading children="Alert" />
		  			<Alert
		  				title="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
		  			<Alert
		  				icon={
		  					<div className="w-10 h-10 border rounded-full border-destructive">
		  						
		  					</div>
		  				}
		  				variant="destructive"
		  				title="Maniace palladia overthin schoenus"
		  				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
		  			/>
		  		</div>
	  		</div>
	  		<Hr className="my-4" />
		  	<div>
		  		<Heading className="mb-4">
		  			Error
		  		</Heading>
		  		<ErrorBoundary>
		  			<ForceError />
		  		</ErrorBoundary>
		  	</div>
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