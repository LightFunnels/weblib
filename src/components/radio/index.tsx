import clsx from "clsx";
import * as React from "react";
import { Label } from "..";
import './radio.scss'

type Props = React.HTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  label: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name: string;
  value: string;
}

export function Radio(props: Props) {
  return (
    <Label className={clsx("lfui-radio", props.className, { "lfui-radio_disabled": props.disabled })}>
      <input
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
        type="radio"
        name={props.name}
        value={props.value}
        className="lfui-radioInput"
      />
      <div
        className={clsx("lfui-radioIcon", {
          "lfui-radio_checked": props.checked,
          "lfui-radio_disabled": props.disabled
        })}
      >
        {props.checked && (
          <div className="lfui-radioInnerCircle" />
        )}
      </div>
      <span>{props.label}</span>
    </Label>
  )
}
