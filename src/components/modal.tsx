import React, {Fragment} from "react";
import {createPortal} from "react-dom";
import { cn } from '@/lib/utils';

type Props = {
	header?: React.ReactNode
	body: React.ReactNode
	footer?: React.ReactNode
	bodyClassName?: string
	close: () => void
}

export function Modal(props: Props){
	return (
		<Fragment>
			{
				createPortal(
					<div className="fixed inset-0 flex items-center justify-center">
						<div onClick={() => props.close()} className="inset-0 z-0 bg-gray-900 opacity-50 absolute flex"></div>
						<div className={cn("bg-white z-1 relative max-h-frame-height rounded-md flex flex-col mx-2.5", props.bodyClassName)}>
							{
								props.header && (
									<div className="p-4">{props.header}</div>
								)
							}
							<div
								className={
									"p-4 grow overflow-y-auto "
									+ (props.header ? "pt-0" : "") + 
									+ (props.footer ? "pb-0" : "") 
								}
							>
								{props.body}
							</div>
							{
								props.footer && (
									<div className={"p-4 flex gap-4 justify-end flex"}>{props.footer}</div>
								)
							}
						</div>
					</div>,
					document.getElementById("modals")!
				)
			}
		</Fragment>
	)
}

export function ModalBody(){
	return (
		<div>
			
		</div>
	)
}