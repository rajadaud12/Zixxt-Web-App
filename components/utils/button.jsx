export function Button({ children, variant = "default", size = "medium", className = "", icon, ...props }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none"

  const variantClasses = {
    default: "bg-white text-textLight border border-border hover:bg-btnbg",
    primary: "bg-primary text-white hover:bg-primary/90",
    dark: "bg-black text-white hover:bg-black/90",
    link: "bg-transparent text-textLight hover:text-primary p-0",
    "primary-link": "bg-transparent text-primary hover:text-primary/90 p-0",
  }

  const sizeClasses = {
    tiny: "text-[10px] leading-[12px] px-3 py-1.5",
    small: "text-[12px] leading-[16px] px-4 py-2",
    medium: "text-[14px] leading-[16px] px-5 py-2.5",
    large: "text-[16px] leading-[20px] px-6 py-3",
    giant: "text-[18px] leading-[24px] px-7 py-3.5",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
