'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { InvoiceItem, InvoiceDocumentType, PaymentStatus } from '@/types';
import { AppLayout } from '@/components/AppLayout';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Printer,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export default function InvoicesPage() {
  const { currentTenant, invoices, addInvoice, updateInvoiceStatus, customers, products } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for creating a new invoice
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [docType, setDocType] = useState<InvoiceDocumentType>('tax_invoice');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
  );
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-new-1',
      productId: products[0]?.id || '',
      description: products[0]?.name || 'Consulting & Implementation Services',
      hsnCode: products[0]?.hsnCode || '998314',
      quantity: 1,
      unit: products[0]?.unit || 'Pcs',
      unitPrice: products[0]?.sellingPrice || 5000,
      discountPercent: 0,
      gstRate: products[0]?.taxRate || 18,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      total: 0,
    },
  ]);
  const [notes, setNotes] = useState('Thank you for your business!');

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  // GST Calculation helper
  const isInterState = selectedCustomer?.state?.toLowerCase().trim() !== currentTenant.state?.toLowerCase().trim();

  // Calculate items with tax
  const calculatedItems = items.map((item) => {
    const gross = item.quantity * item.unitPrice;
    const discount = (gross * item.discountPercent) / 100;
    const taxable = gross - discount;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterState) {
      igst = (taxable * item.gstRate) / 100;
    } else {
      cgst = (taxable * (item.gstRate / 2)) / 100;
      sgst = (taxable * (item.gstRate / 2)) / 100;
    }
    const total = taxable + cgst + sgst + igst;
    return {
      ...item,
      cgstAmount: cgst,
      sgstAmount: sgst,
      igstAmount: igst,
      total,
    };
  });

  const subtotal = calculatedItems.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
  const discountTotal = calculatedItems.reduce((acc, i) => acc + (i.quantity * i.unitPrice * i.discountPercent) / 100, 0);
  const cgstTotal = calculatedItems.reduce((acc, i) => acc + i.cgstAmount, 0);
  const sgstTotal = calculatedItems.reduce((acc, i) => acc + i.sgstAmount, 0);
  const igstTotal = calculatedItems.reduce((acc, i) => acc + i.igstAmount, 0);
  const taxTotal = cgstTotal + sgstTotal + igstTotal;
  const rawTotal = subtotal - discountTotal + taxTotal;
  const grandTotal = Math.round(rawTotal);
  const roundOff = Number((grandTotal - rawTotal).toFixed(2));

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        productId: '',
        description: '',
        hsnCode: '',
        quantity: 1,
        unit: 'Pcs',
        unitPrice: 0,
        discountPercent: 0,
        gstRate: 18,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleProductSelect = (index: number, prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      productId: prod.id,
      description: prod.name,
      hsnCode: prod.hsnCode || '',
      unit: prod.unit,
      unitPrice: prod.sellingPrice,
      gstRate: prod.taxRate,
    };
    setItems(newItems);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    const invoiceNumber = `${currentTenant.invoiceSettings.prefix}${String(
      currentTenant.invoiceSettings.nextNumber + invoices.length
    ).padStart(5, '0')}`;

    addInvoice({
      tenantId: currentTenant.id,
      invoiceNumber,
      docType,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerEmail: selectedCustomer.email,
      customerGstin: selectedCustomer.gstin,
      customerAddress: selectedCustomer.billingAddress,
      customerState: selectedCustomer.state,
      date: invoiceDate,
      dueDate: dueDate,
      items: calculatedItems,
      subtotal,
      discountTotal,
      cgstTotal,
      sgstTotal,
      igstTotal,
      taxTotal,
      roundOff,
      grandTotal,
      paidAmount: 0,
      balanceAmount: grandTotal,
      paymentStatus: 'unpaid',
      notes,
      terms: currentTenant.invoiceSettings.termsAndConditions,
    });

    setIsModalOpen(false);
  };

  // Filtered invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchStatus = filterStatus === 'all' || inv.paymentStatus === filterStatus;
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Billing & Invoicing</h1>
          <p className="text-xs text-slate-500">
            Create GST & non-GST bills, track collections, and share via WhatsApp
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Invoice</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by invoice number or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
          >
          </input>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['all', 'paid', 'partial', 'unpaid'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Invoice No</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Date / Due</th>
                <th className="py-3.5 px-4">Tax Type</th>
                <th className="py-3.5 px-4">Grand Total</th>
                <th className="py-3.5 px-4">Paid / Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No invoices found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isInter = inv.igstTotal > 0;
                  const waText = encodeURIComponent(
                    `Namaste ${inv.customerName}, your invoice ${inv.invoiceNumber} for ₹${inv.grandTotal.toLocaleString(
                      'en-IN'
                    )} has been generated by ${currentTenant.name}. Please pay via UPI or Bank Transfer. Due Date: ${inv.dueDate}.`
                  );

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        <Link href={`/invoices/${inv.id}`} className="hover:text-blue-600 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          <span>{inv.invoiceNumber}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">{inv.customerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{inv.customerGstin || 'Unregistered'}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-slate-700">{inv.date}</div>
                        <div className="text-[11px] text-slate-400">Due: {inv.dueDate}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {isInter ? 'IGST (Inter-State)' : 'CGST + SGST'}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900 text-sm">
                        ₹{inv.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-emerald-600 font-semibold">₹{inv.paidAmount.toLocaleString('en-IN')}</div>
                        {inv.balanceAmount > 0 && (
                          <div className="text-amber-600 text-[11px]">Due: ₹{inv.balanceAmount.toLocaleString('en-IN')}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={inv.paymentStatus}
                          onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as PaymentStatus)}
                          className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-lg border focus:outline-none cursor-pointer ${
                            inv.paymentStatus === 'paid'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : inv.paymentStatus === 'partial'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <option value="paid">PAID</option>
                          <option value="partial">PARTIAL</option>
                          <option value="unpaid">UNPAID</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/invoices/${inv.id}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                            title="View / Print Tax Invoice"
                          >
                            <Printer className="w-4 h-4" />
                          </Link>
                          <a
                            href={`https://wa.me/${inv.customerPhone.replace(/[^0-9]/g, '')}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Invoice Wizard */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Generate GST Tax Invoice</h2>
                  <p className="text-xs text-slate-400">Automated CGST/SGST/IGST tax calculation</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-5">
              {/* Customer & Document Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Customer / Party</label>
                  <select
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    required
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">
                    State: <strong>{selectedCustomer?.state}</strong> {isInterState ? '(Inter-State -> IGST)' : '(Intra-State -> CGST+SGST)'}
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Payment Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Items Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Line Items</h3>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 grid grid-cols-12 gap-2.5 items-end text-xs">
                      <div className="col-span-4">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Select Item / Service</label>
                        <select
                          value={item.productId}
                          onChange={(e) => handleProductSelect(idx, e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-800"
                        >
                          <option value="">Custom Item</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} (₹{p.sellingPrice})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">HSN/SAC</label>
                        <input
                          type="text"
                          value={item.hsnCode}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[idx].hsnCode = e.target.value;
                            setItems(newItems);
                          }}
                          className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono"
                          placeholder="e.g. 8443"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[idx].quantity = Number(e.target.value);
                            setItems(newItems);
                          }}
                          className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Rate (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[idx].unitPrice = Number(e.target.value);
                            setItems(newItems);
                          }}
                          className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">GST Rate</label>
                        <select
                          value={item.gstRate}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[idx].gstRate = Number(e.target.value);
                            setItems(newItems);
                          }}
                          className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs"
                        >
                          <option value="0">0% (Nil)</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                      </div>

                      <div className="col-span-1 text-right">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Calculation Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="w-full md:w-1/2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Customer Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="w-full md:w-1/2 space-y-1.5 text-xs text-right">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Amount:</span>
                    <span className="font-semibold">₹{(subtotal - discountTotal).toLocaleString('en-IN')}</span>
                  </div>
                  {isInterState ? (
                    <div className="flex justify-between text-slate-600">
                      <span>IGST Total:</span>
                      <span className="font-semibold">₹{igstTotal.toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>CGST Total:</span>
                        <span className="font-semibold">₹{cgstTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>SGST Total:</span>
                        <span className="font-semibold">₹{sgstTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Round-off:</span>
                    <span className="font-semibold">₹{roundOff}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-blue-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  Generate & Save Invoice
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
