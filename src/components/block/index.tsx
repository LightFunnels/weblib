import React from "react";
import { Link } from '../link';
import "./block.scss";

interface BreadcrumbItem {
  label: string | number | React.ReactNode;
  to?: string;
}

type BlockProps = {
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  titleWrapperClassName?: string;
  subTitle?: React.ReactNode;
  title: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbsActions?: React.ReactNode;
  noMargin?: boolean;
  medium?: boolean;
  headingClassName?: string;
  children: React.ReactNode;
}

const mapBreadcrumb = (field: BreadcrumbItem) => {
  const isReversed = document.dir === "rtl"; // TO DISCUSS 
  if (!field.to) {
    return (
      <span key={field.label.toString()} className="lfui-blockBreadcrumbLink lfui-blockBreadcrumbLinkLast">
        <ArrowIconRight 
          className={`lfui-blockBreadcrumbIcon ${isReversed ? "lfui-blockBreadcrumbIconReversed" : ""}`}
        />
        <div className="lfui-blockBreadcrumbLabel">{field.label}</div>
      </span>
    );
  }
  return (
    <Link
      key={field.label.toString()}
      to={field.to}
      className="lfui-blockBreadcrumbLink"
    >
      <ArrowIconRight 
        className={`lfui-blockBreadcrumbIcon ${isReversed ? "lfui-blockBreadcrumbIconReversed" : ""}`}
      />
      <div>{field.label}</div>
    </Link>
  );
};

export function Block({
  className,
  breadcrumbs,
  titleWrapperClassName,
  subTitle,
  title,
  actions,
  breadcrumbsActions,
  headingClassName,
  children
}: BlockProps) {
  return (
    <div className={`lfui-block ${className || ''} ${breadcrumbs ? 'lfui-blockWithBreadcrumbs' : ''}`}>
      {breadcrumbs && (
        <div className="lfui-blockBreadcrumbs">
          <div className="lfui-blockBreadcrumbsList">
            {breadcrumbs.map(mapBreadcrumb)}
          </div>
          {breadcrumbsActions && (
            <div className="lfui-blockBreadcrumbsActions">
              {breadcrumbsActions}
            </div>
          )}
        </div>
      )}
      <div className={`lfui-blockTitleWrapper ${titleWrapperClassName || ''}`}>
        <h2 className={`lfui-blockTitle ${headingClassName || ''}`}>
          {title}
        </h2>
        {actions && <div className="lfui-blockActions">{actions}</div>}
      </div>
      {subTitle && (
        <div className="lfui-blockSubtitle">
          {subTitle}
        </div>
      )}
      <div className="lfui-blockContent">
        {children}
      </div>
    </div>
  );
}

function ArrowIconRight(props: React.HTMLAttributes<HTMLOrSVGElement>){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none" {...props}>
      <g id="Atoms / Icons / Arrow Right 24x24">
        <path id="Vector" d="M6 12L10 8L6 4" stroke="#647990" strokeWidth="1.13333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}
