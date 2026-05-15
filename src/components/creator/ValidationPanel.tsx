'use client';

import React, { useEffect, useState } from 'react';
import { useCreatorStore } from '@/store/creatorStore';
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { TreeValidationResult } from '@/types/creator';

export const ValidationPanel = () => {
  const { validateTree, nodes, edges } = useCreatorStore();
  const [validation, setValidation] = useState<TreeValidationResult | null>(null);

  // Re-validate whenever nodes or edges change
  useEffect(() => {
    setValidation(validateTree());
  }, [nodes, edges, validateTree]);

  if (!validation) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-2xl flex items-start space-x-4 max-h-32 overflow-y-auto custom-scrollbar z-50">
      <div className="mt-0.5">
        {validation.isValid && validation.warnings.length === 0 ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : validation.errors.length > 0 ? (
          <XCircle className="w-5 h-5 text-red-500" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        )}
      </div>
      
      <div className="flex-1 text-sm">
        {validation.isValid && validation.warnings.length === 0 && (
          <div className="text-emerald-400 font-semibold mt-0.5">Tree is valid and ready to publish.</div>
        )}
        
        {validation.errors.length > 0 && (
          <div className="mb-2">
            <h4 className="text-red-400 font-bold uppercase text-xs tracking-wider mb-1">Errors</h4>
            <ul className="list-disc list-inside text-red-300 text-xs space-y-1">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div>
            <h4 className="text-amber-400 font-bold uppercase text-xs tracking-wider mb-1">Warnings</h4>
            <ul className="list-disc list-inside text-amber-300 text-xs space-y-1">
              {validation.warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
