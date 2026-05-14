"use client";

import { DomainMap } from "@/components/domains/DomainMap";

export default function Home() {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <DomainMap />
    </div>
  );
}
