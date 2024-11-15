import { clsx } from 'clsx';
import React, { Fragment } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

import { modals } from "../drop-down";

type Props = {
	header?: React.ReactNode
	body: string | number | React.ReactElement
	footer?: React.ReactNode
	bodyClassName?: string
	headerClassName?: string
	close: () => void
	className?: string
}

export function Modal(props: Props){
	return (
		<Fragment>
			{
				createPortal(
					<div className={clsx("lfui-modal", props.className)}>
						<div onClick={props.close} className="lfui-modalBackground"></div>
						<div
							className={
								clsx("lfui-modalBlock lfui-modalBlock_roundedTop lfui-modalBlock_roundedBottom", props.bodyClassName)
							}
						>
							{
								props.header && (
									<div className={clsx(`lfui-modalHeader lfui-modalBlock_roundedTop`, props.headerClassName)}>{props.header}</div>
								)
							}
							<div
								className={clsx("lfui-modalBody", {
									"lfui-modalBody_roundedTop": !Boolean(props.header),
									"lfui-modalBody_roundedBottom": !Boolean(props.footer),
								})} >
								{props.body}
							</div>
							{
								props.footer && (
									<div className={"lfui-modalFooter lfui-modalBlock_roundedBottom"}>{props.footer}</div>
								)
							}
						</div>
					</div>,
					modals
				)
			}
		</Fragment>
	)
}