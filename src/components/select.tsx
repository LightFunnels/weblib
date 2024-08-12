import React, { Fragment } from "react";
import { createPortal } from "react-dom";
 
import { DropdownItem, useToggle } from './';
import { cn } from '@/lib/utils';

/**
 * to work on this later
 * */

export type SelectComponentProps = {
	disabled?: boolean
	className?: string
	// mybe w will need to remove this readonly
	options: readonly {
		label: string | React.ReactNode
		value: string | boolean | number | undefined | null,
		disabled?: boolean
	}[]
	error?: string
	medium?: boolean
	onChange: (v) => void
	value: SelectComponentProps["options"][number]["value"] | null
	cancellable?: boolean
	label?: React.ReactNode
	labelClassName?: string
	actionLink?: React.ReactNode,
	isSearchable?: boolean
	menuClassName?: string
}

export const Select = React.forwardRef<HTMLDivElement, SelectComponentProps>(function ({ className, options, error, medium, ...props }, _ref) {

	const [ref, refMenu, active, setIsOpen] = useToggle();
	const selected = options.find(option => option.value === props.value);
	const [query, setQuery] = React.useState('');
	const Reg = React.useMemo(() => {
		return new RegExp(sanitizeStringForReg(query), 'ig');
	}, [query]);
	const ref1 = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

	React.useEffect(
		function () {
			if (active) {
				let elm = ref1.current[mapValueToKey(props.value)];
				if (elm) {
					elm.parentElement!.scrollTop = elm.offsetTop - (props.isSearchable ? 36 : 0);
				}
			}
		},
		[active]
	);

	return (
		<Fragment>
			<SelectLabel
				onClick={() => setIsOpen(true)}
				selected={selected?.label} {...props} ref={ref} active={active} medium={medium} 
			/>
			{
				active && (
					<MenuContainer 
						className={props.menuClassName ?? ''}
						ref={refMenu} 
						onClick={e => {
							if (props.isSearchable && refMenu && (typeof refMenu !== 'function')) {
								e.nativeEvent.ignoreToggleClick = (e.nativeEvent.ignoreToggleClick || []).concat(refMenu.current);
							}
						}}
					>
						{
							props.isSearchable && (
								<Search value={query} onChange={value => setQuery(value)} />
							)
						}
						{
							options.filter(el=> !query || el.value.toString().match(Reg)).map(
								option => {
									return (
										<DropdownItem
											key={option.value + '-' + option.label}
											ref={e => {
												ref1.current[mapValueToKey(option.value)] = e
											}}
											onClick={
												props.onChange && (
													() => {
														props.onChange(option.value);
														if(props.isSearchable){
																setIsOpen(false);
																setQuery("");
														}
													}
												)
											}
										>
											{option.label}
										</DropdownItem>
									)
								}
							)
						}
						{props.actionLink}
					</MenuContainer>
				)
			}
			{
				error && (
					<div className="text-red-400 mt-1">
						{error}
					</div>
				)
			}
		</Fragment>
	)
});
Select.displayName = "Select";

type SearchProps = {
	value: string
	onChange: (value: string) => void
}
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
	function Search(props: SearchProps, inputRef){
		const rf = React.useRef<HTMLInputElement>(null);
		React.useEffect(() => {
			rf.current!.focus();
		}, []);
		return (
			<div className="w-full" >
				<input
					type="text"
					value={props.value}
					className="block p-2 leading-4.5 w-full outline-none"
					onChange={e => props.onChange(e.target.value)}
					placeholder="Search"
					ref={rf}
				/>
			</div>
		)
	}
)

export function sanitizeStringForReg(q: string){
  return q.replace(/\\/g, "");
}
function mapValueToKey(v): string {
	if (v === undefined) {
		return 'undefined';
	} else if (v === null) {
		return 'null';
	} else {
		return v.toString();
	}
}

export const MenuContainer = React.forwardRef<HTMLDivElement, { onClick?: (ev) => void, className?: string, children: React.ReactNode }>(
	function (props, menuRef) {
		return createPortal(
			<div
				ref={menuRef}
				{...props}
				className={cn('absolute py-1 bg-white border shadow-[0px_2px_20px_rgba(32,32,35,.13)] border-neutral-200 rounded-md max-h-[380px] overflow-auto', props.className)} >
				{props.children}
			</div>,
			document.getElementById("modals")!
		)
	}
);
MenuContainer.displayName = "MenuContainer";

type SelectLabelProps = {
	disabled?: boolean
	onClick?: (e) => void
	onChange: (e) => void
	outOfCard?: boolean
	cancellable?: boolean
	selected?: React.ReactNode
	hasImage?: boolean
	image?: string
	label?: React.ReactNode
	labelClassName?: string
	active?: boolean
	medium?: boolean
	refMenu?: React.MutableRefObject<HTMLDivElement>
	// setIsOpen: (a: boolean) => void
	textLabelClassName?: string
}
export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
	function SelectLabel(props, labelRef) {
		return (
			<div
				onClick={!props.disabled ? props.onClick : undefined}
				ref={labelRef}
				className={cn(`rounded-md flex justify-between items-center border border-input h-[40px] bg-background px-3 cursor-pointer text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`, props.labelClassName ?? '')}
			>
				{/*<div className={`labelClickable ${props.cancellable && props.selected ? 'hasCancel' : ''}`} ref={labelRef} />*/}
				{/*{
					(props.selected && props.hasImage) && (
						<Avatar className="productImage" src={props.image} />
					)
				}*/}
				<span className={props.textLabelClassName ?? ''}>
					{props.selected || props.label || 'Select...'}
				</span>
				{
					(props.cancellable && props.selected) ? (
						<i
							className={`icon icon-X-Close text-lg`}
							onClick={
								function (event) {
									event.stopPropagation();
									// event.nativeEvent.ignoreToggleClick = (event.nativeEvent.ignoreToggleClick || []).conca( props.refMenu.current );
									props.onChange(null);
									// props.setIsOpen(false);
								}
							}
						/>
					) : (
						<i className={`icon icon-arrow-down text-lg`} />
					)
				}
			</div>
		)
	}
);

type AsyncSelectProps = {
	menuClassName?: string
	medium?: boolean
	onChange: (e) => void
	className?: string
	error?: React.ReactNode
	value: SelectComponentProps["options"][number]["value"] | null
}

export function Async({className, error, medium, ...props}: AsyncSelectProps){
	const [ref, refMenu, active, setIsOpen] = useToggle();
	const options = [];
	const selected = options.find(option => option.value === props.value);
	const [query, setQuery] = React.useState('');
	return (
		<Fragment>
			<SelectLabel
				onChange={props.onChange}
				onClick={() => setIsOpen(true)}
				selected={selected?.label}
				{...props}
				ref={ref}
				active={active}
				medium={medium} 
			/>
			{
				active && (
					<MenuContainer 
						className={props.menuClassName ?? ''}
						ref={refMenu} 
						onClick={e => {
							if (refMenu && (typeof refMenu !== 'function')) {
								e.nativeEvent.ignoreToggleClick = (e.nativeEvent.ignoreToggleClick || []).concat(refMenu.current);
							}
						}}
					>
						<Search value={query} onChange={value => setQuery(value)} />
						{/*{
							options.filter(el=> !query || el.value.toString().match(Reg)).map(
								option => {
									return (
										<DropdownItem
											key={option.value + '-' + option.label}
											ref={e => {
												ref1.current[mapValueToKey(option.value)] = e
											}}
											onClick={
												props.onChange && (
													() => {
														props.onChange(option.value);
														if(props.isSearchable){
																setIsOpen(false);
																setQuery("");
														}
													}
												)
											}
										>
											{option.label}
										</DropdownItem>
									)
								}
							)
						}*/}
						{/*{props.actionLink}*/}
					</MenuContainer>
				)
			}
		</Fragment>
	)
}

SelectLabel.displayName = "SelectLabel";

