'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  Package,
  Plus,
  Search,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Barcode,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function InventoryPage() {
  const { products, addProduct, adjustStock } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stockAdjustItem, setStockAdjustItem] = useState<{ id: string; name: string } | null>(null);
  const [stockDelta, setStockDelta] = useState<number>(10);

  // New Item State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [unit, setUnit] = useState('Pcs');
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const [purchasePrice, setPurchasePrice] = useState<number>(750);
  const [currentStock, setCurrentStock] = useState<number>(25);
  const [minStockLevel, setMinStockLevel] = useState<number>(5);
  const [taxRate, setTaxRate] = useState<number>(18);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      tenantId: '',
      name,
      sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
      hsnCode,
      category,
      unit,
      sellingPrice,
      purchasePrice,
      currentStock,
      minStockLevel,
      taxRate,
    });
    setIsAddModalOpen(false);
  };

  const handleAdjustStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockAdjustItem) return;
    adjustStock(stockAdjustItem.id, stockDelta);
    setStockAdjustItem(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.hsnCode && p.hsnCode.includes(searchTerm));
    const matchLowStock = !filterLowStock || p.currentStock <= p.minStockLevel;
    return matchSearch && matchLowStock;
  });

  const totalValuation = products.reduce((acc, p) => acc + p.currentStock * p.purchasePrice, 0);
  const lowStockCount = products.filter((p) => p.currentStock <= p.minStockLevel && !p.isService).length;

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inventory & Stock Tracking</h1>
          <p className="text-xs text-slate-500">
            Monitor real-time warehouse stocks, HSN codes, barcode lookups, and auto-deductions
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Product / Item</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Inventory Value</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalValuation.toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Catalog SKUs</p>
            <h3 className="text-2xl font-black text-indigo-600 mt-1">{products.length} Items</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Low Stock Warnings</p>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{lowStockCount} Items</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Low Stock Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Item name, SKU, or HSN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setFilterLowStock(!filterLowStock)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            filterLowStock
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Show Low Stock Only ({lowStockCount})</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Product Details</th>
              <th className="py-3.5 px-4">HSN / SKU</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Selling Rate</th>
              <th className="py-3.5 px-4">Stock Level</th>
              <th className="py-3.5 px-4">Tax Rate</th>
              <th className="py-3.5 px-4 text-right">Quick Stock In/Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map((p) => {
              const isLow = p.currentStock <= p.minStockLevel && !p.isService;
              return (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    {p.isService && (
                      <span className="text-[10px] text-blue-600 font-semibold">Service Item</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    <div>HSN: {p.hsnCode || '-'}</div>
                    <div className="text-[10px] text-slate-400">SKU: {p.sku}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{p.category}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ₹{p.sellingPrice.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/{p.unit}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {p.isService ? (
                      <span className="text-slate-400 font-medium">N/A (Unlimited)</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`font-black ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                          {p.currentStock} {p.unit}
                        </span>
                        {isLow && (
                          <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold border border-rose-200">
                            Low
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{p.taxRate}% GST</td>
                  <td className="py-3.5 px-4 text-right">
                    {!p.isService && (
                      <button
                        onClick={() => setStockAdjustItem({ id: p.id, name: p.name })}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition"
                      >
                        Adjust Stock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stock Adjustment Modal */}
      {stockAdjustItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-1">Adjust Inventory Stock</h3>
            <p className="text-xs text-slate-500 mb-4">{stockAdjustItem.name}</p>

            <form onSubmit={handleAdjustStockSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Quantity Change (+ to Add, - to Deduct)</label>
                <input
                  type="number"
                  value={stockDelta}
                  onChange={(e) => setStockDelta(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-500 text-base"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStockAdjustItem(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  Apply Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-4">Add Product to Inventory Catalog</h2>
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Barcode Scanner 2D"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">SKU Code</label>
                  <input
                    type="text"
                    placeholder="e.g. BC-SCAN-2D"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">HSN/SAC Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 8471"
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Purchase Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Opening Stock</label>
                  <input
                    type="number"
                    required
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">Safety Min Level</label>
                  <input
                    type="number"
                    required
                    value={minStockLevel}
                    onChange={(e) => setMinStockLevel(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase mb-1 block">GST Rate</label>
                  <select
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  Save Product
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
