import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"

type Props = {
	src: string|null|undefined
	className?: string
	fallback?: string
} & VariantProps<typeof buttonVariants>

const buttonVariants = cva(
  "",
  {
    variants: {
      size: {
        default: "w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export function Avatar(props: Props){
	return (
		<div className={cn("relative inline-block rounded-full bg-muted", buttonVariants({size: props.size}), props.className)}>
			<img
				className="w-full rounded-full"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
			{
				props.src ?
				<img
					className="w-full top-0 left-0 h-full rounded-full absolute object-cover"
					src={props.src} /> :
					<div className={cn("absolute left-[50%] top-[50%] border border-1 translate-y-[-50%] translate-x-[-50%] text-lg")}>{props.fallback}</div>
			}
		</div>
	)
}