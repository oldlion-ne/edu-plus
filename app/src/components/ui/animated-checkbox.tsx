import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

function AnimatedCheckbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [internalChecked, setInternalChecked] = React.useState<boolean | "indeterminate">(false)
  const isChecked = checked !== undefined ? checked : internalChecked

  const handleCheckedChange = (val: boolean | "indeterminate") => {
    if (onCheckedChange) {
      onCheckedChange(val)
    } else {
      setInternalChecked(val)
    }
  }

  return (
    <CheckboxPrimitive.Root
      data-slot="animated-checkbox"
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-none border border-input transition-colors duration-200 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current [&>svg]:size-3.5"
        asChild
      >
        <AnimatePresence initial={false} mode="wait">
          {isChecked && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { AnimatedCheckbox }
