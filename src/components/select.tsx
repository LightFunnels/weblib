import lodash from "lodash";
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { Subscription, Observable } from "relay-runtime";
 
import { cn } from '@/lib/utils';
import { DropdownItem, LinkText, LoadingSpinner, useToggle, Text, Close } from './';

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
				selected={selected?.label} {...props} ref={ref}
				cancellable={props.cancellable}
				onCancel={() => {
					props.onChange(null);
				}}
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
	onCancel: () => void
	outOfCard?: boolean
	cancellable?: boolean
	selected?: React.ReactNode
	hasImage?: boolean
	image?: string
	label?: React.ReactNode
	labelClassName?: string
	refMenu?: React.MutableRefObject<HTMLDivElement>
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
					{props.selected || props.label || 'Select Item'}
				</span>
				{
					(props.cancellable && props.selected) ? (
						<i
							className={`icon icon-X-Close text-lg`}
							onClick={
								function (event) {
									event.stopPropagation();
									// event.nativeEvent.ignoreToggleClick = (event.nativeEvent.ignoreToggleClick || []).conca( props.refMenu.current );
									props.onCancel();
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

type AsyncSelectValueType = Array<string|number>|ReadonlyArray<string|number>;

type AsyncSelectProps = {
	menuClassName?: string
	medium?: boolean
	onChange: (e: AsyncSelectValueType) => void
	className?: string
	error?: React.ReactNode
	count?: number
	value: AsyncSelectValueType
	load<T extends DefaultPaginationVariables>(a: T): Observable<{pagination: Pagination}>
	limit?: number
	cancellable?: boolean
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

export function AsyncAsync({className, error, medium, ...props}: AsyncSelectProps){

	const [ref, refMenu, active, setIsOpen, popper] = useToggle();
	const [query, setQuery] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [key, setKey] = React.useState<number|null>(null);
	const [data, setData] = React.useState<Pagination>(def);
	const variables : DefaultPaginationVariables = React.useMemo(() => {
		return {query, first: props.count ?? 2};
	}, [query]);
	const refs = React.useRef({variables, data, initialised: false, timeout: null as any, active: active, subs: [] as Subscription[]});
	const edges = data.edges as Edge[];
	const [selected, setSelected] = React.useState<Edge["node"][]>([]);
	const limit = props.limit ?? 1;
	const isSingle = limit === 1;

	function onChange(value: AsyncSelectProps["value"]){
		// apply limit
		props.onChange(value.slice(-limit));
		if(active){
			popper.current!.update();
		}
	}

	// console.log(refs.current.subs)

	function load(variables: DefaultPaginationVariables){
		setLoading(true);
		refs.current.variables = variables;
		let sub : Subscription;
		props.load({...variables, after: data.pageInfo.endCursor})
			.subscribe({
				start(_sub){
					sub = _sub;
					refs.current.subs.push(_sub);
					setLoading(true);
				},
				complete(){
					setLoading(false);
				},
				next(res){
					if(!refs.current.active){
						return;
					}
					refs.current.initialised = true;
					setData(cd => {
						return {
							...cd,
							...res.pagination,
							edges: cd.edges.concat(res.pagination.edges)
						}
					});
				},
				unsubscribe(sub){
					refs.current.subs = lodash.without(refs.current.subs, sub);
				},
				error(error){
					setLoading(false);
				}
			});
	}

	React.useEffect(() => {
		if(active){

			const isDir = !lodash.isEqual(refs.current.variables, variables);

			if(isDir && (data.pageInfo.endCursor !== null)){
				setData(def);
				setKey(Math.random());
				return;
			}

			if(refs.current.timeout){
				clearTimeout(refs.current.timeout);
			}

			refs.current.timeout = setTimeout(() => {
				load(variables);
			}, 300);

			return () => {
				// unsub
			}
		}
	}, [active, variables, key]);

	React.useEffect(() => {
		refs.current.active = active;
		if(active){
			return () => {
				refs.current.subs.forEach(sub => {
					sub.unsubscribe();
				});
				if(refs.current.timeout){
					clearTimeout(refs.current.timeout);
				}
				setQuery("");
				setLoading(false);
				refs.current.initialised = false;
				setData(def);
			}
		}
	}, [active]);

	React.useEffect(() => {
		if(props.value.length){
			let sub: Subscription;
			props.load({first: props.value.length, query: "", ids: props.value})
				.subscribe({
					start(_sub){
						sub = _sub;
					},
					next(res){
						setSelected(
							res.pagination.edges
								.map(item => item.node)
								.filter((node) : node is any => ("value" in node) && (props.value.includes(node.value)))
						);
					}
				});
			return () => {
				if(sub){
					sub.unsubscribe();
				}
			}
		} else if(selected.length) {
			setSelected([]);
		}
	}, [props.value]);

	return (
		<div>
			<SelectLabel
				onClick={() => setIsOpen(true)}
				label={
					isSingle ?
						selected.find(node => node.value === props.value[0])?.label :
						undefined
				}
				cancellable={props.cancellable}
				onCancel={() => {
					onChange([]);
				}}
				ref={isSingle ? ref : undefined}
			/>
			{
				!isSingle && (
					<div ref={ref} className="flex gap-2 mt-2 flex-wrap">
						{
							props.value.length === 0 ? (
								<Text children="No items are selected" />
							):
							props.value.map(id => {
								const item = selected.find(node => node.value === id);
								return (
									<span key={id} className="bg-primary flex items-center rounded-md px-2 py-1">
										<Text className="text-nowrap text-primary-foreground">
											{item ? item.label : "Not Found"}
										</Text>
										<Close
											className="w-5 ml-1 cursor-pointer fill-primary-foreground"
											onClick={() => {
												onChange(props.value.filter(_id => _id !== id));
											}} />
									</span>
								)
							})
						}
					</div>
				)
			}
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
							edges.map(
								edge => {
									const option = edge.node;
									return (
										<DropdownItem
											key={option.value + '-' + option.label}
											onClick={
												() => {
													if(props.value.includes(option.value)){
														onChange(props.value.filter(item => item !== option.value));
													} else {
														onChange(props.value.concat(option.value));
													}
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
							loading ?
							<LoadingSpinner size="sm" className="mt-1" /> :
							(
								refs.current.initialised &&
								data.pageInfo.hasNextPage &&
								<div className="text-center p-2">
									<LinkText
										children="Load More"
										onClick={() => {
											if(loading) return;
											load(variables);
										}}
									/>
								</div>
							)
						}
					</MenuContainer>
				)
			}
		</div>
	)
}

type Edge = {
	node: {
		__typename: string
		label: string
		value: string|number
	}
	cursor: string
}

type NonTypedEdge = {
	node: {
		__typename: string
	}
	cursor: string
}

type Pagination = {
	edges: ReadonlyArray<Edge|NonTypedEdge>
	pageInfo:{
	  hasNextPage: boolean
	  hasPreviousPage: boolean
	  startCursor: string|null
	  endCursor: string|null
	}
}

SelectLabel.displayName = "SelectLabel";

