import {
	Button,
	Heading,
	Modal,
	Text
} from "../components";

import Alerts from "./examples/alerts";
import Avatars from "./examples/avatars";
import Badges from "./examples/badges";
import Buttons from "./examples/buttons";
import Dividers from "./examples/dividers";
import Dropdowns from "./examples/dropdowns";
import Form from "./examples/form";
import Typography from "./examples/typography";

import React from 'react';
import { createRoot } from "react-dom/client";

import { Spinner } from "../components/spinner";
import "./styles.scss";

function Front() {
	const [m1, setM1] = React.useState(false);
  return (
  	<>
	  	<div className="px-4 py-16 w-[1200px] w-max-full mx-auto flex flex-col gap-10">
		  	<Buttons />
		  	<Badges />
		  	<Typography />
		  	<Form />
		  	<Alerts />
		  	<Dividers />
		  	<Avatars />
		  	<Dropdowns />
	  		<div className="grid grid-cols-2 gap-4 items-start">
		  		<div className="grid gap-4">
		  			<div>
			  			<Button onClick={() => setM1(true)}>
			  				Modal
			  			</Button>
		  			</div>
		  			{
		  				m1 && (
		  					<Modal
		  						close={() => {setM1(false)}}
		  						header={"Header"}
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
		  		</div>
		  		<div className="grid gap-4">
		  			<Heading version="h3" className="mb-2">
		  				Loading
		  			</Heading>
		  			<div>
			  			<Spinner variant="primary"/>
			  			<Spinner variant="primary" className="w-10 h-10 fill-red-500" />
		  			</div>
		  		</div>
	  		</div>
	  	</div>
	  </>
  )
}

createRoot(document.getElementById('app')).render(<Front />)
