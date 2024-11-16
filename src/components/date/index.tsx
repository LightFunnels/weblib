import clsx from 'clsx';
import dateformat from 'dateformat';
import React, { Fragment } from "react";
import ReactDatePicker, {ReactDatePickerCustomHeaderProps} from "react-datepicker";
import { createPortal } from "react-dom";
import {
	Button,
	DropdownItem,
	InputError,
	Select,
	usePopover
} from '../';
import {
	CalendarIcon,
	Close,
	Left,
	Right
} from "../icons";
import styles from "./date.scss";
import { modals } from "../drop-down";
import {
	SafeDate,
	format,
	formatRangeDate,
	generateFromValue,
	presets
} from "./utils";

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
	const [ref, refMenu, active, setIsOpen] = usePopover<HTMLButtonElement, HTMLDivElement>({
		followTargetWidth: false,
	});
	const displayFormat = props.displayFormat ?? "yyyy-mm-dd";

	function renderDayContents(day: number, date: Date) {

		function dayClassName() {

			let className = ` lfui-datepickerDay `;

			if(
				(date.getMonth() === selected?.getMonth()) &&
				(date.getDate() === selected.getDate())
			){
				className += "lfui-datepickerDay_edgeRange ";
			}

			return className;

		}

		return (
			<div
				className={dayClassName()}
				tabIndex={-1}
				aria-label={"Choose " + date.toString()}
				role="option"
				title=""
				aria-disabled="false"
				aria-selected="false">{day}</div>
		)
	}

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
						dateformat(SafeDate(value), displayFormat) :
						value
				}
			</DatePickerInput>
			{
				active && (
					createPortal(
						<div ref={refMenu} className={"lfui-datepickerModal"}>
							<ReactDatePicker
								{...props}
								renderDayContents={renderDayContents}
								inline
								selected={selected}
								renderCustomHeader={
									function (e) {
										return (
											<div className="lfui-datepickerHeaderMonth" >
												<Left className="lfui-datepickerNavigation" onClick={e.decreaseMonth} />
												<span className="lfui-datepickerHeaderMonthLabel">
													{dateformat(SafeDate(e.date), `mmmm yyyy`)}
												</span>
												<Right className="lfui-datepickerNavigation" onClick={e.increaseMonth} />
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
						modals
					)
				)
			}
			{
				error &&
				<InputError message={error} />
			}
		</div>
	);
}

type RangeDatePickerComponentProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	onCancel: () => void
	disabled?: boolean
	onChange: (val: RangeDatePickerComponentProps["value"]) => void

	// styling props
	className?: string
	footerClass?: string
	dateItemClass?: string
	actionBtnClass?: string
	cancelBtnClass?: string
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

	const R = React.useRef<{left: ReactDatePickerCustomHeaderProps, right: ReactDatePickerCustomHeaderProps}>({});

	const leftDate = React.useMemo(
		function () {
			let nd = new Date(SafeDate(v));
			nd.setDate(0);
			return nd;
		},
		[v]
	);

	const [currentLeftMnth, setCurrentLeftMnth] = React.useState(() => leftDate.getMonth());

	function onDatePickerChange(date: Date) {
		let newValue: RangeDatePickerComponentProps["value"];
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

	const propsDisabled = props.disabled ?? true;

	function renderDayContents(day: number, date: Date, cm: number) {

		function dayClassName(_day: Date) {

			let className = `lfui-datepickerDay `;

			// thiw will exclude outside month days
			if(_day.getMonth() !== cm){
				return className;
			}

			let dayStart = new Date(_day);
			dayStart.setHours(0, 0, 0, 0);
			let dayEnd = new Date(dayStart);
			dayEnd.setHours(23, 59, 59, 0);

			/* to refactor this and depend on date functions directly instead of converting to string - performance++ */
			let stringNow = dateformat(SafeDate(dayStart), 'yyyy-mm-dd HH:MM:ss');
			let stringEnd = dateformat(SafeDate(dayEnd), 'yyyy-mm-dd HH:MM:ss');
			let nowTime = dayStart.getTime();

			if (
				endDateHover && ((nowTime <= endDateHover) && (nowTime >= startDate!.getTime()))
			) {
				className += ' lfui-datepickerDay_inSelectingRange ';
			}

			if (
				(stringNow === tempvalue.startDate) ||
				(stringEnd === tempvalue.endDate)
			) {
				className += " lfui-datepickerDay_edgeRange ";
			} else if ((dayStart > startDate) && (dayStart < endDate)) {
				className += " lfui-datepickerDay_inRange ";
			}

			return className;
		}

		return (
			<div
				onMouseEnter={(startDate && !endDate) ? () => {
					setEndDateHover(date.getTime())
				} : undefined}
				className={dayClassName(date)}
				tabIndex={-1}
				aria-label={"Choose " + date.toString()}
				role="option"
				title=""
				aria-disabled="false"
				aria-selected="false">{day}</div>
		)
	}

	function adjustOutside(d: Date){
		setCurrentLeftMnth(d.getMonth())
	}

	return (
		<div className={clsx(styles.range, "lfui-datepickerModal", props.className)}>
			<div className={"lfui-rangeDatepickerBody"}>
				<div className='lfui-rangeDatePickerCalendars' >
					<ReactDatePicker
						onMonthChange={adjustOutside}
						openToDate={leftDate}
						inline
						renderDayContents={(day, date) => {
							return renderDayContents(day, date, currentLeftMnth)
						}}
						onChange={(date) => {
							onDatePickerChange(date!);
						}}
						renderCustomHeader={
							function (e) {
								R.current.left = e;
								return (
									<div className="lfui-datepickerHeaderMonth" >
										<Left
											className={"lfui-datepickerNavigation " + (e.prevMonthButtonDisabled ? 'disabled' : '')}
											onClick={
												function () {
													R.current.right.decreaseMonth();
													e.decreaseMonth()
												}
											}
										/>
										<span className="lfui-datepickerHeaderMonthLabel">
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
						renderDayContents={(day, date) => {
							return renderDayContents(day, date, currentLeftMnth+1)
						}}
						renderCustomHeader={
							function (e) {
								R.current.right = e;
								return (
									<div className="lfui-datepickerHeaderMonth" >
										<span className="lfui-datepickerHeaderMonthLabel">{dateformat(SafeDate(e.date), `mmmm yyyy`)}</span>
										<Right
											className={"lfui-datepickerNavigation " + (e.nextMonthButtonDisabled ? 'disabled' : '')}
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
				<Select
				  label='Select a date'
          className='lfui-rangeDatePickerSelect'
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
				<div className={"lfui-rangeDatePickerSidebar"}>
					{
						presets.map((item) => (
							<DropdownItem 
								className={props.dateItemClass ?? ''}
                active={active === item.value}
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
			</div>
			<div className={`lfui-rangeDatePickerFooter ${props.footerClass ?? ''}`}>
				<Button 
					onClick={props.onCancel} 
					variant='secondary'
					className={props.cancelBtnClass ?? ''}
				>
					Cancel
				</Button>
				<Button
					disabled={propsDisabled && areEqual}
					className={props.actionBtnClass ?? ''}
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

export type RangeDatePickerProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	onChange: (val: RangeDatePickerProps["value"]) => void
	clearable?: boolean
	
	// styling props
	dateItemClass?: string
	dateLabelIcon?: React.ReactNode
	dateInputClass?: string 

	actionBtnClass?: string
	cancelBtnClass?: string
	footerClass?: string
	datePickerContainerClass?: string
}
export function RangeDatePicker(props: RangeDatePickerProps) {
	const [ref, refMenu, isOpen, setIsOpen, ignore] = usePopover<HTMLDivElement, HTMLDivElement>({
		placement: "bottom-start",
		testClose(event){
			if(refMenu.current.contains(event.target as HTMLElement)){
				return false;
			}
			return true;
		}
	});
	return (
		<Fragment>
			<div ref={ref}>
				<DatePickerInput
					className={props.dateInputClass ?? ''}
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
					<RangeDateLabel icon={props.dateLabelIcon} startDate={props.value.startDate} endDate={props.value.endDate} />
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
								className={props.datePickerContainerClass ?? ''}
								footerClass={props.footerClass ?? ''}
								actionBtnClass={props.actionBtnClass ?? ''}
								cancelBtnClass={props.cancelBtnClass ?? ''}
								dateItemClass={props.dateItemClass}
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
						modals
					)
				)
			}
		</Fragment>
	)
}

export const RangeDateLabel = React.memo<{icon?: React.ReactNode, className?: string, startDate: string|null, endDate: string|null}>(
	function RangeDateLabel(props) {
		let {startDate, icon, endDate} = props;
		if(!startDate && !endDate){
			return null;
		}
		if(!startDate || !endDate){
			return (
				<div className={props.className ?? ''}>
					{icon}
					{!startDate && "- "}
					{dateformat(SafeDate((startDate || endDate)!), 'dd mmm yyyy')}
					{!endDate && " -"}
				</div>
			)
		}
		let format = formatRangeDate(startDate, endDate);
		return (
			<Fragment>
				{
					format && (
						<Fragment>
							{icon}
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

const DatePickerInput = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement> & {clear?: (event: React.MouseEvent<HTMLOrSVGElement>) => void}>(
	function ({clear, ...props}, ref) {
		return (
			<Button
				{...props}
				ref={ref}
				variant="secondary"
				children={
					<div className="lfui-dropdownLabelChildren">
            <CalendarIcon className='lfui-datepickerCalendarIcon'/>
            {
            	props.children &&
							<div>
								{props.children}
							</div>
            }
						{
							clear && 
							<Close
								className="lfui-dropdownIcon"
								onClick={clear}
							/>
						}
					</div>
				}
			/>
		)
	}
);
DatePickerInput.displayName = "DatePickerInput";

