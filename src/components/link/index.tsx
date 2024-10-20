import React from 'react';
import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import { LinkHTMLAttributes } from "react";

import "./link.scss";
import "../button/button.scss"
import { Spinner} from '../spinner';

const linkVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "lfui-link",
        destructive: "lfui-button lfui-button_destructive",
        secondary: "lfui-button lfui-button_secondary",
        primary: "lfui-button lfui-button_primary",
      },
      size: {
        default: "",
        small: "lfui-button_small",
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

type LinkProps = LinkHTMLAttributes<HTMLAnchorElement>& VariantProps<typeof linkVariants> &{
  button?: boolean;
  loading?: boolean;
  to?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, button, loading, size, children, to, href, ...props }, ref) => {
    const linkClass = clsx(
      linkVariants({ variant: button ? (variant || 'primary') : 'default', size }),
      button && "lfui-button",
      className
    );

    return (
      <a
        className={linkClass}
        ref={ref}
        href={to || href}
        {...props}
      >
        {button && loading ? (
          <Spinner />
        ) : (
          children
        )}
      </a>
    );
  }
);

Link.displayName = "Link";

export { linkVariants };
