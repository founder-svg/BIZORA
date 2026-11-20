'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  Zap,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  BellRing,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export default function AutomationPage() {
  const { automationRules, toggleAutomationRule } = useApp();

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Business Automation & Triggers</h1>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
            Smart Workflows
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Eliminate repetitive administrative tasks with automated WhatsApp payment reminders and stock alerts.
        </p>
      </div>

      {/* Meta WhatsApp Integration Status Banner */}
      <div className="bg-emerald-950 text-emerald-100 p-6 rounded-2xl border border-emerald-800/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Meta WhatsApp Business API Integration</h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                Connected
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              Official WhatsApp Business Cloud API ready. Supports automatic message delivery with dynamic placeholders.
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold bg-emerald-900/60 px-4 py-2 rounded-xl border border-emerald-700/60 text-emerald-200">
          Sender ID: <span className="font-mono text-white">+91 98201 12345 (Verified)</span>
        </div>
      </div>

      {/* Automation Rules Grid */}
      <div className="space-y-4">
        {automationRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-blue-300"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${rule.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <h3 className="text-sm font-bold text-slate-900">{rule.name}</h3>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase">
                  {rule.triggerType.replace('_', ' ')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs font-mono text-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans mb-1">
                  Message Template Payload:
                </span>
                {rule.template}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className={`text-xs font-bold uppercase tracking-wider ${rule.enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                {rule.enabled ? 'Active' : 'Paused'}
              </span>

              <button
                onClick={() => toggleAutomationRule(rule.id)}
                className={`p-1.5 rounded-xl transition ${rule.enabled ? 'text-blue-600 hover:text-blue-700' : 'text-slate-300 hover:text-slate-400'}`}
              >
                {rule.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
  );
}
