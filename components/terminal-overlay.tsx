'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Terminal, X } from 'lucide-react'

interface CommandOutput {
    command: string
    result: React.ReactNode
}

export function TerminalOverlay() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [output, setOutput] = useState<CommandOutput[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Toggle overlay on Cmd+K or ~
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k') || e.key === '~' || e.key === '`') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10)
        }
    }, [isOpen])

    // Scroll to bottom on new output
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [output])

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim()
        if (!trimmedCmd) return

        const [command, ...args] = trimmedCmd.split(' ')
        const arg = args.join(' ')
        let result: React.ReactNode = null

        setHistory((prev) => [...prev, trimmedCmd])
        setHistoryIndex(-1)

        switch (command.toLowerCase()) {
            case 'help':
                result = (
                    <div className="space-y-1 text-green-400">
                        <p>Available commands:</p>
                        <ul className="list-disc pl-5">
                            <li>help - Show this help message</li>
                            <li>ls - List pages/directories</li>
                            <li>cd [page] - Navigate to a page</li>
                            <li>cat [file] - View file content (simulated)</li>
                            <li>whoami - Display current user info</li>
                            <li>clear - Clear the terminal</li>
                            <li>exit - Close the terminal</li>
                        </ul>
                    </div>
                )
                break
            case 'ls':
                result = (
                    <div className="text-blue-400 space-x-4">
                        <span>home</span>
                        <span>projects</span>
                        <span>ship-log</span>
                    </div>
                )
                break
            case 'cd':
                if (!arg) {
                    result = <span className="text-red-400">Usage: cd [page] (e.g., cd projects)</span>
                } else if (['home', '/'].includes(arg)) {
                    router.push('/')
                    result = <span className="text-gray-400">Navigating to home...</span>
                    setIsOpen(false)
                } else if (['projects', '/projects'].includes(arg)) {
                    // Assuming projects link to github, but if we had a page:
                    // router.push('/projects')
                    // For now, based on nav, projects is a link to github.
                    // Let's check if there is a local route. If not, open new tab.
                    // Based on header-nav.tsx: href="https://github.com/AVAHC4?tab=repositories"
                    window.open('https://github.com/AVAHC4?tab=repositories', '_blank')
                    result = <span className="text-gray-400">Opening projects...</span>
                    setIsOpen(false)
                } else if (['ship-log', 'ship_log', '/ship-log'].includes(arg)) {
                    router.push('/ship-log')
                    result = <span className="text-gray-400">Navigating to ship-log...</span>
                    setIsOpen(false)
                } else {
                    result = <span className="text-red-400">Directory not found: {arg}</span>
                }
                break
            case 'cat':
                if (arg === 'about.md') {
                    result = <span className="text-yellow-200">Hi, I'm Akhil. I build stuff on the internet.</span>
                } else if (arg === 'contact.txt') {
                    result = <span className="text-yellow-200">Find me on Twitter or GitHub!</span>
                } else if (!arg) {
                    result = <span className="text-red-400">Usage: cat [file]</span>
                } else {
                    result = <span className="text-red-400">File not found: {arg}. Try 'about.md' or 'contact.txt'</span>
                }
                break
            case 'whoami':
                result = <span className="text-purple-400">visitor@kalash-replica</span>
                break
            case 'clear':
                setOutput([])
                setInput('')
                return
            case 'exit':
                setIsOpen(false)
                return
            default:
                result = <span className="text-red-400">Command not found: {command}. Type 'help' for options.</span>
        }

        setOutput((prev) => [...prev, { command: trimmedCmd, result }])
        setInput('')
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length > 0) {
                const newIndex = historyIndex + 1
                if (newIndex < history.length) {
                    setHistoryIndex(newIndex)
                    setInput(history[history.length - 1 - newIndex])
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setInput(history[history.length - 1 - newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setInput('')
            }
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl h-[60vh] bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl flex flex-col font-mono text-sm overflow-hidden text-neutral-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-400">visitor@kalash-replica:~</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 p-4 overflow-y-auto scrollbar-hide" onClick={() => inputRef.current?.focus()}>
                    <div className="space-y-4 mb-4">
                        <div className="text-neutral-500">
                            Welcome to the hidden terminal! Type <span className="text-green-400">help</span> to get started.
                        </div>
                        {output.map((item, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <span>$</span>
                                    <span className="text-white">{item.command}</span>
                                </div>
                                <div className="pl-4">{item.result}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-neutral-400">
                        <span>$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-600 focus:ring-0 p-0"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    )
}
