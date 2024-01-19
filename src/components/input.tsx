import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: React.ReactNode
	currency?: boolean,
	inputClassName?: string
	className?: string
	icon?: React.ReactNode 
	leftIcon?: React.ReactNode 
	inputContainerClassName?: string
}

export const initialInputClassName = "flex w-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, inputClassName, type, error, currency, icon, leftIcon, ...props }, ref) => {
		return (
			<label
				data-state={props.disabled ? "disabled" : undefined}
				className={cn(`items-center block gap-1.5 relative data-[state=disabled]:cursor-not-allowed data-[state=disabled]:opacity-50`, className)}
			>
				<div className={cn(initialInputClassName, props.inputContainerClassName ?? '')}>
					{leftIcon}
					<input
						type={type}
						className={cn(
							"grow-1 w-full h-full outline-none placeholder:text-muted-foreground bg-transparent cursor-[inherit]",
							inputClassName
						)}
						ref={ref}
						{...props}
					/>
					{currency && (
						<div className="absolute text-center top-1/3 right-[10px] text-neutral-800">USD</div>
					)}
					{icon}
				</div>
				{error && (
					<ErrorMsg message={error} />
				)}
			</label>
		)
	}
)
Input.displayName = "Input"

export function ErrorMsg(props: {message: React.ReactNode}){
	return (
		<div className="text-red-500 mt-1 text-sm">{props.message}</div>
	)
}

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
		return (
			<div className={`relative ${className ?? ''}`}>
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
