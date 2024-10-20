import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from 'react';

import "./alert.scss";

const alertVariants = cva(
  "lfui-alert",
  {
    variants: {
      variant: {
        error: "lfui-alert_destructive",
        warning: "lfui-alert_warning",
        info: "",
        success: "lfui-alert_success",
      },
    },
    defaultVariants: {
      variant: "info",
    }
  }
);

export type AlertProps = VariantProps<typeof alertVariants> & {
  className?: string;
  thumbnail?: React.ReactNode;
  action?: React.ReactNode;
  bottomActions?: React.ReactNode;
  label?: React.ReactNode;
  message: React.ReactNode;
}

export function isHTMLElement(e: React.ReactNode) : e is React.ReactElement{
	return React.isValidElement(e);
}

export function Alert({ 
  variant,
  className,
  thumbnail,
  label,
  message,
  bottomActions,
  action,
  ...props 
}: AlertProps) {
  const alertClassName = alertVariants({ variant, className });
  return (
    <div className={alertClassName} {...props}>
      {isHTMLElement(thumbnail) && (
      	<thumbnail.type {...thumbnail.props} className={clsx(thumbnail.props.className, "lfui-alertThumbnail")} />
      )}
      <div className="lfui-alertBody">
        {isHTMLElement(label) ?
        	<label.type {...label.props} className={clsx(label.props.className, "lfui-alertTitle")} key={label.key} />
        	: label && (
          <div className={clsx("lfui-alertTitle")}>
            {label}
          </div>
        )}
        {isHTMLElement(message) ?
        	<message.type {...message.props} className={clsx(message.props.className, "lfui-alertMessage")} key={message.key} />
        	: message && (
          <div className={clsx("lfui-alertMessage")}>
            {message}
          </div>
        )}
        {bottomActions && (
          <div className="lfui-alertBodyActions">
            {bottomActions}
          </div>
        )}
      </div>
      {
      	isHTMLElement(action) &&
      	<action.type {...action.props} className={clsx(action.props.className, "lfui-alertIcon")} key={action.key} />
      }
    </div>
  );
}
