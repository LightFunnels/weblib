import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: React.ReactNode
	inputClassName?: string
	className?: string
	icon?: React.ReactNode 
	leftIcon?: React.ReactNode 
	inputContainerClassName?: string
}

export const initialInputClassName = "flex w-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, inputClassName, type, error, icon, leftIcon, inputContainerClassName, ...props }, ref) => {
		return (
			<label
				data-state={props.disabled ? "disabled" : undefined}
				className={cn(`items-center block gap-1.5 relative data-[state=disabled]:cursor-not-allowed data-[state=disabled]:opacity-80`, className)}
			>
				<div className={cn(initialInputClassName, inputContainerClassName ?? '')}>
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

export function ErrorMsg(props: {message: React.ReactNode, className?: string}){
	return (
		<div className={`text-red-500 mt-1 text-sm ${props.className ?? ""}`}>{props.message}</div>
	)
}

export type NumberInputProps = Omit<InputProps, "onChange"|"value"> &
	{
		decimals?: number
		currency?: boolean
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
		const decimals = props.decimals ?? 2;
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
						if(ev.target.value.split(".")[1]?.length > decimals!){
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
				{
					currency && (
						<div className="absolute right-5 top-1/2 [transform:translate(-50%,-50%)] text-neutral-800">USD</div>
					)
				}
				{error && (
					<div className="text-red-300 mt-2.5 mb-2.5">{error}</div>
				)}
			</div>
		)
	}
)
NumberInput.displayName = "NumberInput"

export { Input }
