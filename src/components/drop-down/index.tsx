import clsx from 'clsx';
import { Instance, Placement, createPopper } from '@popperjs/core';
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import "./drop-down.scss";

type Props = {
  placement?: UseToggleOpts["placement"]
  keep_on_click_in?: boolean
  label: React.ReactElement
  menu?: React.ReactElement
  className?: string
  children?: React.ReactNode
  offset?: [number,number]
}

export const modals = document.getElementById("modals") ?? document.body;

export function Dropdown(props: Props){

  const [ref_label, ref_menu, active] = useToggle<HTMLButtonElement, HTMLDivElement>({
    placement: props.placement,
    offset: props.offset
  });

  let onClick;

  if(props.keep_on_click_in){
    onClick = e => {
      (e.nativeEvent.ignoreToggleClick || (e.nativeEvent.ignoreToggleClick = [], e.nativeEvent.ignoreToggleClick).push(ref_menu.current));
    }
  }

  return (
    <Fragment>
    	<props.label.type {...props.label.props} ref={ref_label} />
      {
        createPortal(
          active && (
            props.menu ? (
              <props.menu.type
                ref={ref_menu}
                {...props.menu.props}
                onClick={
                  !props.keep_on_click_in ?
                  props.menu.props.onClick :
                  function (event) {
                    if(props.menu!.props.onClick){
                      props.menu!.props.onClick(event);
                    }
                    onClick(event);
                  }
                }
              />
            ) : (
              <DropdownMenu
	              onClick={onClick}
	              ref={ref_menu}
	              children={props.children}
              />
            )
          ),
					modals
        )
      }
    </Fragment>
  )
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	function DropdownMenu(props, ref){
		return (
			<div
			  {...props}
			  ref={ref}
			  className={clsx('lfui-dropdownMenu', props.className)}
			/>
		)
	}
);

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
	function DropdownItem({ active, ...props }, ref) {
		return (
			<div {...props} ref={ref} className={clsx("lfui-dropdownItem",{ "lfui-dropdownItem_active": active }, props.className)}>
				{props.children}
			</div>
		)
	}
);

type UseToggleOpts = {
	state?: boolean
	key?: any
	disabled?: boolean
	placement?: Placement
	offset?: [number,number]
	followTargetWidth?: boolean
}

export function useToggle<Ref extends HTMLElement = HTMLElement, Menu extends HTMLElement = HTMLElement>(options: UseToggleOpts = {}) {

	const [isOpen, setIsOpen] = React.useState<boolean>(options.state || false);
	const ref = React.useRef<Ref>(null);
	const refMenu = React.useRef<Menu>(null);
	const popper = React.useRef<Instance | null>(null);

	React.useLayoutEffect(
		function () {
			// if options are disabled break;
			if (options.disabled) {
				return;
			}

			// console.log(options.key);
			let btnClick, documentClick, tm;

			// if the modal is already open
			if (isOpen) {
				if (!ref.current || !refMenu.current) {
					console.log(ref.current , refMenu.current);
					throw new Error('missing one of ref, refMenu');
				}
				if(options?.followTargetWidth !== false){
					refMenu.current!.style.minWidth = ref.current!.offsetWidth + "px";
				}
				let opts: {placement?, modifiers?, onFirstUpdate?} = {
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: options.offset ?? [0, 8]
							}
						},
						{
							name: 'preventOverflow',
							options: {
								altAxis: true,
							}
						},
					]
				};
				if (options.placement) {
					opts.placement = options.placement;
				}
				popper.current = createPopper(
					ref.current,
					refMenu.current,
					opts
				);
				// click event handler
				documentClick = function (event) {
					if (event.ignoreToggleClick?.includes(refMenu.current)) {
						return;
					}
					setIsOpen(false);
				}

				tm = setTimeout(
					function () {
						document.addEventListener('click', documentClick)
					}
				);

			} else {
				btnClick = () => setIsOpen(true);
				if (ref.current) {
					ref.current.addEventListener('click', btnClick)
				}
			}

			return () => {
				if (tm) {
					clearTimeout(tm);
				}
				
				if(popper.current){
					popper.current.destroy();
					popper.current = null;
					document.removeEventListener('click', documentClick);
				}

				if (btnClick && ref.current) {
					ref.current.removeEventListener(
						'click',
						btnClick,
					)
				}
			}

		},
		[isOpen, options.key, options.disabled]
	);

	return [
		ref as React.MutableRefObject<Ref>,
		refMenu as React.MutableRefObject<Menu>,
		isOpen,
		setIsOpen,
		popper,
	] as const;
}
