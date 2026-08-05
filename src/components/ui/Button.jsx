
const Button = ({onClick, children, variant, className= ''}) => {

    const base = "px-6 py-2 rounded text-sm font-medium transition-all duration-200"

    const variants = {
        primary: "bg-red-500 text-white",
        outline: "border border-white text-white",
        ghost: "text-gray-400"
    }


  return (
    <button onClick={onClick}  className={`${base} ${variants[variant]} ${className}`}>
        {children}
    </button>
  )
}

export default Button
