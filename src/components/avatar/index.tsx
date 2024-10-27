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
        regular: "",
        l2: "lfui-avatar_l2",
        l: "lfui-avatar_l",
        s: "lfui-avatar_s",
        s2: "lfui-avatar_s2",
      },
      borderRadius:{
      	regular: "lfui-class-corners-regular",
      	full: "lfui-class-corners-full",
      }
    }
  }
);

export function Avatar(props: Props){
	const corners = avatarVariants({borderRadius: props.borderRadius ?? "regular"});
	return (
		<div className={cx("lfui-avatar", avatarVariants({size: props.size ?? "regular"}), corners, props.className)}>
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