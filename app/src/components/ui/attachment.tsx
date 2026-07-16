import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Image01Icon, File02Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  file: File | { name: string; size?: number; type?: string; url?: string }
  onRemove?: () => void
  isUploading?: boolean
  progress?: number
}

function Attachment({
  className,
  file,
  onRemove,
  isUploading,
  progress,
  ...props
}: AttachmentProps) {
  const isImage = file.type?.startsWith("image/")

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isImage && file instanceof File) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else if (isImage && !(file instanceof File) && file.url) {
      setPreviewUrl(file.url)
    }
  }, [file, isImage])

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 border border-border bg-card p-2 rounded-none transition-colors group",
        isUploading && "opacity-70",
        className
      )}
      {...props}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted text-muted-foreground border border-border/50">
        {isImage ? (
          previewUrl ? (
            <img 
              src={previewUrl} 
              alt={file.name} 
              className="h-full w-full object-cover" 
            />
          ) : (
            <HugeiconsIcon icon={Image01Icon} strokeWidth={1.5} className="size-5" />
          )
        ) : (
          <HugeiconsIcon icon={File02Icon} strokeWidth={1.5} className="size-5" />
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1 justify-center gap-0.5">
        <span className="text-xs font-medium text-foreground truncate block w-full">
          {file.name}
        </span>
        {file.size && (
          <span className="text-[10px] font-mono text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        )}
        {isUploading && typeof progress === "number" && (
          <div className="h-1 w-full bg-muted mt-1 overflow-hidden">
            <div 
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
        {isUploading && progress === undefined && (
          <span className="text-[10px] text-muted-foreground mt-1">Uploading...</span>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-background border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Remove attachment"
        >
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
        </button>
      )}
    </div>
  )
}

export { Attachment }
