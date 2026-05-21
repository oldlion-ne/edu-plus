import * as React from "react"

export function Linear(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 13v1c0 1.1.9 2 2 2h2v3.93zm4.79-4.8c-.28-.58-.79-1-1.42-1.13L15 13.5v-2c0-.55-.45-1-1-1h-4v-1.5c0-.83.67-1.5 1.5-1.5h1.8c.36-.61.98-1.07 1.7-1.25V5.07c3.95.49 7 3.85 7 7.93 0 1.25-.28 2.43-.79 3.49l-1.42.31z" />
    </svg>
  )
}
