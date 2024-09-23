import React from 'react';
import { Button } from "./button";
import { Heading } from "./heading";
import { Text } from "./text";

export class ErrorBoundary extends React.Component<{children: React.ReactNode}> {
	
	componentDidCatch(error, info){
		console.log("componentDidCatch : ", error, info);
		if(process.env.NODE_ENV !== "development"){
			// captureException(error);
		}
	}
	state = {
		error: null as any,
	}
	static getDerivedStateFromError(error){
		return {
			error: error
		}
	}
	render(){
		if(this.state.error){
			return (
				<UI
					message={this.state.error.message}
					onRetry={() => {
						this.setState({
							error: null
						});
					}}
				/>
			)
		}
		return this.props.children;
	}
}


type Props = {
	title?: React.ReactNode
	message: React.ReactNode
	onRetry?: () => void
	onHome?: () => void
}

function UI ({ title, message, onRetry, onHome }: Props) {
  return (
    <div className="flex min-h-[400px] w-full items-center rounded-md justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="flex items-center">
          <AlertOctagon className="h-24 w-24 text-red-500 mx-auto sm:mx-0" />
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            	<Heading children={title || "An error occurred"} className="mb-2" />
            	<Text children={message} />
            </div>
          </div>
        </main>
        <div className="mt-10">
          {onRetry && (
            <Button
            	variant="destructive"
              onClick={onRetry}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function RefreshCw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-refresh-cw"
      viewBox="0 0 24 24"
    >
      <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"></path>
      <path d="M21 3v5h-5M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"></path>
      <path d="M8 16H3v5"></path>
    </svg>
  );
}

function AlertOctagon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-triangle-alert"
      viewBox="0 0 24 24"
    >
      <path d="M21.73 18l-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3M12 9v4M12 17h.01"></path>
    </svg>
  );
}