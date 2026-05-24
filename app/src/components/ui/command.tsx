import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, Tick02Icon } from "@hugeicons/core-free-icons"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return React.createElement(
    CommandPrimitive,
    Object.assign({}, props, {
      "data-slot": "command",
      className: cn(
        "flex size-full flex-col overflow-hidden rounded-none bg-popover p-1 text-popover-foreground",
        className
      ),
    }) as React.ComponentProps<typeof CommandPrimitive> & { "data-slot": string }
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return React.createElement(
    Dialog,
    props,
    <>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-none! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! bg-input/20 dark:bg-input/30">
      {React.createElement(
        CommandPrimitive.Input,
        Object.assign({}, props, {
          "data-slot": "command-input",
          className: cn(
            "w-full text-xs/relaxed outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
        }) as React.ComponentProps<typeof CommandPrimitive.Input> & { "data-slot": string }
      )}
        <InputGroupAddon>
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-3.5 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return React.createElement(
    CommandPrimitive.List,
    Object.assign({}, props, {
      "data-slot": "command-list",
      className: cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      ),
    }) as React.ComponentProps<typeof CommandPrimitive.List> & { "data-slot": string }
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return React.createElement(
    CommandPrimitive.Empty,
    Object.assign({}, props, {
      "data-slot": "command-empty",
      className: cn("py-6 text-center text-xs/relaxed", className),
    }) as React.ComponentProps<typeof CommandPrimitive.Empty> & { "data-slot": string }
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return React.createElement(
    CommandPrimitive.Group,
    Object.assign({}, props, {
      "data-slot": "command-group",
      className: cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
    }) as React.ComponentProps<typeof CommandPrimitive.Group> & { "data-slot": string }
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return React.createElement(
    CommandPrimitive.Separator,
    Object.assign({}, props, {
      "data-slot": "command-separator",
      className: cn("-mx-1 my-1 h-px bg-border/50", className),
    }) as React.ComponentProps<typeof CommandPrimitive.Separator> & { "data-slot": string }
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return React.createElement(
    CommandPrimitive.Item,
    Object.assign({}, props, {
      "data-slot": "command-item",
      className: cn(
        "group/command-item relative flex min-h-7 cursor-default items-center gap-2 rounded-none px-2.5 py-1.5 text-xs/relaxed outline-hidden select-none in-data-[slot=dialog-content]:rounded-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 data-selected:*:[svg]:text-foreground",
        className
      ),
    }) as React.ComponentProps<typeof CommandPrimitive.Item> & { "data-slot": string },
    <>
      {children}
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return React.createElement("span", {
    "data-slot": "command-shortcut",
    className: cn(
      "ml-auto text-[0.625rem] tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
      className
    ),
    ...props,
  })
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
