import { StringifyOptions } from 'querystring'
import { FunctionComponent } from 'react'

type ButtonProps = {
  text: String
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}
const Button: FunctionComponent<ButtonProps> = ({
  text,
  type = 'submit',
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={(e) => onClick && onClick(e)}
      className="border-2 border-gray-500 bg-white px-4 py-2 transition-all hover:border-black hover:bg-blue-50 focus:border-black focus:bg-blue-100"
    >
      {text}
    </button>
  )
}

export default Button
