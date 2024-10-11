import React, { Fragment } from "react";
import { Button, DropdownItem, DropdownMenu, InputError, useToggle } from "../";
import { modals } from "../drop-down";
import { createPortal } from 'react-dom';

import "./select.scss";
 
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

export const Select = React.forwardRef<HTMLDivElement, SelectComponentProps>(function ({ labelClassName, options, error, medium, ...props }, _ref) {

	const [ref, refMenu, active, setIsOpen] = useToggle<HTMLButtonElement, HTMLDivElement>();
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
			<Button
				onClick={() => setIsOpen(true)}
				ref={ref}
				className={labelClassName}
				variant="secondary"
				children={
					<div className="lfui-dropdownLabelChildren">
						<div className="lfui-dropdown_selectedLabel">
							{selected?.label ?? "Select"}
						</div>
						{
							(props.cancellable && selected) ? (
								<i
									className={`icon-X-Close`}
									onClick={
										props.disabled ? undefined :
										function (event) {
											event.stopPropagation();
											// event.nativeEvent.ignoreToggleClick = (event.nativeEvent.ignoreToggleClick || []).conca( props.refMenu.current );
											props.onChange(null);
											// props.setIsOpen(false);
										}
									}
								/>
							) : <Down className="lfui-dropdownIcon" />
						}
					</div>
				}
				// selected={selected?.label}
				// cancellable={props.cancellable}
			/>
			{
				active && (
					createPortal(
						<DropdownMenu
							className={props.menuClassName ?? ''}
							ref={refMenu} 
							onClick={e => {
								// if (props.isSearchable && refMenu && (typeof refMenu !== 'function')) {
								// 	e.nativeEvent.ignoreToggleClick = (e.nativeEvent.ignoreToggleClick || []).concat(refMenu.current);
								// }
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
                        active={option.value === props.value}
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
						</DropdownMenu>,
						modals
					)
				)
			}
			{
				error && (
					<InputError message={error} />
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
			<input
				type="text"
				value={props.value}
				className="lfui-selectSearch"
				onChange={e => props.onChange(e.target.value)}
				placeholder="Search"
				ref={rf}
			/>
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

// type AsyncSelectValueType = Array<string|number>|ReadonlyArray<string|number>;

// type AsyncSelectProps = {
// 	disabled?: boolean
// 	menuClassName?: string
// 	medium?: boolean
// 	onChange: (e: AsyncSelectValueType) => void
// 	className?: string
// 	error?: React.ReactNode
// 	count?: number
// 	value: AsyncSelectValueType
// 	load<T extends DefaultPaginationVariables>(a: T): Observable<{pagination: Pagination}>
// 	limit?: number
// 	cancellable?: boolean
// }

// type DefaultPaginationVariables = {query: string, first: number};

// const def : Pagination = {
// 	edges: [],
// 	pageInfo:{
// 		hasNextPage: false,
// 		hasPreviousPage: false,
// 		startCursor: null,
// 		endCursor	: null,
// 	}
// };
// const notFoundMsg = "Not Found";


// export function AsyncSelect({className, error, medium, ...props}: AsyncSelectProps){

// 	const [ref, refMenu, active, setIsOpen, popper] = useToggle();
// 	const [query, setQuery] = React.useState('');
// 	const [loading, setLoading] = React.useState(false);
// 	const [key, setKey] = React.useState<number|null>(null);
// 	const [data, setData] = React.useState<Pagination>(def);
// 	const variables : DefaultPaginationVariables = React.useMemo(() => {
// 		return {query, first: props.count ?? 2};
// 	}, [query]);
// 	const refs = React.useRef({variables, data, initialised: false, timeout: null as any, active: active, subs: [] as Subscription[]});
// 	const edges = data.edges as Edge[];
// 	const [selected, setSelected] = React.useState<Edge["node"][]>([]);
// 	const limit = props.limit ?? 1;
// 	const isSingle = limit === 1;

// 	function onChange(value: AsyncSelectProps["value"]){
// 		// apply limit
// 		if(props.disabled){
// 			return;
// 		}
// 		props.onChange(value.slice(-limit));
// 		if(active){
// 			popper.current!.update();
// 		}
// 	}

// 	// console.log(refs.current.subs)

// 	function load(variables: DefaultPaginationVariables){
// 		setLoading(true);
// 		refs.current.variables = variables;
// 		let sub : Subscription;
// 		props.load({...variables, after: data.pageInfo.endCursor})
// 			.subscribe({
// 				start(_sub){
// 					sub = _sub;
// 					refs.current.subs.push(_sub);
// 					setLoading(true);
// 				},
// 				complete(){
// 					setLoading(false);
// 				},
// 				next(res){
// 					if(!refs.current.active){
// 						return;
// 					}
// 					refs.current.initialised = true;
// 					setData(cd => {
// 						return {
// 							...cd,
// 							...res.pagination,
// 							edges: cd.edges.concat(res.pagination.edges)
// 						}
// 					});
// 				},
// 				unsubscribe(sub){
// 					refs.current.subs = lodash.without(refs.current.subs, sub);
// 				},
// 				error(error){
// 					setLoading(false);
// 				}
// 			});
// 	}

// 	React.useEffect(() => {
// 		if(active){

// 			const isDir = !lodash.isEqual(refs.current.variables, variables);

// 			if(isDir && (data.pageInfo.endCursor !== null)){
// 				setData(def);
// 				setKey(Math.random());
// 				return;
// 			}

// 			if(refs.current.timeout){
// 				clearTimeout(refs.current.timeout);
// 			}

// 			refs.current.timeout = setTimeout(() => {
// 				load(variables);
// 			}, 300);

// 			return () => {
// 				// unsub
// 			}
// 		}
// 	}, [active, variables, key]);

// 	React.useEffect(() => {
// 		refs.current.active = active;
// 		if(active){
// 			return () => {
// 				refs.current.subs.forEach(sub => {
// 					sub.unsubscribe();
// 				});
// 				if(refs.current.timeout){
// 					clearTimeout(refs.current.timeout);
// 				}
// 				setQuery("");
// 				setLoading(false);
// 				refs.current.initialised = false;
// 				setData(def);
// 			}
// 		}
// 	}, [active]);

// 	React.useEffect(() => {
// 		if(props.value.length){
// 			let sub: Subscription;
// 			props.load({first: props.value.length, query: "", ids: props.value})
// 				.subscribe({
// 					start(_sub){
// 						sub = _sub;
// 					},
// 					next(res){
// 						setSelected(
// 							res.pagination.edges
// 								.map(item => item.node)
// 								.filter((node) : node is any => ("value" in node) && (props.value.includes(node.value)))
// 						);
// 					}
// 				});
// 			return () => {
// 				if(sub){
// 					sub.unsubscribe();
// 				}
// 			}
// 		} else if(selected.length) {
// 			setSelected([]);
// 		}
// 	}, [props.value]);

// 	return (
// 		<div>
// 			<SelectLabel
// 				disabled={props.disabled}
// 				onClick={() => setIsOpen(true)}
// 				label={
// 					isSingle ?
// 						(selected.find(node => node.value === props.value[0])?.label ?? <span className="text-destructive">{notFoundMsg}</span>) :
// 						undefined
// 				}
// 				cancellable={props.cancellable}
// 				onCancel={() => {
// 					onChange([]);
// 				}}
// 				ref={isSingle ? ref : undefined}
// 			/>
// 			{
// 				!isSingle && (
// 					<div ref={ref} className="flex gap-2 mt-2 flex-wrap">
// 						{
// 							props.value.length === 0 ? (
// 								<Text children="No items are selected" />
// 							):
// 							props.value.map(id => {
// 								const item = selected.find(node => node.value === id);
// 								return (
// 									<span key={id} className={"flex items-center rounded-md px-2 py-1 " + (item ? "bg-primary" : "bg-destructive")}>
// 										{
// 											item ?
// 												<Text className="text-nowrap text-primary-foreground">
// 													{item.label}
// 												</Text> : 
// 												<Text className="text-nowrap text-destructive-foreground">
// 													{notFoundMsg}
// 												</Text>
// 										}
// 										<Close
// 											className={"w-5 ml-1 cursor-pointer " + (item ? "fill-primary-foreground" : "fill-destructive-foreground")}
// 											onClick={() => {
// 												onChange(props.value.filter(_id => _id !== id));
// 											}} />
// 									</span>
// 								)
// 							})
// 						}
// 					</div>
// 				)
// 			}
// 			{
// 				active && (
// 					<MenuContainer 
// 						className={(props.menuClassName ?? '') + " max-h-[250px] pt-0"}
// 						ref={refMenu} 
// 						onClick={e => {
// 							if (refMenu && (typeof refMenu !== 'function')) {
// 								e.nativeEvent.ignoreToggleClick = (e.nativeEvent.ignoreToggleClick || []).concat(refMenu.current);
// 							}
// 						}}
// 					>
// 						<Search className="sticky top-0 border-b border-neutral-200" value={query} onChange={value => setQuery(value)} />
// 						{
// 							edges.map(
// 								edge => {
// 									const option = edge.node;
// 									return (
// 										<DropdownItem
// 											key={option.value + '-' + option.label}
// 											onClick={
// 												() => {
// 													if(props.value.includes(option.value)){
// 														onChange(props.value.filter(item => item !== option.value));
// 													} else {
// 														onChange(props.value.concat(option.value));
// 													}
// 												}
// 											}
// 										>
// 											{option.label}
// 										</DropdownItem>
// 									)
// 								}
// 							)
// 						}
// 						{
// 							loading ?
// 							<LoadingSpinner size="sm" className="mt-1" /> :
// 							(
// 								refs.current.initialised &&
// 								data.pageInfo.hasNextPage &&
// 								<div className="text-center p-2">
// 									<LinkText
// 										children="Load More"
// 										onClick={() => {
// 											if(loading) return;
// 											load(variables);
// 										}}
// 									/>
// 								</div>
// 							)
// 						}
// 					</MenuContainer>
// 				)
// 			}
// 		</div>
// 	)
// }

// type Edge = {
// 	node: {
// 		__typename: string
// 		label: string
// 		value: string|number
// 	}
// 	cursor: string
// }

// type NonTypedEdge = {
// 	node: {
// 		__typename: string
// 	}
// 	cursor: string
// }

// type Pagination = {
// 	edges: ReadonlyArray<Edge|NonTypedEdge>
// 	pageInfo:{
// 	  hasNextPage: boolean
// 	  hasPreviousPage: boolean
// 	  startCursor: string|null
// 	  endCursor: string|null
// 	}
// }

// SelectLabel.displayName = "SelectLabel";

export function Down(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
		<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={"lucide lucide-chevron-down " + (props.className ?? "")}
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
	)
}
