import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	currency?: boolean,
	inputClassName?: string
	className?: string
	icon?: React.ReactElement 
	leftIcon?: React.ReactElement 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, inputClassName, type, error, currency, icon, leftIcon, ...props }, ref) => {
		return (
			<div 
				className={`relative ${className ?? ''} flex items-center gap-1.5 relative h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
			>
				{leftIcon}
				<input
					type={type}
					className={cn(
						"outline-none placeholder:text-muted-foreground w-full disabled:cursor-not-allowed disabled:opacity-50",
						inputClassName
					)}
					ref={ref}
					{...props}
				/>
				{currency && (
					<div className="absolute text-center top-1/3 right-[10px] text-neutral-800">USD</div>
				)}
				{icon}
				{error && (
					<div className="text-red-300 mt-2.5 mb-2.5">{error}</div>
				)}
			</div>
		)
	}
)
Input.displayName = "Input"

type NumberInputProps = Omit<InputProps, "onChange"|"value"> &
	{
		decimals?: number
		onChange: (a: number|null) => void
		value: number|null
		inputClassName?: string
		className?: string
	};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	({ className, inputClassName, error, currency, ...props }, ref) => {
		const [lv, setLV] = React.useState<string>(() => (props.value?.toString() ?? ""));
		function reset(){
			let pv = props.value === null ? null : Number(props.value);
			let v = Number(lv);
			return pv !== v;
		}
		React.useLayoutEffect(() => {
			if(props.value === null){
				return;
			}
			if(reset()){
				setLV(props.value?.toString());
			}
		}, [props.value, lv]);
		// console.log(props.value, lv)
		return (
			<div className={`relative ${className ?? ''}`}>
				{/*<button onClick={() => props.onChange(22.22)}>y</button>*/}
				<input
					className={cn(
						"flex relative h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						inputClassName
					)}
					ref={ref}
					{...props}
					// temporary fix
					type={"number"}
					value={lv ?? ""}
					onBlur={ev => {
						if(reset()){
							setLV(props.value?.toString() ?? "");
						}
					}}
					onChange={ev => {
						if(ev.target.value.split(".")[1]?.length > props.decimals!){
							ev.preventDefault();
							return;
						}
						setLV(ev.target.value);
						if(ev.target.value === ""){
							props.onChange(null);
							return;
						}
						let val = Number(ev.target.value);
						if(!isNaN(val)){
							props.onChange(val);
						}
					}}
				/>
				{error && (
					<div className="text-red-300 mt-2.5 mb-2.5">{error}</div>
				)}
			</div>
		)
	}
)
NumberInput.displayName = "NumberInput"
NumberInput.defaultProps = {
	decimals: 2
}

export { Input }
