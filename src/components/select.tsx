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
}
 
export const Select = React.forwardRef<HTMLDivElement, SelectComponentProps>(function ({ className, options, error, medium, ...props }, _ref) {
	let [ref, refMenu, active,setIsOpen] = useToggle();
	let selected = options.find(option => option.value === props.value);

	let ref1 = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
	let inputRef = React.useRef<HTMLInputElement>(null);

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

	React.useEffect(() => {
		if(props.isSearchable && active){
			inputRef.current!.focus();
		}
	}, [props.isSearchable, active]);

	function mapValueToKey(v): string {
		if (v === undefined) {
			return 'undefined';
		} else if (v === null) {
			return 'null';
		} else {
			return v.toString();
		}
	}
	const [query, setQuery] = React.useState('');
	const Reg = new RegExp(sanitizeStringForReg(query), 'ig'); 

	function filterSearch(input) {
		return !query || input.match(Reg);
	}

	return (
		<Fragment>
			<SelectLabel
				onClick={() => setIsOpen(true)}
				selected={selected?.label} {...props} ref={ref} active={active} medium={medium} />
			{
				active && (
					<MenuContainer 
						ref={refMenu} 
						onClick={e => {
							if (props.isSearchable && refMenu && (typeof refMenu !== 'function')) {
								e.nativeEvent.canceler = (e.nativeEvent.canceler || []).concat(refMenu.current);
							}
						}}
					>
						{/* naoufal: keep this wrapper .selectItemsContainer it uses flex-grow prop */}
						{/*{
							props.isSearchable && (
								<div className="inputContainer" >
								<i className="icon-search icon" />
								<input
									type="text"
									value={query}
									className="input"
									onChange={e => setQuery(e.target.value)}
									placeholder="Search"
									ref={inputRef}
								/>
							</div>
							)
						}*/}
							{
								options.filter(el=> filterSearch(el.label)).map(
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
		</Fragment>
	)
});
Select.displayName = "Select";

export function sanitizeStringForReg(q: string){
  return q.replace(/\\/g, "");
}

export const MenuContainer = React.forwardRef<HTMLDivElement, { onClick?: (ev) => void, className?: string, children: React.ReactNode }>(
	function (props, menuRef) {
		return createPortal(
			<div
				ref={menuRef}
				{...props}
				className={cn('absolute py-1 bg-white border border-neutral-100 rounded-md ', props.className)} >
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
				className={cn(`rounded-md flex justify-between items-center border border-input h-[40px] bg-background px-3 cursor-pointer text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`)}
			>
				{/*<div className={`labelClickable ${props.cancellable && props.selected ? 'hasCancel' : ''}`} ref={labelRef} />*/}
				{/*{
					(props.selected && props.hasImage) && (
						<Avatar className="productImage" src={props.image} />
					)
				}*/}
				<span>
					{props.selected || props.label || 'Select...'}
				</span>
				{
					(props.cancellable && props.selected) ? (
						<i
							className={`icon icon-X-Close text-lg`}
							onClick={
								function (event) {
									event.stopPropagation();
									// event.nativeEvent.canceler = (event.nativeEvent.canceler || []).conca( props.refMenu.current );
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
SelectLabel.displayName = "SelectLabel";