import React, { Fragment } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import "./badge.scss";
import { Down, Dropdown, DropdownItem } from '..';

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
        start: "lfui-badge_start",
        end: "lfui-badge_end",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      direction: "start",
    }
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants> & {
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
  const directionClass = dir === 'ltr' ? 'start' : 'end';

  const badgeContent = (
    <div
      className={badgeVariants({ variant: selectedVariant, size, direction: directionClass , className })}
      dir={dir}
    >
      <div className="lfui-badgeContent">
        {showIcon && (
          <span className="lfui-badgeIcon" />
        )}
        <span className={`lfui-badgeLabel ${labelClassName}`}>
          {hideDropdown ? label : value?.name}
        </span>
      </div>
      {!hideDropdown && options.length > 0 && (
        <div className="lfui-badgeDropdownIconContainer">
          <Down className='lfui-badgeDropdownIcon'/>
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
