import lodash from "lodash";
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { Subscription } from "relay-runtime";
 
import { cn } from '@/lib/utils';
import { DropdownItem, LinkText, LoadingSpinner, useToggle } from './';

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
							options.filter(el=> !query || el.value?.toString()?.match(Reg)).map(
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
	className?: string
	onChange: (value: string) => void
}
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
	function Search(props: SearchProps, inputRef){
		const rf = React.useRef<HTMLInputElement>(null);
		React.useEffect(() => {
			rf.current!.focus();
		}, []);
		return (
			<div className={"w-full " + (props.className ?? "")} >
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
	count?: number
	value: SelectComponentProps["options"][number]["value"] | null
	load<T extends DefaultPaginationVariables>(a: T, registerUnsub: (re: Subscription|null) => void): Promise<Pagination>
}

type DefaultPaginationVariables = {query: string, first: number};

const def : Pagination = {
	edges: [],
	pageInfo:{
		hasNextPage: false,
		hasPreviousPage: false,
		startCursor: null,
		endCursor	: null,
	}
};

export function Async({className, error, medium, ...props}: AsyncSelectProps){

	const [ref, refMenu, active, setIsOpen] = useToggle();
	const [query, setQuery] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [key, setKey] = React.useState<number|null>(null);
	const [data, setData] = React.useState<Pagination>(def);
	const variables : DefaultPaginationVariables = React.useMemo(() => {
		return {query, first: props.count ?? 2};
	}, [query]);
	const argsRef = React.useRef({variables, data, initialised: false, timeout: null as any, sub: null as Subscription|null, active: active});
	const selected = data.edges.find(edge => edge.node.value === props.value)?.node;

	function load(variables: DefaultPaginationVariables){
		setLoading(true);
		argsRef.current.variables = variables;
		props.load({...variables, after: data.pageInfo.endCursor}, (sub) => {argsRef.current.sub = sub;})
			.then(res => {
				if(!argsRef.current.active){
					return;
				}
				argsRef.current.initialised = true;
				setData(cd => {
					return {
						...cd,
						...res,
						edges: cd.edges.concat(res.edges)
					}
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}

	React.useEffect(() => {
		if(active){

			if(argsRef.current.timeout){
				clearTimeout(argsRef.current.timeout);
			}

			const isDir = !lodash.isEqual(argsRef.current.variables, variables);

			if(isDir && (data.pageInfo.endCursor !== null)){
				setData(def);
				setKey(Math.random());
				return;
			}

			argsRef.current.timeout = setTimeout(() => {
				load(variables);
			}, 300);

			return () => {
				// unsub
			}
		}
	}, [active, variables, key]);

	React.useEffect(() => {
		argsRef.current.active = active;
		if(active){
			return () => {
				if(argsRef.current.sub){
					argsRef.current.sub.unsubscribe();
				}
				if(argsRef.current.timeout){
					clearTimeout(argsRef.current.timeout);
				}
				setQuery("");
				setLoading(false);
				argsRef.current.initialised = false;
				setData(def);
			}
		}
	}, [active]);

	return (
		<Fragment>
			<SelectLabel
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
						className={(props.menuClassName ?? '') + " max-h-[250px] pt-0"}
						ref={refMenu} 
						onClick={e => {
							if (refMenu && (typeof refMenu !== 'function')) {
								e.nativeEvent.ignoreToggleClick = (e.nativeEvent.ignoreToggleClick || []).concat(refMenu.current);
							}
						}}
					>
						<Search className="sticky top-0 border-b border-neutral-200" value={query} onChange={value => setQuery(value)} />
						{
							data.edges.map(
								edge => {
									const option = edge.node;
									return (
										<DropdownItem
											key={option.value + '-' + option.label}
											onClick={
												() => {
													props.onChange(option.value);
												}
											}
										>
											{option.label}
										</DropdownItem>
									)
								}
							)
						}
						{
							argsRef.current.initialised &&
							data.pageInfo.hasNextPage &&
							<div className="text-center p-2">
								{
									loading &&
									<LoadingSpinner size="sm" />
								}
								<LinkText
									children="Load More"
									onClick={() => {
										if(loading) return;
										load(variables);
									}}
								/>
							</div>
						}
					</MenuContainer>
				)
			}
		</Fragment>
	)
}

type Pagination = {
	edges: readonly {
		node: {
			label: string
			value: string|number
		}
		cursor: string
	}[]
	pageInfo:{
	  hasNextPage: boolean
	  hasPreviousPage: boolean
	  startCursor: string|null
	  endCursor: string|null
	}
}

SelectLabel.displayName = "SelectLabel";

