import * as React from "react"

export function Zoom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.25 7.5A1.75 1.75 0 0 0 7.5 9.25v5.5a1.75 1.75 0 0 0 1.75 1.75h6.5a1.75 1.75 0 0 0 1.75-1.75v-5.5A1.75 1.75 0 0 0 14.75 7.5zm8.75 2.5 2.25-1.5v7l-2.25-1.5z"/>
    </svg>
  )
}
