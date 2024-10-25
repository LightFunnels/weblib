import { cva, cx, type VariantProps } from "class-variance-authority";
import React from 'react';
import "./badge.scss";

const badgeVariants = cva(
  "lfui-badge",
  {
    variants: {
      variant: {
        primary: "lfui-badge_primary",
        warning: "lfui-badge_warning",
        success: "lfui-badge_success",
        neutral: "lfui-badge_neutral", // TODO - discuss naming
        destructive: "lfui-badge_destructive",
      },
    },
    defaultVariants: {
      variant: "primary",
    }
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants> & React.HTMLAttributes<HTMLSpanElement>;

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <span {...props} className={badgeVariants({ variant, className })} >
      {props.children}
    </span>
  );
}
