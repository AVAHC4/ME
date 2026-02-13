"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";

// Dynamic import with NO SSR to prevent window is not defined errors
// @ts-ignore
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function BrainGraph() {
    const { theme } = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fgRef = useRef<any>();

    const isDark = theme === "dark";

    // Define the graph data
    const graphData = useMemo(() => ({
        nodes: [
            // Projects
            { id: "Enggbot", group: 1, val: 20 },
            { id: "ASL Detector", group: 1, val: 15 },
            { id: "ChatMate", group: 1, val: 10 },
            { id: "NYTimes Replica", group: 1, val: 10 },
            { id: "Kalash Replica", group: 1, val: 5 },

            // Skills / Tech
            { id: "React", group: 2, val: 10 },
            { id: "Next.js", group: 2, val: 10 },
            { id: "TypeScript", group: 2, val: 10 },
            { id: "Tailwind", group: 2, val: 8 },
            { id: "Python", group: 2, val: 10 },
            { id: "AI/ML", group: 2, val: 12 },
            { id: "TensorFlow", group: 2, val: 8 },
            { id: "Node.js", group: 2, val: 8 },
            { id: "MongoDB", group: 2, val: 6 },
            { id: "PostgreSQL", group: 2, val: 6 },
        ],
        links: [
            // Enggbot links
            { source: "Enggbot", target: "React" },
            { source: "Enggbot", target: "Next.js" },
            { source: "Enggbot", target: "TypeScript" },
            { source: "Enggbot", target: "Tailwind" },
            { source: "Enggbot", target: "MongoDB" },
            { source: "Enggbot", target: "AI/ML" },

            // ASL Detector links
            { source: "ASL Detector", target: "Python" },
            { source: "ASL Detector", target: "TensorFlow" },
            { source: "ASL Detector", target: "AI/ML" },

            // ChatMate links
            { source: "ChatMate", target: "React" },
            { source: "ChatMate", target: "TypeScript" },
            { source: "ChatMate", target: "AI/ML" },

            // NYTimes Replica links
            { source: "NYTimes Replica", target: "React" },
            { source: "NYTimes Replica", target: "Next.js" },
            { source: "NYTimes Replica", target: "Tailwind" },

            // Kalash Replica links
            { source: "Kalash Replica", target: "React" },
            { source: "Kalash Replica", target: "Next.js" },
            { source: "Kalash Replica", target: "TypeScript" },
            { source: "Kalash Replica", target: "Tailwind" },

            // Skill clusters (inter-skill connections)
            { source: "React", target: "Next.js" },
            { source: "Next.js", target: "TypeScript" },
            { source: "TypeScript", target: "Node.js" },
            { source: "Python", target: "AI/ML" },
            { source: "AI/ML", target: "TensorFlow" },
        ],
    }), []);

    return (
        <div className="h-[600px] w-full overflow-hidden rounded-lg border border-border bg-background">
            <ForceGraph3D
                ref={fgRef}
                graphData={graphData}
                backgroundColor={isDark ? "#000000" : "#ffffff"}
                nodeLabel="id"
                nodeColor={(node: any) => {
                    // Projects (Pink/Magenta) : Skills (Blue/Indigo)
                    if (node.group === 1) return isDark ? "#ec4899" : "#d946ef";
                    return isDark ? "#3b82f6" : "#4338ca";
                }}
                nodeVal={(node: any) => node.val}
                linkColor={() => isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                linkWidth={1}
                nodeResolution={16}
                cooldownTicks={100}
                onNodeClick={(node: any) => {
                    // Aim at node from outside it
                    const distance = 40;
                    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

                    fgRef.current?.cameraPosition(
                        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                        node, // lookAt ({ x, y, z })
                        3000 // ms transition duration
                    );
                }}
            />
        </div>
    );
}
