import clsx from "clsx";
import * as React from "react";
import { Label, isHTMLElement } from "..";
import './radio.scss';

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  disabled?: boolean;
}

export function Radio({label,checked,disabled,...props}: RadioProps) {
  return (
    <Label className={clsx("lfui-radio", props.className, { "lfui-radio_disabled": disabled })}>
      <input
        checked={checked}
        disabled={disabled}
        onChange={props.onChange}
        type="radio"
        className="lfui-radioInput"
      />
      <div
        className={clsx("lfui-radioIcon", {
          "lfui-radioIcon_checked": checked,
          "lfui-radioIcon_disabled": disabled
        })}
      >
        {checked && (
          <div className="lfui-radioCheckIcon" />
        )}
      </div>
      {isHTMLElement(label) ? 
      <label.type {...label.props} className={clsx(label.props.className)} key={label.key}/>
      : label && (
        <span className={clsx("lfui-radioLabel")}>
          {label}
        </span>
      )}
    </Label>
  )
}
