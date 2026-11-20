'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Plus,
  Bell,
  HelpCircle,
  Sparkles,
  FileText,
  Users2,
  Package,
  Receipt,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentTenant, invoices, products, leads } = useApp();
  const [showQuickAction, setShowQuickAction] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Compute alerts
  const lowStockCount = products.filter((p) => p.currentStock <= p.minStockLevel && !p.isService).length;
  const pendingInvoicesCount = invoices.filter((i) => i.paymentStatus === 'unpaid' || i.paymentStatus === 'overdue').length;

  return (
    <header className="no-print h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search invoices, clients, leads, HSN or SKUs (Ctrl + K)..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Create Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAction(!showQuickAction)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </button>

          {showQuickAction && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</div>
              <Link
                href="/invoices?action=new"
                onClick={() => setShowQuickAction(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>New GST Invoice</span>
              </Link>
              <Link
                href="/crm?action=new-lead"
                onClick={() => setShowQuickAction(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <Users2 className="w-4 h-4 text-indigo-600" />
                <span>Add Sales Lead</span>
              </Link>
              <Link
                href="/inventory?action=new-item"
                onClick={() => setShowQuickAction(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <Package className="w-4 h-4 text-emerald-600" />
                <span>Add Product / Service</span>
              </Link>
              <Link
                href="/accounting?action=new-expense"
                onClick={() => setShowQuickAction(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <Receipt className="w-4 h-4 text-amber-600" />
                <span>Record Expense</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition"
          >
            <Bell className="w-4 h-4" />
            {(lowStockCount > 0 || pendingInvoicesCount > 0) && (
              <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-30">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications & Alerts</span>
                <span className="text-[10px] text-blue-600 font-medium">Clear all</span>
              </div>
              <div className="space-y-2">
                {lowStockCount > 0 && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-xs">
                    <p className="font-semibold text-amber-900">Low Stock Alert</p>
                    <p className="text-[11px] text-amber-700 mt-0.5">{lowStockCount} items have fallen below safety inventory reorder level.</p>
                  </div>
                )}
                {pendingInvoicesCount > 0 && (
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/60 text-xs">
                    <p className="font-semibold text-blue-900">Payment Follow-ups</p>
                    <p className="text-[11px] text-blue-700 mt-0.5">{pendingInvoicesCount} invoices are currently awaiting collection.</p>
                  </div>
                )}
                <div className="p-2.5 rounded-lg bg-slate-50 text-xs text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GST calculations & backup engine running healthy.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            BP
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-none">Bharat Patel</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Admin • {currentTenant.name.split(' ')[0]}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
