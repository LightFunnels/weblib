import clsx from 'clsx';
import { LinkHTMLAttributes } from "react";

import "./link.scss";

type Props = LinkHTMLAttributes<HTMLAnchorElement> & {
	target?: string
}

const baseClassName = "lfui-link";

export function NativeLink(props: Props){
	return <a {...props} className={clsx(baseClassName, props.className)} />
}

export function LinkText(props: LinkHTMLAttributes<HTMLElement>){
	return <span {...props} className={clsx(baseClassName, props.className)} />
}