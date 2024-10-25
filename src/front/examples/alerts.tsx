import { Alert, Heading } from "../../components"

export default function Badges(){
	return (
		<div className="flex flex-col gap-4">
			<Heading version="h3" children="Alert" />
			<Alert
        variant="warning"
				thumbnail={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
				label="Maniace palladia overthin schoenus"
				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
			/>
			<Alert
        variant='success'
				thumbnail={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
			  label={<div className="cusom-class">Maniace palladia overthin schoenus</div>}
				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
			/>
			<Alert
				thumbnail={<div className="w-10 h-10 border rounded-full bg-gray-300 flex justify-center items-center" children="NB" />}
				variant="info"
				label="Maniace palladia overthin schoenus"
				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
			/>
      <Alert
				thumbnail={<div className="w-10 h-10 border rounded-full bg-gray-300" />}
				variant="error"
				label="Maniace palladia overthin schoenus"
				message="sulcated introgression dedicatee palladia overthin schoenus equinus jamlike harmoniphon cloudland ophthalmoplasty."
			/>
		</div>
	)
}
