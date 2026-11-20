'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  FileText,
  Users2,
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const { currentTenant, invoices, products, leads, customers, expenses } = useApp();

  // Metrics calculations
  const totalSales = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalReceived = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalReceivables = invoices.reduce((sum, inv) => sum + inv.balanceAmount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const lowStockItems = products.filter((p) => p.currentStock <= p.minStockLevel && !p.isService);
  const upcomingFollowups = leads.filter((l) => l.nextFollowUpDate && l.stage !== 'won' && l.stage !== 'lost');

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Workspace: {currentTenant.legalName}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Business Overview & Intelligence</h1>
          <p className="text-blue-100 text-xs mt-1">
            GSTIN: <span className="font-mono font-semibold">{currentTenant.gstin || 'Not Configured'}</span> • State: {currentTenant.state} • Currency: {currentTenant.currency}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/invoices?action=new"
            className="inline-flex items-center gap-1.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Invoice</span>
          </Link>
          <Link
            href="/crm?action=new-lead"
            className="inline-flex items-center gap-1.5 bg-blue-700/80 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-sm transition"
          >
            <Users2 className="w-4 h-4" />
            <span>+ Add Lead</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales Invoiced</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-3">₹{totalSales.toLocaleString('en-IN')}</h3>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{invoices.length} Invoices generated</span>
          </div>
        </div>

        {/* Received */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Collected Payments</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </div>
          </div>
          <h3 className="text-2xl font-black text-emerald-600 mt-3">₹{totalReceived.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-2">Cash & Bank reconciled</p>
        </div>

        {/* Pending Receivables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Receivables</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              ⏳
            </div>
          </div>
          <h3 className="text-2xl font-black text-amber-600 mt-3">₹{totalReceivables.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-2">From active customer balances</p>
        </div>

        {/* Operating Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operating Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              📉
            </div>
          </div>
          <h3 className="text-2xl font-black text-purple-600 mt-3">₹{totalExpenses.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-2">Tracked business outflows</p>
        </div>
      </div>

      {/* Middle Section: Recent Invoices & CRM / Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Invoices & Transactions</h2>
              <p className="text-xs text-slate-400">Latest GST and commercial billings</p>
            </div>
            <Link
              href="/invoices"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Invoice No</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-semibold text-slate-900 font-mono">
                      <Link href={`/invoices/${inv.id}`} className="hover:text-blue-600">
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="py-3">
                      <div className="font-medium text-slate-800">{inv.customerName}</div>
                      <div className="text-[11px] text-slate-400">{inv.customerState}</div>
                    </td>
                    <td className="py-3 text-slate-500">{inv.date}</td>
                    <td className="py-3 font-bold text-slate-900">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inv.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : inv.paymentStatus === 'partial'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/invoices/${inv.id}`}
                        className="p-1.5 text-slate-400 hover:text-blue-600 inline-block"
                        title="Print / View Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Alerts & CRM Follow-ups */}
        <div className="space-y-6">
          {/* Low Stock Warning Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inventory Reorder Alerts</h3>
              </div>
              <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                {lowStockItems.length} Low
              </span>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-xs text-slate-400">All inventory stocks are at healthy safety levels.</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-rose-600">{item.currentStock} {item.unit}</span>
                      <p className="text-[10px] text-slate-400">Min: {item.minStockLevel}</p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/inventory"
                  className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 pt-1"
                >
                  Manage Stock In & Out &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming CRM Follow-ups */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Upcoming CRM Follow-ups</h3>
              </div>
              <Link href="/crm" className="text-[10px] font-semibold text-indigo-600">
                Kanban &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingFollowups.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/60">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{lead.title}</p>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                      ₹{(lead.estimatedValue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{lead.contactName} • {lead.companyName}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                    <Clock className="w-3 h-3 text-indigo-500" />
                    <span>Follow-up: {lead.nextFollowUpDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
}
