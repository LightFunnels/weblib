import React, { createContext, useContext, useState } from 'react';
import { cx, cva, type VariantProps } from "class-variance-authority";
import './tabs.scss';

const tabsVariants = cva(
  "lfui-tabsHeader",
);

export function TabsHeader(props: React.HtmlHTMLAttributes<HTMLDivElement>){
	return (
		<div {...props} className={cx(tabsVariants(), props.className)}>
			{
				props.children
			}
		</div>
	)
}

type TabHeaderItemProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	children: React.ReactElement
	active?: Boolean
}

export function TabHeaderItem({active, ...props}: TabHeaderItemProps){
	return (
		<props.children.type {...props.children.props} className={cx("lfui-tabHeaderItem", props.className, {"lfui-tabHeaderItem_active": active})} />
	)
}