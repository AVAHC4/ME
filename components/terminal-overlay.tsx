'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    LayoutDashboard,
    FolderKanban,
    Ship,
    FileText,
    Sun,
    Moon,
    Laptop,
    Copy,
    Terminal,
    Home
} from 'lucide-react'
import { toast } from 'sonner'

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command'

export function TerminalOverlay() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { setTheme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '~' || e.key === '`') {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Suggestions">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push('/'))}
                    >
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                        <CommandShortcut>cd ~</CommandShortcut>
                    </CommandItem>

                    <CommandItem
                        onSelect={() => runCommand(() => window.open('https://github.com/AVAHC4?tab=repositories', '_blank'))}
                    >
                        <FolderKanban className="mr-2 h-4 w-4" />
                        <span>Projects</span>
                        <CommandShortcut>cd projects</CommandShortcut>
                    </CommandItem>

                    <CommandItem
                        onSelect={() => runCommand(() => router.push('/ship-log'))}
                    >
                        <Ship className="mr-2 h-4 w-4" />
                        <span>Ship Log</span>
                        <CommandShortcut>cd ship-log</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Files">
                    <CommandItem
                        onSelect={() => runCommand(() => toast('Hi, I\'m Akhil. I build stuff on the internet.', { description: "File: about.md" }))}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Read about.md</span>
                        <CommandShortcut>cat</CommandShortcut>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => toast('Find me on Twitter or GitHub!', { description: "File: contact.txt" }))}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Read contact.txt</span>
                        <CommandShortcut>cat</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="System">
                    <CommandItem
                        onSelect={() => runCommand(() => {
                            const url = window.location.href
                            navigator.clipboard.writeText(url)
                            toast.success('URL copied to clipboard')
                        })}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy Current URL</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => setTheme('light'))}
                    >
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Theme: Light</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => setTheme('dark'))}
                    >
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Theme: Dark</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => setTheme('system'))}
                    >
                        <Laptop className="mr-2 h-4 w-4" />
                        <span>Theme: System</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => toast('visitor@kalash-replica', { description: "Current User" }))}
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Who Am I</span>
                        <CommandShortcut>whoami</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
