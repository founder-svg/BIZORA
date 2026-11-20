'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { LeadStage, Lead } from '@/types';
import { AppLayout } from '@/components/AppLayout';
import {
  Users2,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const STAGES: { id: LeadStage; title: string; color: string; bg: string; border: string }[] = [
  { id: 'new', title: 'New Leads', color: 'text-blue-700', bg: 'bg-blue-50/70', border: 'border-blue-200' },
  { id: 'contacted', title: 'Contacted', color: 'text-indigo-700', bg: 'bg-indigo-50/70', border: 'border-indigo-200' },
  { id: 'qualified', title: 'Qualified', color: 'text-cyan-700', bg: 'bg-cyan-50/70', border: 'border-cyan-200' },
  { id: 'proposal', title: 'Proposal Sent', color: 'text-amber-700', bg: 'bg-amber-50/70', border: 'border-amber-200' },
  { id: 'won', title: 'Won / Closed', color: 'text-emerald-700', bg: 'bg-emerald-50/70', border: 'border-emerald-200' },
  { id: 'lost', title: 'Lost', color: 'text-rose-700', bg: 'bg-rose-50/70', border: 'border-rose-200' },
];

export default function CRMPage() {
  const { leads, addLead, updateLeadStage, addCustomer } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Lead Form State
  const [title, setTitle] = useState('');
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [estimatedValue, setEstimatedValue] = useState<number>(50000);
  const [source, setSource] = useState('Website Inbound');
  const [assignedTo, setAssignedTo] = useState('Amit Verma');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');

  const totalPipelineValue = leads
    .filter((l) => l.stage !== 'lost')
    .reduce((sum, l) => sum + l.estimatedValue, 0);

  const wonDealsCount = leads.filter((l) => l.stage === 'won').length;

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      tenantId: '',
      title,
      contactName,
      companyName,
      email,
      phone,
      stage: 'new',
      estimatedValue,
      source,
      assignedTo,
      nextFollowUpDate,
      notes,
    });
    // Reset
    setTitle('');
    setContactName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setIsModalOpen(false);
  };

  const handleConvertToCustomer = (lead: Lead) => {
    addCustomer({
      tenantId: lead.tenantId,
      name: lead.contactName,
      company: lead.companyName,
      email: lead.email,
      phone: lead.phone,
      billingAddress: 'Address collected during onboarding',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      type: 'customer',
    });
    updateLeadStage(lead.id, 'won');
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sales CRM & Pipelines</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Core USP Module
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your sales funnels, track follow-ups, and convert leads to paying accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Pipeline Value</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalPipelineValue.toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Leads</p>
            <h3 className="text-2xl font-black text-indigo-600 mt-1">{leads.length} Leads</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Won Deals Converted</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{wonDealsCount} Closed</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
            const stageTotal = stageLeads.reduce((sum, l) => sum + l.estimatedValue, 0);

            return (
              <div key={stage.id} className="min-w-[240px] flex flex-col bg-slate-100/70 rounded-2xl border border-slate-200 p-3">
                {/* Column Header */}
                <div className={`p-2.5 rounded-xl ${stage.bg} ${stage.border} border mb-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black ${stage.color}`}>{stage.title}</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 shadow-xs">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600 mt-1">
                    ₹{(stageTotal / 1000).toFixed(0)}k
                  </p>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm hover:shadow-md transition text-xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-900 leading-snug">{lead.title}</h4>
                        <span className="font-mono font-bold text-blue-600 shrink-0">
                          ₹{(lead.estimatedValue / 1000).toFixed(0)}k
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600">
                        <p className="font-semibold text-slate-800">{lead.companyName}</p>
                        <p className="text-slate-400">{lead.contactName}</p>
                      </div>

                      {lead.nextFollowUpDate && (
                        <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 bg-indigo-50/60 px-2 py-1 rounded-md border border-indigo-100">
                          <Clock className="w-3 h-3" />
                          <span>Follow-up: {lead.nextFollowUpDate}</span>
                        </div>
                      )}

                      {/* Lead Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 text-[10px]">{lead.assignedTo}</span>

                        <div className="flex items-center gap-1">
                          {lead.stage !== 'won' && (
                            <button
                              onClick={() => handleConvertToCustomer(lead)}
                              title="Convert to Customer & Won"
                              className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}

                          {/* Quick stage selector */}
                          <select
                            value={lead.stage}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                            className="text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Opportunity</th>
                <th className="py-3.5 px-4">Company & Contact</th>
                <th className="py-3.5 px-4">Estimated Value</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{lead.title}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{lead.companyName}</div>
                    <div className="text-[11px] text-slate-400">{lead.contactName} • {lead.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ₹{lead.estimatedValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{lead.source}</td>
                  <td className="py-3.5 px-4 text-slate-600">{lead.assignedTo}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleConvertToCustomer(lead)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Convert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-4">Add Sales Lead to Pipeline</h2>
            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10-Branch Retail POS Deployment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Retail Pvt Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunil Mehta"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="contact@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Deal Value (₹)</label>
                  <input
                    type="number"
                    required
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Next Follow-Up</label>
                  <input
                    type="date"
                    value={nextFollowUpDate}
                    onChange={(e) => setNextFollowUpDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
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
                  Save Lead
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
