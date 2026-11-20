'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  WalletCards,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileCheck2,
  Calendar,
  Building,
  CreditCard,
} from 'lucide-react';

export default function AccountingPage() {
  const { currentTenant, invoices, expenses, addExpense } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Expense form
  const [category, setCategory] = useState('Office Rent & Utilities');
  const [amount, setAmount] = useState<number>(5000);
  const [payee, setPayee] = useState('');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'Bank Transfer' | 'UPI' | 'Cheque'>('UPI');
  const [referenceNo, setReferenceNo] = useState('');
  const [notes, setNotes] = useState('');

  // Calculations
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.grandTotal, 0);
  const totalTaxableSales = invoices.reduce((sum, i) => sum + (i.subtotal - i.discountTotal), 0);
  const totalGSTCollected = invoices.reduce((sum, i) => sum + i.taxTotal, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalInvoiced - totalExpenses;

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      tenantId: '',
      category,
      amount,
      date: new Date().toISOString().split('T')[0],
      payee,
      paymentMode,
      referenceNo,
      notes,
    });
    setIsModalOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Accounting & GST Compliance</h1>
          <p className="text-xs text-slate-500">
            Profit & Loss summary, GSTR-1 tax totals, expense tracking, and bank ledger
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Business Expense</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Revenue</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalInvoiced.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">From all billings</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expenses</p>
          <h3 className="text-2xl font-black text-rose-600 mt-1">₹{totalExpenses.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">{expenses.length} Expense entries</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Net Profit</p>
          <h3 className={`text-2xl font-black mt-1 ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            ₹{netProfit.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Revenue minus Expenses</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total GST Output Liability</p>
          <h3 className="text-2xl font-black text-blue-600 mt-1">₹{totalGSTCollected.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">For GSTR-3B filing</p>
        </div>
      </div>

      {/* GSTR-1 & Tax Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">GSTR-1 Monthly Summary (Outward Supplies)</h2>
              <p className="text-xs text-slate-400">Automated tax breakdown for GST portal upload</p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-bold">
            GSTIN: {currentTenant.gstin}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <p className="text-slate-400 text-[11px]">Total Taxable Value</p>
            <p className="text-lg font-black text-white mt-1">₹{totalTaxableSales.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <p className="text-slate-400 text-[11px]">CGST Collected</p>
            <p className="text-lg font-black text-indigo-300 mt-1">
              ₹{invoices.reduce((sum, i) => sum + i.cgstTotal, 0).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <p className="text-slate-400 text-[11px]">SGST Collected</p>
            <p className="text-lg font-black text-indigo-300 mt-1">
              ₹{invoices.reduce((sum, i) => sum + i.sgstTotal, 0).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <p className="text-slate-400 text-[11px]">IGST (Inter-State)</p>
            <p className="text-lg font-black text-blue-300 mt-1">
              ₹{invoices.reduce((sum, i) => sum + i.igstTotal, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Recorded Business Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Payee / Vendor</th>
                <th className="py-3 px-3">Payment Mode</th>
                <th className="py-3 px-3">Ref No</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 font-mono text-slate-600">{exp.date}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{exp.category}</td>
                  <td className="py-3 px-3 text-slate-700">{exp.payee}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {exp.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{exp.referenceNo || '-'}</td>
                  <td className="py-3 px-3 font-bold text-rose-600 text-right">
                    -₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">Record Business Expense</h2>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Expense Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="Office Rent & Utilities">Office Rent & Utilities</option>
                  <option value="Cloud Hosting & Servers">Cloud Hosting & Servers</option>
                  <option value="WhatsApp Business API Credits">WhatsApp Business API Credits</option>
                  <option value="Staff Salaries & Bonus">Staff Salaries & Bonus</option>
                  <option value="Logistics & Delivery">Logistics & Delivery</option>
                  <option value="Marketing & Advertising">Marketing & Advertising</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-base focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Payee / Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Cloud / Landlord"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Ref / Txn No.</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI-998811"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </AppLayout>
  );
}
