import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";
import { Label } from "..";
import './toggle.scss'

const toggleVariants = cva(
  "lfui-toggle",
  {
    variants: {
      size: {
        default: "",
        small: "lfui-toggle_small",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type Props = React.HTMLAttributes<HTMLInputElement> &
  VariantProps<typeof toggleVariants> & {
    checked: boolean;
    label: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }

export function Toggle({ size, className, ...props }: Props) {
  return (
    <Label 
      className={clsx(
        toggleVariants({ size, className }), 
        { 
          "lfui-toggle_disabled": props.disabled,
          "lfui-toggle_checked": props.checked
        }
      )}
    >
      <input
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
        type="checkbox"
        className="lfui-toggleInput"
      />
      <div
        className={clsx("lfui-toggleIcon", {
          "lfui-toggle_disabled": props.disabled
        })}
      >
        <div className="lfui-toggleHandle" />
      </div>
      <span>{props.label}</span>
    </Label>
  )
}
