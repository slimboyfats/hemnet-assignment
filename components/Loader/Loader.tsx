import { FunctionComponent } from 'react'

const Loader: FunctionComponent = () => {
  return (
    <div className="flex w-full animate-pulse items-center justify-center space-x-2 align-middle">
      <div className="h-8 w-8 rounded-full bg-blue-400"></div>
      <div className="h-8 w-8 rounded-full bg-blue-400"></div>
      <div className="h-8 w-8 rounded-full bg-blue-400"></div>
    </div>
  )
}

export default Loader
