import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      	<div className="relative z-1">
        	<Main />
      	</div>
      	<div className="relative z-1">
	        <div id="modals">
	        	
	        </div>
      	</div>
        <NextScript />
      </body>
    </Html>
  )
}
