import { cx as clsx, cva, type VariantProps } from "class-variance-authority";

import "./spinner.scss";

const spinnerVariants = cva(
  "lfui-spinner",
  {
    variants: {
      variant: {
        primary: "lfui-spinner_primary",
      },
      size: {
        small: "lfui-spinner_small",
        medium: "lfui-spinner_medium",
        large: "lfui-spinner_large",
      }
    },
    defaultVariants: {
      size: "small",
    }
  }
);

export interface SpinnerProps extends React.SVGAttributes<SVGElement>, VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, variant, size, ...props }: SpinnerProps) {
  return (
    <SpinnerSVG
      {...props}
      className={clsx(spinnerVariants({ variant, size }),className)}
    />
  );
}


export function SpinnerSVG(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
		<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props} >
			<path fillRule="evenodd" clipRule="evenodd" d="M4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C10.5523 0 11 0.447715 11 1C11 1.55228 10.5523 2 10 2C8.41775 2 6.87104 2.46919 5.55544 3.34824C4.23985 4.22729 3.21447 5.47672 2.60897 6.93853C2.00347 8.40034 1.84504 10.0089 2.15372 11.5607C2.4624 13.1126 3.22433 14.538 4.34315 15.6569C5.46197 16.7757 6.88743 17.5376 8.43928 17.8463C9.99113 18.155 11.5997 17.9965 13.0615 17.391C14.5233 16.7855 15.7727 15.7602 16.6518 14.4446C17.5308 13.129 18 11.5823 18 10C18 9.44771 18.4477 9 19 9C19.5523 9 20 9.44771 20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.1937 10.0111 0.00433278 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853Z" className="fill-primary-foreground" />
		</svg>
	)
}
