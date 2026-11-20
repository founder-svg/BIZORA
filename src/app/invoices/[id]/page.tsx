'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  Printer,
  Share2,
  ArrowLeft,
  CheckCircle2,
  QrCode,
  Building,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';

export default function InvoiceDetailPage() {
  const params = useParams();
  const { currentTenant, invoices, updateInvoiceStatus } = useApp();

  const invoice = invoices.find((inv) => inv.id === params.id) || invoices[0];

  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Invoice not found.</p>
        <Link href="/invoices" className="text-blue-600 font-semibold underline mt-2 inline-block">
          Return to Invoices
        </Link>
      </div>
    );
  }

  const isInterState = invoice.igstTotal > 0;
  const waShareUrl = `https://wa.me/${invoice.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Namaste ${invoice.customerName}, please find your Tax Invoice ${invoice.invoiceNumber} for ₹${invoice.grandTotal.toLocaleString(
      'en-IN'
    )} from ${currentTenant.name}. You can pay directly via UPI: ${currentTenant.bankDetails?.upiId}. Thank you!`
  )}`;

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Action Bar (Hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoices</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {invoice.paymentStatus !== 'paid' && (
            <button
              onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Fully Paid</span>
            </button>
          )}

          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Paper (A4 Standard Container) */}
      <div className="invoice-paper bg-white max-w-4xl mx-auto p-8 rounded-2xl border border-slate-200 shadow-xl text-slate-800 font-sans print:shadow-none print:border-none print:p-0">
        {/* Top Header */}
        <div className="flex justify-between items-start pb-6 border-b-2 border-slate-900">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center p-1">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">{currentTenant.legalName}</h1>
              <p className="text-xs text-slate-600 mt-0.5">{currentTenant.address}, {currentTenant.city}, {currentTenant.state} - {currentTenant.pincode}</p>
              <div className="mt-1 text-xs text-slate-600 space-x-3">
                <span><strong>GSTIN:</strong> {currentTenant.gstin}</span>
                <span><strong>PAN:</strong> {currentTenant.pan}</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 space-x-3">
                <span>Email: {currentTenant.email}</span>
                <span>Phone: {currentTenant.phone}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded">
              TAX INVOICE
            </span>
            <p className="text-xs text-slate-500 mt-2 font-mono">Original for Recipient</p>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
          <div className="space-y-1">
            <p><span className="text-slate-500 font-medium">Invoice No:</span> <strong className="font-mono text-slate-900">{invoice.invoiceNumber}</strong></p>
            <p><span className="text-slate-500 font-medium">Invoice Date:</span> <strong className="text-slate-900">{invoice.date}</strong></p>
            <p><span className="text-slate-500 font-medium">Due Date:</span> <strong className="text-slate-900">{invoice.dueDate}</strong></p>
          </div>
          <div className="text-right space-y-1">
            <p><span className="text-slate-500 font-medium">Place of Supply:</span> <strong className="text-slate-900">{invoice.customerState}</strong></p>
            <p><span className="text-slate-500 font-medium">Reverse Charge:</span> <strong className="text-slate-900">No</strong></p>
            <p><span className="text-slate-500 font-medium">Payment Status:</span> <strong className="uppercase text-blue-600">{invoice.paymentStatus}</strong></p>
          </div>
        </div>

        {/* Billed To / Shipped To */}
        <div className="py-4 border-b border-slate-200 text-xs">
          <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Details of Receiver (Billed To)</h2>
          <h3 className="text-sm font-bold text-slate-900">{invoice.customerName}</h3>
          <p className="text-slate-600">{invoice.customerAddress || 'Address on file'}</p>
          <div className="mt-1 space-x-4 text-slate-600">
            <span><strong>GSTIN:</strong> {invoice.customerGstin || 'Unregistered'}</span>
            <span><strong>State:</strong> {invoice.customerState}</span>
            <span><strong>Phone:</strong> {invoice.customerPhone}</span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-y border-slate-300 font-bold text-slate-700">
                <th className="py-2 px-2 text-center w-8">#</th>
                <th className="py-2 px-2">Item Description</th>
                <th className="py-2 px-2 font-mono">HSN/SAC</th>
                <th className="py-2 px-2 text-right">Qty</th>
                <th className="py-2 px-2 text-right">Rate</th>
                <th className="py-2 px-2 text-right">Disc %</th>
                <th className="py-2 px-2 text-right">Taxable</th>
                <th className="py-2 px-2 text-right">GST %</th>
                <th className="py-2 px-2 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoice.items.map((item, idx) => {
                const gross = item.quantity * item.unitPrice;
                const discount = (gross * item.discountPercent) / 100;
                const taxable = gross - discount;
                return (
                  <tr key={item.id} className="align-top">
                    <td className="py-2.5 px-2 text-center text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-900">{item.description}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{item.hsnCode || '-'}</td>
                    <td className="py-2.5 px-2 text-right text-slate-800">{item.quantity} {item.unit}</td>
                    <td className="py-2.5 px-2 text-right text-slate-800">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{item.discountPercent}%</td>
                    <td className="py-2.5 px-2 text-right font-medium text-slate-800">₹{taxable.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-2 text-right text-slate-800">{item.gstRate}%</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900">₹{item.total.toLocaleString('en-IN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals & Tax Breakdown */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-slate-900 text-xs">
          {/* Bank & Payment Info */}
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Bank Details for NEFT / RTGS</span>
              </h3>
              <p className="text-slate-700">Bank: <strong>{currentTenant.bankDetails?.bankName}</strong></p>
              <p className="text-slate-700 font-mono">A/C: <strong>{currentTenant.bankDetails?.accountNumber}</strong></p>
              <p className="text-slate-700 font-mono">IFSC: <strong>{currentTenant.bankDetails?.ifsc}</strong></p>
              <p className="text-slate-700">UPI ID: <strong className="text-blue-600">{currentTenant.bankDetails?.upiId}</strong></p>
            </div>

            {/* UPI QR Code Container */}
            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-blue-200 flex items-center justify-center shadow-sm">
                <QrCode className="w-14 h-14 text-slate-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Scan & Pay via any UPI App</p>
                <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                <p className="text-[10px] font-mono text-blue-700 font-semibold mt-0.5">{currentTenant.bankDetails?.upiId}</p>
              </div>
            </div>
          </div>

          {/* Amount Calculation */}
          <div className="space-y-2 text-right">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Subtotal:</span>
              <span className="font-semibold text-slate-800">₹{(invoice.subtotal - invoice.discountTotal).toLocaleString('en-IN')}</span>
            </div>

            {isInterState ? (
              <div className="flex justify-between text-slate-600">
                <span>Integrated GST (IGST):</span>
                <span className="font-semibold text-slate-800">₹{invoice.igstTotal.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Central GST (CGST):</span>
                  <span className="font-semibold text-slate-800">₹{invoice.cgstTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>State GST (SGST):</span>
                  <span className="font-semibold text-slate-800">₹{invoice.sgstTotal.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Round-off:</span>
              <span className="font-semibold text-slate-800">₹{invoice.roundOff}</span>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
              <span>Grand Total:</span>
              <span className="text-blue-600">₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              <span>Total Paid: ₹{invoice.paidAmount.toLocaleString('en-IN')}</span> • 
              <span className="font-bold text-amber-600 ml-1">Balance Due: ₹{invoice.balanceAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Terms & Signatures */}
        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-xs">
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Terms & Conditions</h4>
            <p className="text-slate-500 whitespace-pre-line text-[11px] leading-relaxed">
              {invoice.terms || currentTenant.invoiceSettings.termsAndConditions}
            </p>
          </div>

          <div className="text-right flex flex-col justify-between items-end">
            <p className="font-bold text-slate-900">For {currentTenant.legalName}</p>
            <div className="mt-12 pt-2 border-t border-slate-400 w-48 text-center text-[10px] text-slate-500 font-semibold uppercase">
              Authorized Signatory
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
}
