import dateformat from 'dateformat';
import React, { Fragment } from "react";
import ReactDatePicker from "react-datepicker";
import { createPortal } from "react-dom";
import {
	Button,
	DropdownItem,
	ErrorMsg,
	Select,
	initialInputClassName,
	useToggle
} from '../';

/**
 * to work on ui
 * mixed raw css and tailwind ?
 *  */

import { cn } from '@/lib/utils';
import styles from "./date.module.scss";

const frmt = 'yyyy-mm-dd HH:MM:ss';

// we must validate the given property, it must match the given format
export type DatePickerProps = {
	onChange: (a: string | null) => void
	name?
	value: string | null
	error?: React.ReactNode
	displayFormat?: string
	popperPlacement?: "top-start"|"bottom"
	clearable?: boolean
	maxDate?: Date
	minDate?: Date
	className?: string
}
export function DatePicker({ name, error, value, clearable, ...props }: DatePickerProps) {
	const selected = React.useMemo(() => (value ? new Date(SafeDate(value)) : null), [value]);
	const [ref, refMenu, active, setIsOpen] = useToggle({followTargetWidth: false});
	return (
		<div className={props.className ?? ''}>
			<DatePickerInput
				ref={ref}
				clear={
					(clearable && value) ?
						function (event){
							setIsOpen(false);
							props.onChange(null);
						} : undefined
				}
			>
				{
					value ?
						dateformat(SafeDate(value), props.displayFormat) :
						value
				}
			</DatePickerInput>
			{
				active && (
					createPortal(
						<div ref={refMenu} className={styles.picker}>
							<ReactDatePicker
								{...props}
								inline
								selected={selected}
								renderCustomHeader={
									function (e) {
										return (
											<div className="react-datepicker__current-month" >
												<Left className="navigation" onClick={e.decreaseMonth} />
												<span className="label">
													{dateformat(SafeDate(e.date), `mmmm yyyy`)}
												</span>
												<Right className="navigation" onClick={e.increaseMonth} />
											</div>
										)
									}
								}
								onChange={
									function (value) {
										if (value) {
											value.setHours(0, 0, 0, 0);
											props.onChange(format(value));
										} else {
											props.onChange(null);
										}
									}
								}
							/>
						</div>,
						document.getElementById("modals")!
					)
				)
			}
			{
				error &&
				<ErrorMsg message={error} />
			}
		</div>
	);
}
DatePicker.defaultProps = {
	// valueFormat:'yyyy-mm-dd HH:MM:ss',
	// valueFormat:'yyyy-mm-dd',
	displayFormat: 'yyyy-mm-dd',
}

type RangeDatePickerComponentProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	append?: React.ReactNode
	onCancel: () => void
	disabled?: boolean
	onChange: (val: RangeDatePickerComponentProps["value"]) => void

	// styling props
	className?: string
	dateLabelClass?: string
	footerClass?: string
	cancelClass?: string
	actionClass?: string

}
export function RangeDatePickerCalendar(props: RangeDatePickerComponentProps) {

	const [tempvalue, tempChange] = React.useState(props.value);
	const today = React.useMemo(() => new Date(), []);

	const startDate = React.useMemo(
		() => {
			if (!tempvalue.startDate){
				return null;
			}
			let d = new Date(SafeDate(tempvalue.startDate));
			d.setHours(0, 0, 0, 0);
			return d;
		},
		[tempvalue.startDate]
	);
	const endDate = React.useMemo(
		() => {
			if (!tempvalue.endDate)
				return null;
			let d = new Date(SafeDate(tempvalue.endDate));
			d.setHours(23, 59, 59, 0);
			return d;
		},
		[tempvalue.endDate]
	);

	const [endDateHover, setEndDateHover] = React.useState<number | null>(null);

	const [v, sv] = React.useState(() => new Date());
	const R = React.useRef({
		left: undefined as any,
		right: undefined as any
	});

	const leftDate = React.useMemo(
		function () {
			let nd = new Date(SafeDate(v));
			nd.setDate(0);
			return nd;
		},
		[v]
	);

	function onDatePickerChange(date: Date) {
		let newValue: RangeDatePickerComponentProps["value"];
		// console.log(startDate)
		// if(!startDate){
		// 	date.setHours(0, 0, 0, 0);
		// } else {
		// 	date.setHours(23, 59, 59, 0);
		// }
		if (
			endDate ||
			!startDate ||
			// or the user selected earlier value than the pre selected start date
			(
				tempvalue.startDate &&
				(new Date(SafeDate(tempvalue.startDate)).getTime() > date.getTime())
			)
		) {
			date.setHours(0, 0, 0, 0);
			newValue = {
				endDate: null,
				startDate: format(date)
			};
		} else {
			setEndDateHover(null);
			date.setHours(23, 59, 59, 0);
			newValue = {
				startDate: tempvalue.startDate,
				endDate: format(date),
			};
		}
		tempChange(newValue);
	}

	function dayClassName(_day) {

		let dayStart = new Date(_day);
		dayStart.setHours(0, 0, 0, 0);
		let dayEnd = new Date(dayStart);
		dayEnd.setHours(23, 59, 59, 0);

		let stringNow = dateformat(SafeDate(dayStart), 'yyyy-mm-dd HH:MM:ss');
		let stringEnd = dateformat(SafeDate(dayEnd), 'yyyy-mm-dd HH:MM:ss');
		let className = `day-${dateformat(SafeDate(dayStart), 'yyyy-mm-dd')} `;
		let nowTime = dayStart.getTime();

		if (
			endDateHover && ((nowTime <= endDateHover) && (nowTime >= startDate!.getTime()))
		) {
			className += ' bg-slate-200 ';
		}

		if (
			(stringNow === tempvalue.startDate) ||
			(stringEnd === tempvalue.endDate)
		) {
			className += " edgeRange ";
		} else if ((dayStart > (startDate as Date)) && (dayStart < (endDate as Date))) {
			className += " in-range ";
		}
		return className;
	}

	function onMouseOver(event) {
		if (event.target.classList.contains('react-datepicker__day')) {
			let date = new Date(
				SafeDate(event.target.className.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g))
			);
			setEndDateHover(date.getTime());
		}
	}

	const active = React.useMemo(() => {
		let foudnValue = presets.find(val => {
			let value = generateFromValue(val.value);
			let compare = {
				startDate: dateformat(startDate, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(endDate, 'yyyy-mm-dd HH:MM:ss'),
			};
			return (value.startDate === compare.startDate)
				&& (value.endDate === compare.endDate);
		});
		return foudnValue?.value ?? "custom";
	}, [startDate, endDate]);

	const areEqual = (
		tempvalue.startDate === props.value.startDate &&
		tempvalue.endDate === props.value.endDate
	);

	return (
		<div className={`${cn(styles.range, styles.picker)} ${props.className ?? ''} [@media(max-width:764px)]:w-[300px] shadow-[0px_2px_20px_rgba(32,32,35,.13)]`}>
			<div className={"flex [@media(max-width:764px)]:flex-col"}>
				<div className='[@media(max-width:764px)]:order-2'>
					<div className={cn("flex [@media(max-width:764px)]:flex-col [@media(max-width:764px)]:max-h-[300px] [@media(max-width:764px)]:overflow-auto [@media(max-width:764px)]:pt-2 [@media(max-width:764px)]:border-t [@media(max-width:764px)]:border-neutral-200")} onMouseOver={(startDate && !endDate) ? onMouseOver : undefined} >
						<ReactDatePicker
							openToDate={leftDate}
							inline
							onChange={(date) => {
								onDatePickerChange(date!);
							}}
							dayClassName={dayClassName}
							renderCustomHeader={
								function (e) {
									R.current.left = e;
									return (
										<div className="react-datepicker__current-month" >
											<Left
												className={"navigation " + (e.prevMonthButtonDisabled ? 'disabled' : '')}
												onClick={
													function () {
														R.current.right.decreaseMonth();
														e.decreaseMonth()
													}
												}
											/>
											<span className="label">
												{dateformat(SafeDate(e.date), `mmmm yyyy`)}
											</span>
										</div>
									)
								}
							}
						/>
						<ReactDatePicker
							openToDate={v}
							onChange={(date) => {
								sv(date!);
								onDatePickerChange(date!);
							}}
							dayClassName={dayClassName}
							renderCustomHeader={
								function (e) {
									R.current.right = e;
									return (
										<div className="react-datepicker__current-month" >
											<span className="label">{dateformat(SafeDate(e.date), `mmmm yyyy`)}</span>
											<Right
												className={"navigation " + (e.nextMonthButtonDisabled ? 'disabled' : '')}
												onClick={
													function () {
														R.current.left.increaseMonth();
														e.increaseMonth();
													}
												}
											/>
										</div>
									)
								}
							}
							inline
							maxDate={today}
						/>
					</div>
					{ props.append }
				</div>
				{
					window.innerWidth < 425 ? (
						<Select
						  label='Select a date'
							options={presets}
							value={presets[0].label}
							onChange={
								function (value) {
									let val = generateFromValue(value);
									if(val){
										tempChange(val);
									}
								}
							}
						/>
					) : (
						<div className={"[@media(min-width:764px)]:border-l border-input [@media(max-width:764px)]:max-h-[220px] [@media(max-width:764px)]:overflow-auto [@media(max-width:764px)]:order-1"}>
							{
								presets.map((item) => (
									<DropdownItem 
										className={props.dateLabelClass ?? ''}
										key={item.label} 
										onClick={() => {
											let val = generateFromValue(item.value);
											if(val){
												tempChange(val);
												props.onChange(val);
											}
										}}
									>
										{item.label}
									</DropdownItem>
								))
							}
						</div>
					)
				}
			</div>
			<div className={`flex items-center justify-end gap-2 p-2 bg-accent ${props.footerClass ?? ''}`}>
				<Button 
					className={props.cancelClass ?? ''} 
					onClick={props.onCancel} 
					variant='outline'
				>
					Cancel
				</Button>
				<Button
					className={props.actionClass ?? ''} 
					disabled={props.disabled && areEqual}
					onClick={
						function () {
							let val = tempvalue;
							if(!tempvalue.endDate){
								let end = new Date(SafeDate(tempvalue.startDate!));
								end.setHours(23,59,59,0)
								val = {
									...tempvalue,
									endDate: format(end)
								};
							}
							props.onChange(val);
						}
					}
				>
					Apply
				</Button>
			</div>
		</div>
	)
}
RangeDatePickerCalendar.defaultProps = {
	// valueFormat:'yyyy-mm-dd HH:MM:ss',
	// valueFormat:'yyyy-mm-dd',
	disabled: true,
}

export type RangeDatePickerProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	onChange: (val: RangeDatePickerProps["value"]) => void
	clearable?: boolean
	inputClassName?: string
}
export function RangeDatePicker(props: RangeDatePickerProps) {
	const [ref, refMenu, isOpen, setIsOpen, ignore] = useToggle({placement: "bottom-start"});
	return (
		<Fragment>
			<div ref={ref}>
				<DatePickerInput
					clear={
						( props.value.startDate || props.value.endDate ) && props.clearable ? 
							function (){
								setIsOpen(false);
								props.onChange({
									startDate: null,
									endDate: null
								});
							} : undefined
					}	
				>
					<RangeDateLabel startDate={props.value.startDate} endDate={props.value.endDate} />
				</DatePickerInput>
			</div>
			{
				isOpen && (
					createPortal(
						<div
							ref={refMenu}
							onClick={
								function (event: any) {
									event.nativeEvent.ignoreToggleClick = (event.nativeEvent.ignoreToggleClick??[]).concat(refMenu.current);
								}
							}
						>
							<RangeDatePickerCalendar
								value={props.value}
								onChange={val => {
									props.onChange(val);
									setIsOpen(false);
								}}
								onCancel={() => {
									setIsOpen(false);
								}}
							/>
						</div>,
						document.getElementById("modals")!
					)
				)
			}
		</Fragment>
	)
}

export const RangeDateLabel = React.memo<{startDate: string|null, endDate: string|null}>(
	function RangeDateLabel(props) {
		let {startDate, endDate} = props;
		if(!startDate && !endDate){
			return null;
		}
		if(!startDate || !endDate){
			return (
				<Fragment>
					{!startDate && "- "}
					{dateformat(SafeDate((startDate || endDate)!), 'dd mmm yyyy')}
					{!endDate && " -"}
				</Fragment>
			)
		}
		let format = formatRangeDate(startDate, endDate);
		return (
			<Fragment>
				{
					format && (
						<Fragment>
							{dateformat( SafeDate(startDate), format )}
							{" "}-{" "}
						</Fragment>
					)
				}
				{dateformat(SafeDate(endDate), 'dd mmm yyyy')}
			</Fragment>
		)
	},
	(p, np) => ( (p.startDate === np.startDate) && (p.endDate === np.endDate) )
);

const DatePickerInput = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {clear?: (event: React.MouseEvent<HTMLOrSVGElement>) => void}>(
	function ({clear, ...props}, ref) {
		return (
			<div
				{...props}
				ref={ref}
				className={cn(initialInputClassName, "relative cursor-pointer flex items-center whitespace-nowrap", props.className)}
			>
				{props.children}
				{
					(clear) ?
					<Close
						className="absolute right-2 w-5 h-5 cursor-pointer"
						onClick={clear}
					/> : undefined
				}
			</div>
		)
	}
);
DatePickerInput.displayName = "DatePickerInput";

function Left (props: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <path d="M665.66 230.356c14.165 14.163 14.165 37.126 0 51.289L435.307 511.999 665.66 742.356c14.165 14.161 14.165 37.124 0 51.29-14.161 14.161-37.124 14.161-51.29 0l-255.998-256c-14.163-14.165-14.163-37.129 0-51.29L614.37 230.355c14.165-14.163 37.129-14.163 51.29 0z" />
	  </svg>
	)
}

function Right (props: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <path d="M358.372 230.356c-14.163 14.163-14.163 37.126 0 51.289l230.355 230.354-230.355 230.357c-14.163 14.161-14.163 37.124 0 51.29 14.163 14.161 37.126 14.161 51.289 0l255.999-256c14.165-14.165 14.165-37.129 0-51.29L409.661 230.355c-14.163-14.163-37.126-14.163-51.289 0z" />
	  </svg>
	)
}

function Close (props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <title />
	    <path d="M793.66 281.646c14.165-14.163 14.165-37.126 0-51.289-14.161-14.163-37.124-14.163-51.285 0L512.018 460.711 281.662 230.357c-14.163-14.163-37.126-14.163-51.289 0s-14.163 37.126 0 51.289L460.728 512 230.373 742.357c-14.163 14.161-14.163 37.124 0 51.29 14.163 14.161 37.126 14.161 51.289 0L512.018 563.29l230.357 230.357c14.161 14.161 37.124 14.161 51.285 0 14.165-14.165 14.165-37.129 0-51.29L563.307 512 793.66 281.646z" />
	  </svg>
	);
}

function CalendarIcon(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <title />
	    <path d="M718.95 85.334c0-20.029-16.239-36.267-36.267-36.267-20.032 0-36.267 16.237-36.267 36.267v49.067H377.574V85.334c0-20.029-16.237-36.267-36.267-36.267S305.04 65.304 305.04 85.334v49.067h-91.692c-67.158 0-121.6 54.442-121.6 121.6v597.332c0 67.157 54.442 121.6 121.6 121.6h597.334c67.157 0 121.6-54.443 121.6-121.6V256.001c0-67.158-54.443-121.6-121.6-121.6h-91.733V85.334zm140.8 305.067H164.283v-134.4c0-27.098 21.968-49.067 49.067-49.067h91.692v49.067c0 20.03 16.237 36.267 36.267 36.267s36.267-16.237 36.267-36.267v-49.067h268.842v49.067c0 20.03 16.235 36.267 36.267 36.267 20.028 0 36.267-16.237 36.267-36.267v-49.067h91.733c27.098 0 49.067 21.968 49.067 49.067v134.4zm-695.467 72.532H859.75v390.4c0 27.102-21.969 49.067-49.067 49.067H213.349c-27.099 0-49.067-21.965-49.067-49.067v-390.4z" />
	  </svg>
	)
}

export const presets = [
	{
		label: ('Today'),
		value: 'today',
	},
	{
		label: ('Yesterday'),
		value: 'yesterday',
	},
	{
		label: ('Last 7 days'),
		value: 'lastSeven',
	},
	{
		label: ("Last 14 days"),
		value: 'fourteen',
	},
	{
		label: ('Last 30 days'),
		value: 'lastThiry',
	},
	{
		label: ("Last 60 days"),
		value: 'lastSixty',
	},
	{
		label: ('Last 90 days'),
		value: 'lastNinety',
	},
	{
		label: ("Last 180 days"),
		value: 'lastOneEighty',
	},
	{
		label: ('Last year'),
		value: 'lastYear',
	},
] as const;

export function format(date: Date): string {
	return dateformat(SafeDate(date), `yyyy-mm-dd HH:MM:ss`);
}

export function SafeDate(v) {
  return (typeof v === 'string') ? v.replace(/-/g, "/") : v;
}

function generateFromValue(value: typeof presets[number]["value"]){
	let now = new Date();
	now.setHours(0, 0, 0, 0);
	switch(value){
		case 'today':{
			let _now = dateformat(now, frmt);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case 'yesterday':{
			now.setDate(now.getDate() - 1);
			let _now = dateformat(now, frmt);
			let end = new Date(now)
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt)
			};
			break;
		}
		case  'lastSeven':{
			let start = new Date(now);
			start.setDate(start.getDate() - 6);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case  'fourteen':{
			let start = new Date(now);
			start.setDate(start.getDate() - 13);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastThiry':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 29);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastSixty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 59)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastNinety':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 89)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastOneEighty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 179)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastYear':{
			let start = new Date();
			start.setHours(0, 0, 0, 0);
			start.setFullYear(start.getFullYear() - 1);
			start.setMonth(0,1);
			let end = new Date();
			end.setMonth(0,1);
			end.setHours(23, 59, 59, 0);
			end.setDate(0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
	}
}

export function formatRangeDate(startDate, endDate){
	let comareFormat = 'dd mmm, yyyy';
		let start = new Date(SafeDate(startDate)), end = new Date(SafeDate(endDate));
		if(start.getFullYear() === end.getFullYear()){
			comareFormat = 'dd mmm';
			if(start.getMonth() === end.getMonth()){
				comareFormat = "dd";
				if(start.getDate() === end.getDate()){
					comareFormat = "";
				}
			}
		}
	return comareFormat;
}
