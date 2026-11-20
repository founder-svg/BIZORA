'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Users2,
  Package,
  Contact2,
  WalletCards,
  Zap,
  Settings,
  ShieldCheck,
  Building2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentTenant, tenants, switchTenant, currentUserRole, setCurrentUserRole, isSuperAdminView, setIsSuperAdminView } = useApp();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Billing & Invoices', href: '/invoices', icon: FileText },
    { name: 'CRM & Pipelines', href: '/crm', icon: Users2 },
    { name: 'Inventory & Stock', href: '/inventory', icon: Package },
    { name: 'Customers & Khata', href: '/customers', icon: Contact2 },
    { name: 'Accounting & GST', href: '/accounting', icon: WalletCards },
    { name: 'Automations', href: '/automation', icon: Zap },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="no-print w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-0.5">
            <img src="/logo.jpg" alt="BIZORA Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition">BIZORA</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-semibold border border-blue-500/30">v1.0</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">By Wixfox Technologies</p>
          </div>
        </Link>
      </div>

      {/* Tenant / Workspace Selector */}
      <div className="px-3 py-3 border-b border-slate-800/80">
        <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-1 block">Active Workspace</label>
        <div className="relative">
          <select
            value={currentTenant.id}
            onChange={(e) => switchTenant(e.target.value)}
            className="w-full bg-slate-800/90 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 pr-8 rounded-lg border border-slate-700/80 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
          >
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.state})
              </option>
            ))}
          </select>
          <Building2 className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
        <div className="flex items-center justify-between px-2 mt-2">
          <span className="text-[11px] text-slate-400">Plan: <span className="font-semibold text-emerald-400 uppercase">{currentTenant.planId}</span></span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">GST: {currentTenant.gstin ? 'Verified' : 'Unregistered'}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 py-1">Business Modules</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Super Admin Section */}
        <div className="pt-4 mt-4 border-t border-slate-800">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 py-1">Platform Admin</div>
          <Link
            href="/super-admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              pathname === '/super-admin'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'text-purple-300/80 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Super Admin Portal</span>
          </Link>
        </div>
      </nav>

      {/* Role Switcher & User Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-slate-400">Simulate Role</span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase">{currentUserRole.replace('_', ' ')}</span>
          </div>
          <select
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as any)}
            className="w-full bg-slate-900 text-slate-200 text-xs py-1.5 px-2 rounded border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="business_owner">Business Owner (Full Access)</option>
            <option value="accountant">Accountant (Invoices & Books)</option>
            <option value="salesperson">Salesperson (CRM & Orders)</option>
            <option value="inventory_manager">Inventory Manager (Stock)</option>
            <option value="super_admin">Super Administrator</option>
          </select>
        </div>
      </div>
    </aside>
  );
};
