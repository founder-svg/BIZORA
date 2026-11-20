# BIZORA

<div align="center">
  <img src="public/logo.jpg" alt="BIZORA Logo" width="120" style="border-radius: 20px; box-shadow: 0 10px 25px rgba(40, 101, 245, 0.3);" />
  <h3>One Platform. Every Business.</h3>
  <p><strong>A Next-Generation Cloud Business Operating System, GST Invoicing, CRM & SaaS ERP</strong></p>
  <p><em>Powered by Wixfox Technologies</em></p>
</div>

---

## 🚀 Overview

**BIZORA** is a unified multi-tenant cloud business management platform that eliminates the fragmentation of modern business tools. Instead of paying for and juggling 5 separate software subscriptions for GST billing, CRM, inventory management, customer ledgers (Khata), and business accounting, BIZORA integrates the complete business lifecycle into one seamless platform:

$$\text{Lead} \longrightarrow \text{Customer} \longrightarrow \text{Quotation} \longrightarrow \text{Sales Order} \longrightarrow \text{Invoice} \longrightarrow \text{Payment} \longrightarrow \text{Accounting} \longrightarrow \text{Reporting} \longrightarrow \text{Automation}$$

---

## 🎨 Brand Identity & Theme

- **Primary Electric Blue:** `#2865F5`
- **Deep Indigo / Violet Accent:** `#5734D9`
- **Surface & Backgrounds:** `#0F172A` (Slate 900), `#1E293B` (Slate 800), `#F8FAFC` (Canvas White)
- **Status Accents:** Emerald (Paid / Success), Amber (Pending / Partial), Rose (Overdue / Low Stock)

---

## 📦 Core Modules Implemented

### 1. ⚡ Executive Dashboard (`/dashboard`)
- Real-time sales, collections, pending receivables, and expense KPIs.
- Interactive cash flow & recent transactions monitor.
- Smart safety inventory reorder warning cards.
- Upcoming CRM follow-up action queue.

### 2. 🧾 Smart GST Billing & Invoicing (`/invoices`)
- Complete compliance with **Rule 46 of Indian CGST Rules, 2017**.
- Automatic calculation of **CGST + SGST** (Intra-State) or **IGST** (Inter-State) based on Place of Supply.
- Multi-document generation: Tax Invoices, Quotations, Proforma Invoices, Delivery Challans.
- Dynamic line item addition with HSN/SAC lookups, discount percentages, and auto round-off.
- **Official Print / PDF Layout (`/invoices/[id]`)**:
  - Bank details for NEFT/RTGS settlement.
  - **Dynamic UPI QR Code** directly embedded for instant payment scanning.
  - One-click **WhatsApp Share** with auto-composed customer message.

### 3. 🎯 Sales CRM & Pipeline (`/crm`)
- Visual drag-and-drop style **Kanban Stage Boards**:
  - *New Leads → Contacted → Qualified → Proposal Sent → Won Closed → Lost*
- Deal value tracking and salesperson assignment.
- Follow-up scheduling with notification reminders.
- **1-Click Lead Conversion** into customer records with immediate invoice generation capability.
- List view and filter matrix.

### 4. 📦 Inventory & Stock Management (`/inventory`)
- Goods and Service catalog tracking.
- Barcode, SKU, and HSN code classification.
- Real-time stock valuation and minimum safety reorder thresholds.
- Quick Stock In / Stock Out adjustment engine.
- Automatic stock deduction upon invoice generation.

### 5. 👥 Customers, Suppliers & Khata Ledgers (`/customers`)
- Customer & vendor ledger management with running balances.
- Credit limits and GSTIN verification status.
- Direct **WhatsApp Payment Reminders** with prefilled balance links.

### 6. 📊 Accounting & GST Summaries (`/accounting`)
- Track operating expenses with categories, payment modes, and voucher references.
- Gross Revenue, Operating Expenses, and Net Profit analysis.
- **GSTR-1 Monthly Summary** (Outward Taxable Supplies, CGST, SGST, IGST totals) formatted for tax portal filing.

### 7. 🤖 Business Automations (`/automation`)
- Meta WhatsApp Business API integration readiness.
- Trigger automations on invoice due dates, payment receipts, and low-stock buffers.
- Customizable template payloads.

### 8. 🛡️ Wixfox Super Admin Console (`/super-admin`)
- Platform-level multi-tenant management and workspace health monitoring.
- Track Monthly Recurring Revenue (MRR), Annual Run Rate (ARR), and active subscriptions.
- Subscription entitlement configurator:
  - **Free Starter:** ₹0
  - **Starter:** ₹299 / month
  - **Growth:** ₹699 / month (Most Popular)
  - **Professional:** ₹1,499 / month
  - **Enterprise:** Custom Tier
- Tenant isolation inspector (Row-Level Security enforcement).

### 9. ⚙️ Business Settings & Identity (`/settings`)
- Organization legal information, PAN, and GSTIN management.
- Bank accounts and primary UPI ID configuration for automated invoice QR codes.
- Invoice numbering sequences (e.g. `BIZ/26-27/00101`) and standard terms & conditions.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router, Server-Side Optimization, TypeScript)
- **Styling:** Tailwind CSS with custom BIZORA design tokens and print media stylesheets
- **Icons:** Lucide React
- **Architecture:** Modular SaaS Architecture ready for PostgreSQL, Redis, and multi-tenant schema partitioning

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18.x or v20.x or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/founder-svg/BIZORA.git
cd BIZORA

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the BIZORA platform.

---

## 🏢 Wixfox Technologies
BIZORA is a registered product developed by **Wixfox Technologies**.  
*One Platform. Every Business.*
