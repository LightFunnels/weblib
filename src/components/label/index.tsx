import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Placement } from '@popperjs/core';
import { cx as clsx } from "class-variance-authority";

import { StaticPopover, usePopover } from "../popover";

import "./label.scss";

const labelVariants = cva("lfui-label");

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  action?: React.ReactNode;
  helpIcon?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ helpIcon, action, children, className, ...props }, ref) => (
    <div className="lfui-labelContainer">
      <label
        ref={ref}
        className={clsx(labelVariants(), className)}
        {...props}
      >
        {children}
        {helpIcon && (
          <HelpIcon>{helpIcon}</HelpIcon>
        )}
      </label>
      {action}
    </div>
  )
);

Label.displayName = "Label";

export { Label, labelVariants };

interface HelpIconProps {
  placement?: Placement;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({
  placement,
  children,
  className,
  iconClassName
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [refCodeInput, showPopover] = usePopover({
    keepDelay: 800,
    ref
  });

  return (
    <React.Fragment>
      <span
        className={clsx('lfui-helpIcon', className)}
        ref={refCodeInput}
      >
        <svg 
          className={clsx('lfui-helpIconSvg', iconClassName)}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </span>
      {showPopover && (
        <StaticPopover
          ref={ref}
          placement={placement}
          target={refCodeInput}
        >
          {children}
        </StaticPopover>
      )}
    </React.Fragment>
  );
};

export { HelpIcon };
