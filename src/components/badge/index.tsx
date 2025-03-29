import { cva, type VariantProps } from "class-variance-authority";
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
      borderRadius:{
      	regular: "lfui-class-corners-regular",
      	full: "lfui-class-corners-full",
      	max: "lfui-class-corners-max",
      }
    },
    defaultVariants: {
      variant: "primary",
      borderRadius: "max"
    }
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants> & React.HTMLAttributes<HTMLSpanElement>;

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  borderRadius,
  ...props
}) => {
  return (
    <span {...props} className={badgeVariants({ variant, borderRadius, className })} >
      {props.children}
    </span>
  );
}
