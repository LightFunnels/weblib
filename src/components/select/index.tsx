import { cx } from "class-variance-authority";
import React, { Fragment } from "react";
import { createPortal } from 'react-dom';
import { Badge, Button, Divider, DropdownItem, DropdownMenu, InputError, InputWrapper, LinkText, Spinner as LoadingSpinner, Text, modals, usePopover } from "../";
import { Close, Down, SearchIcon } from "../icons";
import { mapValueToKey, sanitizeStringForReg } from "./utils";

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
	onChange: (v) => void
	value: SelectComponentProps["options"][number]["value"] | null
	cancellable?: boolean
	label?: React.ReactNode
	labelClassName?: string
	actionLink?: React.ReactNode,
	isSearchable?: boolean
	menuClassName?: string
}

export const Select = React.forwardRef<HTMLDivElement, SelectComponentProps>(function ({ labelClassName, options, error, ...props }, _ref) {

	const [ref, refMenu, active, setIsOpen] = usePopover<HTMLButtonElement, HTMLDivElement>({
		testClose(event){
			if(refMenu.current.contains(event.target as HTMLElement)){
				return false;
			}
			return true;
		}
	});
	const selected = options.find(option => option.value === props.value);
	const [query, setQuery] = React.useState('');
	const Reg = React.useMemo(() => {
		return new RegExp(sanitizeStringForReg(query), 'ig');
	}, [query]);
	const ref1 = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
	const inputRef = React.useRef<HTMLInputElement>(null);

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
		<div className={cx("lfui-select", props.className)}>
			<Button
				onClick={() => setIsOpen(true)}
				ref={ref}
				className={labelClassName}
				variant="secondary"
				children={
					<Fragment>
						{selected?.label ?? "Select"}
						{
							(props.cancellable && selected) ? (
								<Close
									className={"lfui-cancelIcon"}
									onClick={
										props.disabled ? undefined :
										function (event) {
											event.stopPropagation();
											props.onChange(null);
										}
									}
								/>
							) : <Down className="lfui-dropdownIcon" />
						}
					</Fragment>
				}
			/>
			{
				active && (
					createPortal(
						<DropdownMenu
							className={cx(props.menuClassName)}
							ref={refMenu}
							header={
								props.isSearchable && (
									<Search ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} />
								)
							}
						>
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
		</div>
	)
});
Select.displayName = "Select";

const Search = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof InputWrapper>>(
	function Search(props, ref: React.MutableRefObject<HTMLInputElement>){
		React.useEffect(() => {
			// TODO, listen to popover end instead
			let i = setTimeout(() => {
				ref.current.focus();
			});
			return () => {
				clearTimeout(i);
			}
		}, []);
		return (
			<Fragment>
				<InputWrapper {...props} leftIcon={<SearchIcon />} ref={ref} inputContainerClassName="lfui-selectSearch" />
				<Divider/>
			</Fragment>
		)
	}
);

type AsyncSelectValueType = Array<string|number>|ReadonlyArray<string|number>;

type AsyncSelectProps = {
	disabled?: boolean
	menuClassName?: string
	onChange: (e: AsyncSelectValueType) => void
	className?: string
	error?: React.ReactNode
	value: AsyncSelectValueType
	load: (args: PaginationArgs<{readonly ids?: (string|number)[]|readonly (string|number)[], query: string}>, ab: AbortController) => Promise<Pagination>
	limit?: number
	cancellable?: boolean
}

type PaginationArgs<T> = T & {
	after: string|null
	first: number
}

type DefaultPaginationVariables = {query: string};

const notFoundMsg = "Not Found"; // TODO - deal with translations
const loadMore = "Load More"; // TODO - deal with translations

export function AsyncSelect({className, error, ...props}: AsyncSelectProps){

	const [ref, refMenu, active, setIsOpen, popper] = usePopover<HTMLButtonElement|HTMLDivElement, HTMLDivElement>({
		testClose(event){
			if(refMenu.current.contains(event.target as HTMLElement)){
				return false;
			}
			return true;
		}
	});

	const [key, setKey] = React.useState<number|null>(null);
	const [data, setData] = React.useState<Pagination|null>(null);
	const [loading, setLoading] = React.useState(false);

	const defPVariables = {
		first: props.limit ?? 1,
		after: null as null|string
	};
	const [paginationVariables, setPVariables] = React.useState(defPVariables)
	const [variables, setVariables] = React.useState<DefaultPaginationVariables>(() => {
		return {query: ""};
	});

	const [selected, setSelected] = React.useState<Edge["node"][]>([]);

	const refs = React.useRef({
		variables,
		timeout: null as any,
	});

	const isSingle = defPVariables.first === 1;
	const inputRef = React.useRef<HTMLInputElement>(null);

	function onChange(value: AsyncSelectProps["value"]){
		// apply limit
		if(props.disabled){
			return;
		}
		props.onChange(value.slice(-defPVariables.first));
		if(active){
			popper.current!.update();
		}
		setIsOpen(false);
	}

	React.useEffect(() => {
		if(refs.current.variables === variables){
			return;
		}
		// reset data
		clearTimeout(refs.current.timeout);
		refs.current.timeout = setTimeout(function () {
			setData(null);
			setKey(Math.random());
			setPVariables(defPVariables);
		}, 300);
	}, [variables]);

	React.useEffect(() => {
		if(!active) return;
		setLoading(true);
		const ab = new AbortController();
		props.load({...variables, ...paginationVariables}, ab)
			.then(res => {
				setData(currentD => {
					let nd = res;
					if(currentD){
						nd = {
							edges: currentD.edges.concat(res.edges),
							pageInfo:{
								...currentD.pageInfo,
								...res.pageInfo
							}
						}
					}
					return nd;
				});
			})
			.catch(er => {
				// do nothing here since errors should be handled by the loader
			})
			.finally(() => {
				setLoading(false);
			});
		return () => {
			ab.abort();
		}
	}, [key, paginationVariables]);

	/* load selected */
	React.useEffect(() => {
		if(props.value.length){
			const ab = new AbortController();
			props.load({first: props.value.length, query: "", ids: props.value, after: null}, ab)
				.then(pagination => {
					setSelected(
						pagination.edges
							.map(item => item.node)
							.filter((node) => (props.value.includes(node.value)))
					);
				})
				.catch(res => {
					// should be handled by loaders
				})
			return () => {
				ab.abort();
			}
		} else if(selected.length) {
			setSelected([]);
		}
	}, [props.value]);

	// recalculate popper position
	React.useEffect(() => {
		if(popper.current){
			popper.current.forceUpdate();
		}
	}, [data, popper.current]);

	return (
		<div>
			<Button
				variant="secondary"
				disabled={props.disabled}
				onClick={() => {
					setIsOpen(true);
					if(data) return;
					setKey(Math.random());
				}}
				ref={isSingle ? ref as React.MutableRefObject<HTMLButtonElement> : undefined}
			>
				{
					isSingle ?
						(selected.find(node => node.value === props.value[0])?.label ?? <span className="text-destructive">{notFoundMsg}</span>) :
						"Select"
				}
				{
					(props.cancellable && selected) ? (
						<Close
							className={"lfui-cancelIcon"}
							onClick={
								props.disabled ? undefined :
								function (event) {
									event.stopPropagation();
									props.onChange([]);
								}
							}
						/>
					) : <Down className="lfui-dropdownIcon" />
				}
			</Button>
			{
				!isSingle && (
					<div ref={ref as React.MutableRefObject<HTMLDivElement>} className="lfui-asyncSelectItemsContainer">
						{
							props.value.length === 0 ? (
								<Text children="No items are selected" />
							):
							props.value.map(id => {
								const item = selected.find(node => node.value === id);
								return (
									<Badge key={id} borderRadius="regular" variant={item ? "primary" : "destructive"} className="lfui-asyncSelectItem" >
										{item? item.label : notFoundMsg}
										<Close
											className="lfui-asyncSelectDeleteItem"
											onClick={() => {
												onChange(props.value.filter(_id => _id !== id));
											}} />
									</Badge>
								)
							})
						}
					</div>
				)
			}
			{
				active &&
				createPortal(
					<DropdownMenu 
						className={cx(props.menuClassName ?? '')}
						ref={refMenu}
						header={
							<Search ref={inputRef} value={variables.query} onChange={event => setVariables({...variables, query: event.target.value})} />
						}
					>
						{
							data && (
								<Fragment>
									{
										data.edges.map(
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
										data.pageInfo.hasNextPage &&
										!loading &&
										<div className="lfui-loadMoreContainer">
											<LinkText
												children={loadMore}
												onClick={() => {
													if(loading) return;
													setPVariables({
														...paginationVariables,
														after: data.pageInfo.endCursor
													});
												}}
											/>
										</div>
									}
								</Fragment>
							)
						}
						{
							loading ?
							<div className="lfui-loadingMoreContainer">
								<LoadingSpinner variant="primary" size="small" />
							</div> : null
						}
					</DropdownMenu>,
					modals
				)
			}
		</div>
	)
}

type Edge = {
	node: {
		label: string
		value: string|number
	}
	cursor: string
}

type Pagination = {
	edges: ReadonlyArray<Edge>
	pageInfo:{
	  hasNextPage: boolean
	  endCursor: string|null
	}
}