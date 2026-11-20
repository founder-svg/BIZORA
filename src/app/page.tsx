'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscriptionPlans } from '@/lib/mock-data';
import {
  FileText,
  Users2,
  Package,
  WalletCards,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Building,
  Smartphone,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-center py-2 px-4 text-xs font-medium text-blue-100 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        <span>Welcome to <strong>BIZORA</strong> by Wixfox Technologies — Modern Business Operating System for India & Beyond.</span>
        <Link href="/dashboard" className="underline font-bold text-white hover:text-yellow-200 ml-1">
          Explore Live Demo &rarr;
        </Link>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md bg-slate-900/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center">
              <img src="/logo.jpg" alt="BIZORA Logo" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">BIZORA</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                  By Wixfox
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">One Platform. Every Business.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition">Modules</a>
            <a href="#comparison" className="hover:text-blue-400 transition">Why BIZORA</a>
            <a href="#pricing" className="hover:text-blue-400 transition">Pricing Plans</a>
            <a href="#super-admin-info" className="hover:text-blue-400 transition">Super Admin</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/super-admin"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-purple-300 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/60 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Next-Gen Cloud Business Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            One Platform. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Every Business.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Stop juggling 5 different apps for GST Billing, CRM leads, inventory stock, and customer khata.
            BIZORA connects your entire business lifecycle in one unified, modern cloud platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5"
            >
              <span>Open Live Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/invoices"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Create GST Invoice</span>
            </Link>
            <Link
              href="/crm"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition"
            >
              <Users2 className="w-4 h-4 text-purple-400" />
              <span>View CRM Pipeline</span>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% GST Compliant (CGST, SGST, IGST)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp & UPI Integration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multi-Tenant Enterprise Isolation</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Hero Preview */}
        <div className="mt-16 max-w-6xl mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/80 p-4 shadow-2xl shadow-blue-900/30">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 font-mono text-[11px] text-slate-400">bizora.app/workspace/apex-tech</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[10px]">Active Session</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-400">Total Monthly Revenue</p>
              <h3 className="text-2xl font-black text-white mt-1">₹1,25,931</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +18.4% vs last month
              </p>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-400">Active CRM Pipeline</p>
              <h3 className="text-2xl font-black text-indigo-400 mt-1">₹10,60,000</h3>
              <p className="text-[11px] text-slate-400 mt-1">5 Active Deals in Stages</p>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-400">Pending Receivables</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">₹82,470</h3>
              <p className="text-[11px] text-slate-400 mt-1">Auto-Reminders Scheduled</p>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-400">Stock Reorder Alerts</p>
              <h3 className="text-2xl font-black text-rose-400 mt-1">2 Items</h3>
              <p className="text-[11px] text-slate-400 mt-1">Safety buffer reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Module Overview */}
      <section id="features" className="py-20 px-6 bg-slate-950/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Connected Architecture</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              The Complete Business Lifecycle in One Screen
            </p>
            <p className="mt-3 text-slate-400 text-sm">
              Lead &rarr; Customer &rarr; Quotation &rarr; Sales Order &rarr; Invoice &rarr; Payment &rarr; Accounting &rarr; Reporting &rarr; Automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Billing & Invoicing */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart GST Invoicing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate professional Tax Invoices, Quotations, Proforma, and Delivery Challans. Automated CGST, SGST, IGST calculations, HSN/SAC lookups, and UPI QR code embedding.
              </p>
            </div>

            {/* 2. CRM & Sales Pipeline */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 border border-indigo-500/20">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sales CRM & Pipelines</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track leads from first touch to deal closed with Kanban stage boards. Log follow-ups, assign sales reps, capture interaction history, and convert leads into customers with 1 click.
              </p>
            </div>

            {/* 3. Inventory & Barcodes */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Inventory & Multi-Warehouse</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time stock valuation, SKU & barcode management, low-stock reorder alerts, and automatic deductions on invoice generation.
              </p>
            </div>

            {/* 4. Customer Khata & Suppliers */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <WalletCards className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Digital Khata & Accounting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Customer & vendor ledgers with complete transaction balance history. Instant WhatsApp payment reminders and automated payment receipt generation.
              </p>
            </div>

            {/* 5. Business Automations */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp & Trigger Automation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trigger automated payment reminders on due dates, send WhatsApp invoice notifications, and alert inventory managers when items reach minimum threshold.
              </p>
            </div>

            {/* 6. Multi-Tenant Super Admin */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Super Admin Governance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Wixfox platform administration panel: monitor total registered businesses, MRR/ARR growth, subscription licenses, system health, and audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (PRD Aligned) */}
      <section id="pricing" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Transparent Pricing</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              Simple, Predictable Plans for Every Growth Stage
            </p>
            <p className="mt-3 text-slate-400 text-sm">
              Start free, upgrade as your business expands. No hidden surprise charges.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition ${
                  billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual Billing <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.slice(0, 4).map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col justify-between border transition relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                      {plan.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 min-h-[36px]">{plan.tagline}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-white">
                      {typeof plan.monthlyPrice === 'number'
                        ? `₹${billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(Number(plan.annualPrice) / 12)}`
                        : plan.monthlyPrice}
                    </span>
                    {typeof plan.monthlyPrice === 'number' && (
                      <span className="text-xs text-slate-400"> / month</span>
                    )}
                    {billingCycle === 'annual' && typeof plan.annualPrice === 'number' && plan.annualPrice > 0 && (
                      <p className="text-[10px] text-emerald-400 mt-1">Billed annually at ₹{plan.annualPrice}/yr</p>
                    )}
                  </div>

                  <div className="space-y-2.5 border-t border-slate-800 pt-5">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80">
                  <Link
                    href="/dashboard"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-blue-600 flex items-center justify-center p-0.5">
              <img src="/logo.jpg" alt="BIZORA" className="w-full h-full object-cover rounded-md" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">BIZORA</span>
              <p className="text-[11px] text-slate-400">One Platform. Every Business. A Wixfox Technologies Venture.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition">Workspace</Link>
            <Link href="/invoices" className="hover:text-white transition">GST Billing</Link>
            <Link href="/crm" className="hover:text-white transition">CRM</Link>
            <Link href="/super-admin" className="hover:text-white transition">Super Admin</Link>
          </div>

          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Wixfox Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
