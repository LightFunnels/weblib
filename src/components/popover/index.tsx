import { createPopper, Placement } from '@popperjs/core';
import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from 'react';

import "./popover.scss";

const popoverVariants = cva(
  "lfui-popover",
  {
    variants: {
      placement: {
        top: "lfui-popover_top",
        bottom: "lfui-popover_bottom",
        left: "lfui-popover_left",
        right: "lfui-popover_right",
      },
    },
    defaultVariants: {
      placement: "bottom",
    }
  }
);

type PopoverVariantProps = VariantProps<typeof popoverVariants>;

export interface StaticPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  target: React.MutableRefObject<HTMLElement>;
  placement?: Placement;
  variantPlacement?: PopoverVariantProps['placement'];
  arrowClassName?: string;
  offset?: [number, number];
}

export const StaticPopover = React.forwardRef<HTMLDivElement, StaticPopoverProps>(
  ({ className, target, placement = 'bottom', variantPlacement, arrowClassName, children, offset = [0, 10], ...props }, ref) => {
    const popoverRef = React.useRef<HTMLDivElement>(null);
    const arrowRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
      if (!popoverRef.current || !target.current) return;

      const popperInstance = createPopper(target.current, popoverRef.current, {
        placement,
        modifiers: [
          {
            name: "arrow",
            options: {
              element: arrowRef.current,
            },
          },
          {
            name: 'offset',
            options: {
              offset,
            }
          },
        ]
      });

      return () => {
        popperInstance.destroy();
      };
    }, [target, placement, offset]);

    const derivedVariantPlacement = variantPlacement || (placement.split('-')[0] as PopoverVariantProps['placement']);

    return (
      <div
        ref={(e) => {
          popoverRef.current = e;
          if (typeof ref === 'function') {
            ref(e);
          } else if (ref) {
            ref.current = e;
          }
        }}
        className={clsx(popoverVariants({ placement: derivedVariantPlacement }), className)}
        {...props}
      >
        <div className="lfui-popover__arrow" ref={arrowRef}>
          <div className={clsx("lfui-popover__arrow-visual", arrowClassName)}></div>
        </div>
        {children}
      </div>
    );
  }
);

StaticPopover.displayName = "StaticPopover";

export { popoverVariants };

type UsePopoverOptions = {
  disabled?: boolean;
  delay?: number;
  keepDelay?: number;
  ref?: React.MutableRefObject<HTMLElement | null>;
  showTemporary?: number;
};

export function usePopover(opts: UsePopoverOptions = {}): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const { disabled = false, delay = 0, keepDelay = 0, ref, showTemporary = 0 } = opts;
  const targetRef = React.useRef<HTMLElement>(null);
  const [show, setShow] = React.useState(false);
  const statusRef = React.useRef<{ status: string }>({ status: '' });

  React.useLayoutEffect(() => {
    if (disabled) return;

    let timeoutId: NodeJS.Timeout;

    if (showTemporary) {
      setShow(true);
      timeoutId = setTimeout(() => {
        setShow(false);
      }, showTemporary);
    }

    const handleMouseOver = () => {
      statusRef.current.status = 'over';
      setTimeout(() => {
        if (statusRef.current.status !== 'left') {
          setShow(true);
        }
      }, delay);
    };

    const handleMouseLeave = () => {
      Promise.race([
        ref?.current
          ? new Promise<boolean>((resolve) => {
              ref.current?.addEventListener('mouseenter', () => resolve(true), { once: true });
            })
          : Promise.resolve(false),
        new Promise<boolean>((resolve) => {
          setTimeout(() => resolve(false), keepDelay);
        }),
      ]).then((keepOpen) => {
        const close = () => {
          setShow(false);
          statusRef.current.status = 'left';
        };

        if (keepOpen) {
          ref?.current?.addEventListener('mouseleave', close, { once: true });
        } else {
          close();
        }
      });
    };

    targetRef.current?.addEventListener('mouseover', handleMouseOver);
    targetRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      targetRef.current?.removeEventListener('mouseover', handleMouseOver);
      targetRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, delay, keepDelay, ref, showTemporary]);

  return [targetRef, show];
}
