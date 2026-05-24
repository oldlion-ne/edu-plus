import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return React.createElement(
    ResizablePrimitive.Group,
    Object.assign({}, props, {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      ),
    }) as ResizablePrimitive.GroupProps & { "data-slot": string }
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return React.createElement(
    ResizablePrimitive.Panel,
    Object.assign({}, props, {
      "data-slot": "resizable-panel",
    }) as ResizablePrimitive.PanelProps & { "data-slot": string }
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return React.createElement(
    ResizablePrimitive.Separator,
    Object.assign({}, props, {
      "data-slot": "resizable-handle",
      className: cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
    }) as ResizablePrimitive.SeparatorProps & { "data-slot": string },
    withHandle &&
      React.createElement("div", {
        className: "z-10 flex h-6 w-1 shrink-0 rounded-none bg-border",
      })
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
