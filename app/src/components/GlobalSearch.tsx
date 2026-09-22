import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { searchIndex } from "@/data/searchIndex"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-primary font-bold rounded-none px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export function GlobalSearch({ open, setOpen }: GlobalSearchProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  // Reset query when closed
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!open) {
      timer = setTimeout(() => setQuery(""), 150)
    }
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [open])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  // Group search items by category
  const groupedItems = searchIndex.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof searchIndex>)

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput 
          placeholder="Type a command or search..." 
          className="font-sans rounded-none" 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="font-sans rounded-none">
          <CommandEmpty className="py-6 text-center text-sm font-sans text-muted-foreground">
            No results found.
          </CommandEmpty>
          
          {Object.entries(groupedItems).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => runCommand(() => navigate(item.path))}
                  className="rounded-none cursor-pointer flex flex-col items-start gap-1 py-3"
                >
                  <span className="font-medium text-foreground text-sm">
                    <Highlight text={item.title} query={query} />
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <Highlight text={item.description} query={query} />
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
