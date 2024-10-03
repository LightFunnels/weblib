import React from 'react';
import { cx as clsx, cva, type VariantProps } from "class-variance-authority";

const DEFAULT_LABEL = "Something Went Wrong";

const alertVariants = cva(
  "lfui-alert",
  {
    variants: {
      variant: {
        error: "lfui-alert--error",
        warning: "lfui-alert--warning",
        info: "lfui-alert--info",
        success: "lfui-alert--success",
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
      icon={icon || <i className="lfui-icon-alerts-info" />}
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
      <div className="lfui-alert__wrapper">
        {icon && (
          <div className="lfui-alert__icon-container">
            <div className="lfui-alert__icon">
              {icon}
            </div>
          </div>
        )}
        <div className="lfui-alert__content">
          <div className="lfui-alert__text-container">
            {label && (
              <div className={clsx("lfui-alert__title", labelClassName)}>
                {label}
              </div>
            )}
            {message && (
              <div className={clsx("lfui-alert__message", messageClassName, {
                "lfui-alert__message--only": !label
              })}>
                {message}
              </div>
            )}
            {bottomActions && (
              <div className="lfui-alert__bottom-actions">
                {bottomActions}
              </div>
            )}
          </div>
          {actions ? (
            <div className="lfui-alert__actions">
              {actions}
            </div>
          ) : (
            (setClose && !noClose) && (
              <button className="lfui-alert__close" onClick={() => setClose(true)}>
                <i className="icon-cancel-music" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
