import clsx from "clsx";
import * as React from "react";

import "./input.scss";
import { Text } from "..";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    error?: React.ReactNode
    inputClassName?: string
    className?: string
    icon?: React.ReactNode 
    leftIcon?: React.ReactNode
    inputContainerClassName?: string
    textarea?: boolean
    hint?:string 
}

export const initialInputClassName = "lfui-inputWrapper";

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ className, inputClassName, type, error, icon, leftIcon, inputContainerClassName, textarea,hint, ...props }, ref) => {
        const InputComponent = textarea ? 'textarea' : 'input';
        
        return (
            <label
                data-state={props.disabled ? "disabled" : undefined}
                className={clsx(`lfui-inputLabel`, className)}
            >
                <div className={clsx(initialInputClassName, inputContainerClassName, {'error': error})}>
                    {leftIcon}
                    <InputComponent
                        type={textarea ? undefined : type}
                        className={clsx(
                            "lfui-input",
                            inputClassName,
                            { 'lfui-textarea': textarea }
                        )}
                        ref={ref as any}
                        {...props}
                    />
                    {icon}
                </div>
                {error && (
                    <InputError message={error} />
                )}
                {hint && (
                    <Text size="medium" children={hint}/>
                )}
            </label>
        )
    }
)
Input.displayName = "Input"

export function InputError(props: {message: React.ReactNode, className?: string}){
    return (
        <div className={`lfui-inputError ${props.className ?? ""}`}>{props.message}</div>
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

// export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
// 	({ className, inputClassName, error, currency, ...props }, ref) => {
// 		const [lv, setLV] = React.useState<string>(() => (props.value?.toString() ?? ""));
// 		function reset(){
// 			let pv = props.value === null ? null : Number(props.value);
// 			let v = Number(lv);
// 			return pv !== v;
// 		}
// 		React.useLayoutEffect(() => {
// 			if(props.value === null){
// 				return;
// 			}
// 			if(reset()){
// 				setLV(props.value?.toString());
// 			}
// 		}, [props.value, lv]);
// 		const decimals = props.decimals ?? 2;
// 		return (
// 			<div className={`relative ${className ?? ''}`}>
// 				<input
// 					className={clsx(
// 						"flex relative h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
// 						inputClassName
// 					)}
// 					ref={ref}
// 					{...props}
// 					// temporary fix
// 					type={"number"}
// 					value={lv ?? ""}
// 					onBlur={ev => {
// 						if(reset()){
// 							setLV(props.value?.toString() ?? "");
// 						}
// 					}}
// 					onChange={ev => {
// 						if(ev.target.value.split(".")[1]?.length > decimals!){
// 							ev.preventDefault();
// 							return;
// 						}
// 						setLV(ev.target.value);
// 						if(ev.target.value === ""){
// 							props.onChange(null);
// 							return;
// 						}
// 						let val = Number(ev.target.value);
// 						if(!isNaN(val)){
// 							props.onChange(val);
// 						}
// 					}}
// 				/>
// 				{
// 					currency && (
// 						<div className="absolute right-5 top-1/2 [transform:translate(-50%,-50%)] text-neutral-800">USD</div>
// 					)
// 				}
// 				{error && (
// 					<div className="text-red-300 mt-2.5 mb-2.5">{error}</div>
// 				)}
// 			</div>
// 		)
// 	}
// )
// NumberInput.displayName = "NumberInput"
