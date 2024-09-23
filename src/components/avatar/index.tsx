import { cva, cx, type VariantProps } from "class-variance-authority";

import "./avatar.scss";

type Props = {
	children?: React.ReactNode
	src?: string|null|undefined
	className?: string
	fallback?: string
} & VariantProps<typeof avatarVariants>

const avatarVariants = cva(
  "",
  {
    variants: {
      size: {
        medium: "lfui-avatar_md",
      },
      rounded:{
      	medium: "lfui-utils-corners-rounded",
      	full: "lfui-utils-corners-full",
      }
    },
    // dont use this here for the size and rounded
    // defaultVariants: {
    //   size: "medium",
    //   rounded: "medium"
    // }
  }
);

export function Avatar(props: Props){
	const corners = avatarVariants({rounded: props.rounded ?? "medium"});
	return (
		<div className={cx("lfui-avatar", avatarVariants({size: props.size ?? "medium"}), corners, props.className)}>
			<img
				className={cx("lfui-avatarPlaceholder", corners)}
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
			{
				props.src ?
					<img
						className={cx("lfui-avatarImage", corners)}
						src={props.src}
					/> :
					<div className={cx("lfui-avatarFallback", corners)}>
						{props.children ?? props.fallback}
					</div>
			}
		</div>
	)
}