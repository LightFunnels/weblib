import { clsx } from 'clsx';
import React, { Fragment } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

import { modals } from "../drop-down";

type Props = {
	header?: React.ReactNode
	body: React.ReactNode
	footer?: React.ReactNode
	bodyClassName?: string
	headerClassName?: string
	close: () => void
}

export function Modal(props: Props){
	return (
		<Fragment>
			{
				createPortal(
					<div className="lfui-modal">
						<div onClick={() => props.close()} className="lfui-modalBackground"></div>
						<div className={clsx("lfui-modalBlock", props.bodyClassName)}>
							{
								props.header && (
									<div className={`lfui-modalHeader ${props.headerClassName ?? ""}`}>{props.header}</div>
								)
							}
							<div className={"lfui-modalBody"} >
								{props.body}
							</div>
							{
								props.footer && (
									<div className={"lfui-modalFooter"}>{props.footer}</div>
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
