import { cn } from '@/lib/utils';
import React, { LinkHTMLAttributes } from "react";

type Props = LinkHTMLAttributes<HTMLAnchorElement> & {
	target?: string
}

export function NativeLink(props: Props){
	return <a {...props} className={cn("underline cursor-pointer text-primary", props.className)} />
}