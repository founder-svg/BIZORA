export type UserRole =
  | 'super_admin'
  | 'business_owner'
  | 'business_admin'
  | 'manager'
  | 'accountant'
  | 'salesperson'
  | 'inventory_manager'
  | 'employee'
  | 'read_only';

export interface Tenant {
  id: string;
  name: string;
  legalName: string;
  gstin?: string;
  pan?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currency: string;
  planId: 'free' | 'starter' | 'growth' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended';
  trialEndsAt?: string;
  logoUrl?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    branch: string;
    upiId: string;
  };
  invoiceSettings: {
    prefix: string;
    nextNumber: number;
    termsAndConditions: string;
    signatureUrl?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
}

export type GSTType = 'CGST_SGST' | 'IGST' | 'NONE';

export interface InvoiceItem {
  id: string;
  productId?: string;
  description: string;
  hsnCode?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountPercent: number;
  gstRate: number; // e.g. 0, 5, 12, 18, 28
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  total: number;
}

export type InvoiceDocumentType =
  | 'tax_invoice'
  | 'bill_of_supply'
  | 'quotation'
  | 'proforma'
  | 'delivery_challan'
  | 'credit_note'
  | 'debit_note';

export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'overdue';

export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  docType: InvoiceDocumentType;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerGstin?: string;
  customerAddress?: string;
  customerState?: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discountTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  igstTotal: number;
  taxTotal: number;
  roundOff: number;
  grandTotal: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  notes?: string;
  terms?: string;
  createdAt: string;
}

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';

export interface Lead {
  id: string;
  tenantId: string;
  title: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  stage: LeadStage;
  estimatedValue: number;
  source: string;
  assignedTo: string;
  nextFollowUpDate?: string;
  notes?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  sku: string;
  barcode?: string;
  hsnCode?: string;
  category: string;
  unit: string;
  sellingPrice: number;
  purchasePrice: number;
  currentStock: number;
  minStockLevel: number;
  taxRate: number;
  isService?: boolean;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  gstin?: string;
  billingAddress: string;
  city: string;
  state: string;
  pincode: string;
  outstandingBalance: number;
  creditLimit?: number;
  type: 'customer' | 'supplier' | 'both';
}

export interface Expense {
  id: string;
  tenantId: string;
  category: string;
  amount: number;
  date: string;
  payee: string;
  paymentMode: 'Cash' | 'Bank Transfer' | 'UPI' | 'Cheque';
  referenceNo?: string;
  notes?: string;
}

export interface AutomationRule {
  id: string;
  tenantId: string;
  name: string;
  triggerType: 'invoice_due' | 'payment_received' | 'low_stock' | 'new_lead_assigned';
  actionType: 'send_whatsapp' | 'send_email' | 'notify_manager';
  template: string;
  enabled: boolean;
}
