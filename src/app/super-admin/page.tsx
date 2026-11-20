'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { subscriptionPlans } from '@/lib/mock-data';
import { AppLayout } from '@/components/AppLayout';
import {
  ShieldCheck,
  Building2,
  Users2,
  TrendingUp,
  Server,
  Activity,
  CheckCircle2,
  ExternalLink,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function SuperAdminPage() {
  const { tenants, currentTenant, switchTenant } = useApp();

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 p-6 rounded-2xl text-white border border-purple-800/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Wixfox Technologies Master Console</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">BIZORA SaaS Super Administrator</h1>
          <p className="text-xs text-slate-300 mt-1">
            Global multi-tenant governance, subscription billing MRR, and database isolation health.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-950/60 p-2 rounded-xl border border-purple-800/80 text-xs font-semibold">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>PostgreSQL RLS: <strong>Enforced</strong></span>
        </div>
      </div>

      {/* Global SaaS Platform KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Tenants</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{tenants.length + 84} Businesses</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+12 this month</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Recurring (MRR)</p>
          <h3 className="text-2xl font-black text-purple-600 mt-1">₹1,48,200</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+24% MoM Growth</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Annualized ARR</p>
          <h3 className="text-2xl font-black text-blue-600 mt-1">₹17,78,400</h3>
          <p className="text-[11px] text-slate-400 mt-1">Projected run-rate</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Availability</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">99.98%</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Nginx + Node + PostgreSQL</p>
        </div>
      </div>

      {/* Tenant Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Tenant Business Workspaces</h2>
            <p className="text-xs text-slate-500">Isolated database schemas with independent branding and RBAC</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            {tenants.length} Active Organizations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">Tenant Name</th>
                <th className="py-3 px-3">Tenant ID</th>
                <th className="py-3 px-3">GSTIN</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-400">{t.legalName} • {t.city}, {t.state}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{t.id}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-800">{t.gstin || 'None'}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {t.planId}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.subscriptionStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => switchTenant(t.id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition ${
                        currentTenant.id === t.id
                          ? 'bg-slate-200 text-slate-500 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {currentTenant.id === t.id ? 'Active Workspace' : 'Switch Workspace'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Plans Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Platform Pricing Plans Matrix (Section 4.2 of PRD)</h2>
        <p className="text-xs text-slate-500 mb-4">
          Super Admin configured entitlement tiers for BIZORA SaaS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {subscriptionPlans.slice(0, 4).map((plan) => (
            <div key={plan.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                <span className="font-mono font-black text-blue-600">₹{plan.monthlyPrice}/mo</span>
              </div>
              <p className="text-[11px] text-slate-500">{plan.tagline}</p>
              <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] text-slate-700">
                {plan.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
  );
}
