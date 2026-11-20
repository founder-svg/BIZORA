'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  Settings,
  Building,
  CreditCard,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const { currentTenant, updateTenantSettings } = useApp();
  const [name, setName] = useState(currentTenant.name);
  const [legalName, setLegalName] = useState(currentTenant.legalName);
  const [gstin, setGstin] = useState(currentTenant.gstin || '');
  const [pan, setPan] = useState(currentTenant.pan || '');
  const [email, setEmail] = useState(currentTenant.email);
  const [phone, setPhone] = useState(currentTenant.phone);
  const [address, setAddress] = useState(currentTenant.address);
  const [city, setCity] = useState(currentTenant.city);
  const [state, setState] = useState(currentTenant.state);
  const [pincode, setPincode] = useState(currentTenant.pincode);

  // Bank
  const [bankName, setBankName] = useState(currentTenant.bankDetails?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(currentTenant.bankDetails?.accountNumber || '');
  const [ifsc, setIfsc] = useState(currentTenant.bankDetails?.ifsc || '');
  const [upiId, setUpiId] = useState(currentTenant.bankDetails?.upiId || '');

  // Invoice
  const [prefix, setPrefix] = useState(currentTenant.invoiceSettings.prefix);
  const [terms, setTerms] = useState(currentTenant.invoiceSettings.termsAndConditions);

  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantSettings({
      name,
      legalName,
      gstin,
      pan,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      bankDetails: {
        accountName: legalName,
        bankName,
        accountNumber,
        ifsc,
        branch: currentTenant.bankDetails?.branch || '',
        upiId,
      },
      invoiceSettings: {
        ...currentTenant.invoiceSettings,
        prefix,
        termsAndConditions: terms,
      },
    });

    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Business Settings</h1>
          <p className="text-xs text-slate-500">
            Configure company identity, GST compliance, bank payout details, and invoice sequences
          </p>
        </div>

        {savedAlert && (
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Organization Identity & Location</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Brand Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Legal Registered Entity Name</label>
              <input
                type="text"
                required
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">GSTIN</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">PAN Number</label>
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Support Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Business Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bank & Payment Settlement */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Bank Accounts & UPI QR Configuration</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Primary UPI ID for QR Generation</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Customization */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900">Invoice Numbering & Default Terms</h2>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Invoice Prefix Series</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">Next invoice generated: <strong>{prefix}00104</strong></p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Terms & Conditions (Printed on Bills)</label>
            <textarea
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 text-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration</span>
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
  );
}
