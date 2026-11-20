'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Tenant,
  Customer,
  Product,
  Invoice,
  Lead,
  Expense,
  AutomationRule,
  PaymentStatus,
  LeadStage,
  UserRole,
} from '@/types';
import {
  initialTenants,
  initialCustomers,
  initialProducts,
  initialInvoices,
  initialLeads,
  initialExpenses,
  initialAutomationRules,
} from '@/lib/mock-data';

interface AppContextType {
  currentTenant: Tenant;
  tenants: Tenant[];
  switchTenant: (tenantId: string) => void;
  updateTenantSettings: (updated: Partial<Tenant>) => void;
  invoices: Invoice[];
  addInvoice: (invoiceData: Omit<Invoice, 'id' | 'createdAt'>) => string;
  updateInvoiceStatus: (id: string, status: PaymentStatus, paidAmount?: number) => void;
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => void;
  adjustStock: (id: string, delta: number) => void;
  customers: Customer[];
  addCustomer: (customerData: Omit<Customer, 'id' | 'outstandingBalance'>) => void;
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, 'id'>) => void;
  automationRules: AutomationRule[];
  toggleAutomationRule: (id: string) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  isSuperAdminView: boolean;
  setIsSuperAdminView: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [currentTenantId, setCurrentTenantId] = useState<string>('tenant-apex');
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(initialAutomationRules);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('business_owner');
  const [isSuperAdminView, setIsSuperAdminView] = useState<boolean>(false);

  const currentTenant = tenants.find((t) => t.id === currentTenantId) || tenants[0];

  const switchTenant = (tenantId: string) => {
    setCurrentTenantId(tenantId);
  };

  const updateTenantSettings = (updated: Partial<Tenant>) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === currentTenantId ? { ...t, ...updated } : t))
    );
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt'>) => {
    const id = `inv-${Date.now().toString().slice(-4)}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id,
      tenantId: currentTenantId,
      createdAt: new Date().toISOString(),
    };
    setInvoices((prev) => [newInvoice, ...prev]);

    // Update product stocks
    invoiceData.items.forEach((item) => {
      if (item.productId) {
        adjustStock(item.productId, -item.quantity);
      }
    });

    // Update customer outstanding if unpaid or partial
    if (newInvoice.balanceAmount > 0) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === newInvoice.customerId
            ? { ...c, outstandingBalance: c.outstandingBalance + newInvoice.balanceAmount }
            : c
        )
      );
    }

    return id;
  };

  const updateInvoiceStatus = (id: string, status: PaymentStatus, paidAmount?: number) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        const newPaid = paidAmount !== undefined ? paidAmount : status === 'paid' ? inv.grandTotal : inv.paidAmount;
        const newBalance = Math.max(0, inv.grandTotal - newPaid);
        return {
          ...inv,
          paymentStatus: status,
          paidAmount: newPaid,
          balanceAmount: newBalance,
        };
      })
    );
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now().toString().slice(-4)}`,
      tenantId: currentTenantId,
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStage = (id: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead))
    );
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString().slice(-4)}`,
      tenantId: currentTenantId,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const adjustStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, currentStock: Math.max(0, p.currentStock + delta) } : p
      )
    );
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'outstandingBalance'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now().toString().slice(-4)}`,
      tenantId: currentTenantId,
      outstandingBalance: 0,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now().toString().slice(-4)}`,
      tenantId: currentTenantId,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const toggleAutomationRule = (id: string) => {
    setAutomationRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentTenant,
        tenants,
        switchTenant,
        updateTenantSettings,
        invoices: invoices.filter((i) => i.tenantId === currentTenantId),
        addInvoice,
        updateInvoiceStatus,
        leads: leads.filter((l) => l.tenantId === currentTenantId),
        addLead,
        updateLeadStage,
        products: products.filter((p) => p.tenantId === currentTenantId),
        addProduct,
        adjustStock,
        customers: customers.filter((c) => c.tenantId === currentTenantId),
        addCustomer,
        expenses: expenses.filter((e) => e.tenantId === currentTenantId),
        addExpense,
        automationRules: automationRules.filter((a) => a.tenantId === currentTenantId),
        toggleAutomationRule,
        currentUserRole,
        setCurrentUserRole,
        isSuperAdminView,
        setIsSuperAdminView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
