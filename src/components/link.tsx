import { cn } from '@/lib/utils';
import React, { LinkHTMLAttributes } from "react";

type Props = LinkHTMLAttributes<HTMLAnchorElement> & {
	target?: string
}

const baseClassName = "underline cursor-pointer text-primary";

export function NativeLink(props: Props){
	return <a {...props} className={cn(baseClassName, props.className)} />
}

export function LinkText(props: LinkHTMLAttributes<HTMLElement>){
	return <span {...props} className={cn(baseClassName, props.className)} />
}