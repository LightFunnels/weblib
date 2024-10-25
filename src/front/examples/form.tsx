import React from 'react';
import {
	Checkbox,
	DatePicker,
	FormGroup,
	Input,
	Select,
	RangeDatePicker,
	Divider,
	Textarea,
	Heading,
	Radio
} from "../../components";

export default function Badges(){
	const [date, setDate] = React.useState("2023-12-01 00:00:00");
	const [checked, setChecked] = React.useState(false);
	const [range, setRange] = React.useState({
		startDate: "2023-12-01 00:00:00",
		endDate: "2023-12-10 00:00:00",
	});
	return (
		<div className="flex flex-col gap-4">
			<Heading children="Forms" />
			<FormGroup
				label={"Text"}
				action={<span>CLick here</span>} >
				<Input />
			</FormGroup>
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
			<FormGroup label={"Textarea - error"}>
				<Textarea
					error={
						"Something went wrong"
					}
				/>
			</FormGroup>
			<FormGroup label={"Textarea"}>
				<Textarea value="my value" onChange={() => {}} />
			</FormGroup>
			<FormGroup label={"Disabled Input"}>
				<Input disabled/>
			</FormGroup>
			<FormGroup label={"Select List"}>
  			<Select
  				labelClassName="self-start"
  				onChange={console.log}
  				value="morocco"
  				options={[
	  				{
	  					value: "morocco",
	  					label: "Morocco",
	  				},
	  				{
	  					value: "kesh",
	  					label: "Marrakesh",
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
			<Checkbox disabled={true} onChange={event => setChecked(event.target.checked)} checked={checked} label="Checkbox" />
			<Checkbox disabled={true} onChange={event => setChecked(event.target.checked)} checked={false} label="Checkbox" />
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
			<Radio checked={checked} onChange={ev => setChecked(ev.target.checked)} label="Check" />
			<Radio checked={false} label="Check" />
			<Radio disabled={true} label="Disabled Check" />
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
		</div>
	)
}
