import clsx from 'clsx';

type Props = {
	copiable?: boolean
	value: string
}

export function Code({copiable, ...props}: React.HTMLAttributes<HTMLElement> & Props) {
  return (
    <code {...props} className={clsx("relative gap-2 flex items-center rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium", props.className)}>
      {props.value}
      {
      	copiable && (
      		<Icon
      			className="w-4 cursor-pointer"
      			onClick={e => {
							navigator.clipboard.writeText(props.value);
      			}}
      		/>
      	)
      }
    </code>
  )
}

function Icon(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <title />
	    <path d="M469.321 420.266c-27.098 0-49.068 21.969-49.068 49.067v384c0 27.098 21.97 49.067 49.068 49.067h384c27.098 0 49.067-21.969 49.067-49.067v-384c0-27.098-21.969-49.067-49.067-49.067h-384zM347.72 469.333c0-67.158 54.442-121.6 121.601-121.6h384c67.157 0 121.6 54.442 121.6 121.6v384c0 67.157-54.443 121.6-121.6 121.6h-384c-67.159 0-121.601-54.443-121.601-121.6v-384z" />
	    <path d="M170.683 121.596a49.064 49.064 0 0 0-49.066 49.066v384a49.074 49.074 0 0 0 14.371 34.697 49.075 49.075 0 0 0 34.695 14.37h42.667c20.029 0 36.267 16.239 36.267 36.267s-16.237 36.267-36.267 36.267h-42.667c-32.25 0-63.18-12.813-85.984-35.614a121.604 121.604 0 0 1-35.616-85.986v-384a121.601 121.601 0 0 1 121.6-121.6h384a121.588 121.588 0 0 1 85.982 35.616 121.6 121.6 0 0 1 35.618 85.984v42.667c0 20.029-16.239 36.267-36.267 36.267s-36.267-16.237-36.267-36.267v-42.667a49.077 49.077 0 0 0-14.37-34.695 49.07 49.07 0 0 0-34.697-14.371h-384z" />
	  </svg>
	)
}