import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from 'clsx';

import "./heading.scss";

const headingVariants = cva(
  "lfui-heading",
  {
    variants: {
      version: {
        "h1": "lfui-heading1",
        "h2": "lfui-heading2",
        "h3": "lfui-heading3",
        "h4": "lfui-heading4",
        "h5": "lfui-heading5",
        "h6": "lfui-heading6",
      },
    },
    defaultVariants: {
      version: "h1",
    }
  }
)

export type HeadingProps = VariantProps<typeof headingVariants> & {
	children: React.ReactNode
	className?: string
}

export function Heading({version, className, ...props}: HeadingProps){
	const Com : any = version ?? "h1"; return (
		<Com {...props} className={clsx(headingVariants({ version, className }))}>
			{props.children}
		</Com>
	)
}
