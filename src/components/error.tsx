import { AlertOctagon, RefreshCw } from 'lucide-react';
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