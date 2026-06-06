"use client";

import type { ComponentType, ReactNode } from "react";
import { DashboardCard } from "@/components/DashboardCard";

interface ChartCardProps {
  title: string;
  eyebrow?: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
  delay?: number;
}

export function ChartCard({ title, eyebrow, icon, children, delay = 0 }: ChartCardProps) {
  return (
    <DashboardCard title={title} eyebrow={eyebrow} icon={icon} delay={delay}>
      <div className="h-[250px] min-w-0">{children}</div>
    </DashboardCard>
  );
}
