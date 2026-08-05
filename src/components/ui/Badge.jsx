import React from 'react'

const Badge = ({children, variant, className=''}) => {
    const base = "text-xs font-semibold px-2 py-1 tracking-widest uppercase rounded "

    const variants = {
        sale: "bg-red-500 text-white",
        new: "bg-green-500 text-white",
        brand: "bg-zinc-900 text-zinc-500"
    }
  return (
    <div className={`${base} ${variants[variant]} ${className}`}>{children}</div>
  )
}

export default Badge
