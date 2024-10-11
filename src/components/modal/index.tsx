import { clsx } from 'clsx';
import React, { Fragment } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

import { modals } from "../drop-down";

interface ModalProps {
  active?: boolean;
  close?: () => void;
  children: React.ReactElement;
  className?: string;
}

export function Modal(props: ModalProps) {
  return !(props.active === false) ? (
    createPortal(
      <ModalContent {...props} />,
      modals
    )
  ) : null;
}

function ModalContent(props: ModalProps) {
  React.useEffect(() => {
    if (!props.close) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.close!();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.close]);

  return (
    <div className={clsx('lfui-modal', props.className)}>
      <div className="lfui-modalBackground" onClick={props.close} />
      <props.children.type 
        {...props.children.props} 
        className={clsx(
          'lfui-modalBlock',
          props.children.props.className
        )} 
      />
    </div>
  )
}

Modal.useModalState = function(initState: boolean = false) {
  const [state, setState] = React.useState(initState);

  return [
    state,
    () => setState(true),
    () => setState(false)
  ] as const;
}

Modal.Title = function (props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx('lfui-modalHeader', props.className)}/>
  )
}

Modal.Footer = function (props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx('lfui-modalFooter', props.className)} />
  )
}

Modal.Body = function (props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx('lfui-modalBody', props.className)} />
  )
}

Modal.modals = modals;
