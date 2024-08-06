import React from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';

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
					message={this.state.error}
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
    <div className="flex min-h-[400px] w-full items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex">
          <AlertOctagon className="h-24 w-24 text-red-500 mx-auto sm:mx-0" />
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {title || "An error occurred"}
              </h1>
              <p className="mt-2 text-base text-gray-500">{message}</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};