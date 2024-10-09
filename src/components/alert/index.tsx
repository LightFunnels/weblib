import React from 'react';
import { cx as clsx, cva, type VariantProps } from "class-variance-authority";

import "./alert.scss";
const DEFAULT_LABEL = "Something Went Wrong";

const alertVariants = cva(
  "lfui-alert",
  {
    variants: {
      variant: {
        error: "lfui-alert_destructive",
        warning: "lfui-alert_warning",
        info: "lfui-alert_info",
        success: "lfui-alert_success",
      },
    },
    defaultVariants: {
      variant: "info",
    }
  }
);

export interface AlertProps extends AlertContentProps {
  message: string;
  icon?: React.ReactNode;
}

export function Alert({ message, icon, ...props }: AlertProps) {
  return (
    <AlertContent
      {...props}
      label={props.label || DEFAULT_LABEL}
      icon={icon || <i className="icon-alerts-info" />}
      message={message}
      variant={props.variant}
    />
  );
}

export interface AlertContentProps extends VariantProps<typeof alertVariants> {
  className?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  bottomActions?: React.ReactNode;
  label?: React.ReactNode;
  message: React.ReactNode;
  messageClassName?: string;
  setClose?: (v: boolean) => void;
  noClose?: boolean;
  labelClassName?: string;
}

export function AlertContent({ 
  variant,
  className,
  icon,
  label,
  message,
  bottomActions,
  actions,
  setClose,
  noClose,
  labelClassName,
  messageClassName,
  ...props 
}: AlertContentProps) {
  const alertClassName = alertVariants({ variant, className });

  return (
    <div className={alertClassName} {...props}>
      <div className="lfui-alert_wrapper">
        {icon && (
          <div className="lfui-alert_icon-container">
            <div className="lfui-alert_icon">
              {icon}
            </div>
          </div>
        )}
        <div className="lfui-alert_content">
          <div className="lfui-alert_text-container">
            {label && (
              <div className={clsx("lfui-alert_title", labelClassName)}>
                {label}
              </div>
            )}
            {message && (
              <div className={clsx("lfui-alert_message", messageClassName, {
                "lfui-alert_message_only": !label
              })}>
                {message}
              </div>
            )}
            {bottomActions && (
              <div className="lfui-alert_bottom-actions">
                {bottomActions}
              </div>
            )}
          </div>
          {actions ? (
            <div className="lfui-alert_actions">
              {actions}
            </div>
          ) : (
            (setClose && !noClose) && (
              <button className="lfui-alert_close" onClick={() => setClose(true)}>
                <i className="icon-cancel-music" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
