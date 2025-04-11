export function H1({ children, className = "" }) {
  return <h1 className={`text-[28px] leading-[34px] font-semibold ${className}`}>{children}</h1>
}

export function H2({ children, className = "" }) {
  return <h2 className={`text-[24px] leading-[28px] font-semibold ${className}`}>{children}</h2>
}

export function S1({ children, className = "" }) {
  return <h3 className={`text-[18px] leading-[28px] font-semibold ${className}`}>{children}</h3>
}

export function S2({ children, className = "" }) {
  return <h4 className={`text-[16px] leading-[24px] font-semibold ${className}`}>{children}</h4>
}

export function B1({ children, className = "" }) {
  return <p className={`text-[16px] leading-[24px] font-normal ${className}`}>{children}</p>
}

export function B2({ children, className = "" }) {
  return <p className={`text-[16px] leading-[24px] font-medium ${className}`}>{children}</p>
}

export function B3({ children, className = "" }) {
  return <p className={`text-[14px] leading-[20px] font-normal ${className}`}>{children}</p>
}

export function B4({ children, className = "" }) {
  return <p className={`text-[14px] leading-[20px] font-medium ${className}`}>{children}</p>
}

export function C1({ children, className = "" }) {
  return <span className={`text-[12px] leading-[16px] font-normal ${className}`}>{children}</span>
}

export function C2({ children, className = "" }) {
  return <span className={`text-[12px] leading-[16px] font-medium ${className}`}>{children}</span>
}

export function C3({ children, className = "" }) {
  return <span className={`text-[10px] leading-[14px] font-medium ${className}`}>{children}</span>
}

export function Label({ children, className = "" }) {
  return <label className={`text-[12px] leading-[16px] font-medium ${className}`}>{children}</label>
}
