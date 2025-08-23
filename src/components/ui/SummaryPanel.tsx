import React from "react";

interface Stat {
  label: string;
  value: React.ReactNode;
}

interface SummaryPanelProps {
  title: string;
  stats: Stat[];
  children?: React.ReactNode;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  title,
  stats,
  children,
}) => (
  <aside className="w-64 p-4 bg-muted rounded-lg">
    <h2 className="font-bold mb-2 text-lg">{title}</h2>
    <div className="space-y-1 mb-2">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex justify-between">
          <span className="text-sm text-muted-foreground">{stat.label}</span>
          <span className="font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
    {children}
  </aside>
);
