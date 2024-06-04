import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"

type Props = {
	children?: React.ReactNode
	src: string|null|undefined
	className?: string
	fallback?: string
} & VariantProps<typeof avatarVariants>

const avatarVariants = cva(
  "",
  {
    variants: {
      size: {
        default: "w-14",
      },
      corners:{
      	md: "rounded-md",
      	lg: "rounded-lg",
      	sm: "rounded-sm",
      	default: "rounded-full"
      }
    },
    defaultVariants: {
      size: "default",
      corners: "default"
    },
  }
);

export function Avatar(props: Props){
	const corners = avatarVariants({corners: props.corners});
	return (
		<div className={cn("relative inline-block bg-muted", avatarVariants({size: props.size}), corners, props.className)}>
			<img
				className={cn("w-full", corners)}
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
			{
				props.src ?
				<img
					className={cn("w-full top-0 left-0 h-full absolute object-cover p-1", corners)}
					src={props.src} /> :
						<div className={cn("absolute left-[50%] top-[50%] border border-1 translate-y-[-50%] translate-x-[-50%] text-lg leading-none")}>
							{props.children ?? props.fallback}
						</div>
			}
		</div>
	)
}