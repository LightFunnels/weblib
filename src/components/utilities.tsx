import { cx as clsx } from "class-variance-authority";
import React from 'react';

export function isHTMLElement(e: React.ReactNode) : e is React.ReactElement{
	return React.isValidElement(e);
}

export function Fallback<T>(E: React.ReactNode, m: React.ReactNode, className?: string){
	return isHTMLElement(E) ?
    <E.type {...E.props} className={clsx(E.props.className, className)} key={E.key} /> :
    m;
}