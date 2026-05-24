import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return React.createElement(
    ProgressPrimitive.Root,
    Object.assign({}, props, {
      "data-slot": "progress",
      className: cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-none bg-muted",
        className
      ),
    }) as React.ComponentProps<typeof ProgressPrimitive.Root> & { "data-slot": string },
    React.createElement(
      ProgressPrimitive.Indicator,
      Object.assign({}, {
        "data-slot": "progress-indicator",
        className: "size-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` },
      }) as React.ComponentProps<typeof ProgressPrimitive.Indicator> & { "data-slot": string }
    )
  )
}

export { Progress }
