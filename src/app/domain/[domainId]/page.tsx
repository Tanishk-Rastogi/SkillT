"use client";

import { use, useMemo } from "react";
import { DOMAINS } from "@/data/domains";
import { ROLES } from "@/data/roles";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, BarChart, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ domainId: string }>;
}

export default function RoleSelectionPage({ params }: PageProps) {
  // In Next.js 15, params is a promise
  const resolvedParams = use(params);
  const domainId = resolvedParams.domainId;

  const domain = useMemo(() => DOMAINS.find((d) => d.id === domainId), [domainId]);
  const roles = useMemo(() => ROLES.filter((r) => r.domainId === domainId), [domainId]);

  if (!domain) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-12 flex flex-col items-start">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-cyber-muted hover:text-white transition-colors mb-6 font-mono text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK TO DOMAIN MAP
        </Link>
        
        <h1 className="text-4xl font-black font-mono tracking-widest text-glow-cyan uppercase mb-4">
          {domain.title}
        </h1>
        <p className="text-xl text-cyber-muted max-w-2xl border-l-2 border-cyber-purple pl-4">
          Select a specialized role to begin your progression. Each path shares common fundamentals but leads to unique mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role, i) => (
          <Link href={`/domain/${domain.id}/role/${role.id}`} key={role.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full bg-cyber-dark border border-white/10 hover:border-cyber-cyan p-8 rounded-xl cursor-pointer group transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyber-purple/10 rounded-full blur-2xl group-hover:bg-cyber-cyan/20 transition-colors duration-500" />
              
              <h2 className="text-2xl font-bold font-mono tracking-wider text-white group-hover:text-glow-cyan mb-4 relative z-10">
                {role.title}
              </h2>
              
              <p className="text-cyber-muted text-sm flex-grow mb-8 relative z-10">
                {role.description}
              </p>

              <div className="space-y-3 font-mono text-xs text-cyber-muted relative z-10 border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><BarChart className="w-4 h-4 text-cyber-purple" /> Difficulty</span>
                  <span className="text-white font-bold tracking-widest">{role.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyber-cyan" /> Estimated Time</span>
                  <span className="text-white">{role.estimatedTime}</span>
                </div>
                <div className="mt-4 pt-2">
                  <div className="flex items-center gap-2 mb-2"><Briefcase className="w-4 h-4 text-cyber-green" /> Career Outcomes</div>
                  <div className="flex flex-wrap gap-2">
                    {role.careerOutcomes.map(outcome => (
                      <span key={outcome} className="px-2 py-1 bg-white/5 rounded text-[10px] tracking-wider text-white/80">
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}

        {roles.length === 0 && (
          <div className="col-span-full py-12 text-center text-cyber-muted font-mono border border-white/10 border-dashed rounded-xl">
            Roles for this domain are currently under construction.
          </div>
        )}
      </div>
    </div>
  );
}
