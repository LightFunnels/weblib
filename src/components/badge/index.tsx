import React, { Fragment } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import "./badge.scss";
import { Dropdown, DropdownItem } from '..';

export type Option = {
  name: string;
  value: string | number | boolean;
  variant: 'primary' | 'warning' | 'success' | 'neutral' | 'caution';
  label: React.ReactNode;
};

const badgeVariants = cva(
  "lfui-badge",
  {
    variants: {
      variant: {
        primary: "lfui-badge_primary",
        warning: "lfui-badge_warning",
        success: "lfui-badge_success",
        neutral: "lfui-badge_neutral",
        caution: "lfui-badge_caution",
      },
      size: {
        default: "",
        large: "lfui-badge_large",
      },
      direction: {
        ltr: "lfui-badge_ltr",
        rtl: "lfui-badge_rtl",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      direction: "ltr",
    }
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label?: React.ReactNode;
  value?: Option;
  options?: Option[];
  onChange?: (e: any) => void;
  hideDropdown?: boolean;
  showIcon?: boolean;
  labelClassName?: string;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

const DropdownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.13333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Badge: React.FC<BadgeProps> = ({
  label,
  value,
  options = [],
  onChange,
  size,
  hideDropdown = true,
  showIcon = false,
  labelClassName = '',
  className = '',
  dir = 'ltr',
  variant,
}) => {
  const selectedVariant = value?.variant || variant || 'primary';

  const badgeContent = (
    <div
      className={badgeVariants({ variant: selectedVariant, size, direction: dir, className })}
      dir={dir}
    >
      <div className="lfui-badge_content">
        {showIcon && (
          <span className="lfui-badge_icon" />
        )}
        <span className={`lfui-badge_label ${labelClassName}`}>
          {hideDropdown ? label : value?.name}
        </span>
      </div>
      {!hideDropdown && options.length > 0 && (
        <div className="lfui-badge_dropdown-icon">
          <DropdownIcon />
        </div>
      )}
    </div>
  );

  if (hideDropdown || options.length === 0) {
    return badgeContent;
  }

  return (
    <Dropdown
      label={badgeContent}
    >
      <Fragment>
        {options.map((op, i) => (
          <DropdownItem
            onClick={onChange}
            data-type={op.value}
            key={i}
            active={op.value === value?.value}
          >
            {op.label ?? op.name}
          </DropdownItem>
        ))}
      </Fragment>
    </Dropdown>
  );
}
