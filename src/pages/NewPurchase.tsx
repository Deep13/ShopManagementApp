import React, { useState } from 'react';
import { Table, TextInput, Button, Datepicker, Label, Select, Modal } from 'flowbite-react';

type Customer = { name: string; phone: string };
type PaymentMode = {
  mode: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
  amount: number;
};

type SaleItem = {
  itemName: string;
  unit: string;
  pack: string;
  loc: string;
  batch: string;
  expiry: string; // YYYY-MM
  mrp: number;
  qty: number;
  discountPercent: number;
  gst: number;
};

const customers: Customer[] = [
  { name: 'Rahul Sharma', phone: '9876543210' },
  { name: 'Priya Verma', phone: '9123456789' },
  { name: 'Amit Kumar', phone: '9988776655' },
];

// Product master for autofill
const productMaster: SaleItem[] = [
  {
    itemName: 'Paracetamol',
    unit: 'Tablet',
    pack: '10x10',
    loc: 'A1',
    batch: 'B123',
    expiry: '2025-08',
    mrp: 50,
    qty: 1,
    discountPercent: 0,
    gst: 5,
  },
  {
    itemName: 'Amoxicillin',
    unit: 'Capsule',
    pack: '10x6',
    loc: 'B2',
    batch: 'C789',
    expiry: '2026-01',
    mrp: 120,
    qty: 1,
    discountPercent: 0,
    gst: 12,
  },
];

const calculateAmount = (item: SaleItem) => {
  const discountedPrice = item.mrp * (1 - item.discountPercent / 100);
  const gstAmount = discountedPrice * (item.gst / 100);
  const finalAmount = (discountedPrice + gstAmount) * item.qty;
  return {
    dPrice: discountedPrice.toFixed(2),
    amount: finalAmount.toFixed(2),
  };
};

const NewPurchase: React.FC = () => {
  const [salesData, setSalesData] = useState<SaleItem[]>([
    {
      itemName: '',
      unit: '',
      pack: '',
      loc: '',
      batch: '',
      expiry: '',
      mrp: 0,
      qty: 1,
      discountPercent: 0,
      gst: 0,
    },
  ]);

  const [billDate, setBillDate] = useState<Date>(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-001');
  const [stateOfSupply, setStateOfSupply] = useState<string>('Punjab');

  const [customerName, setCustomerName] = useState<string>('');
  const [customerMobile, setCustomerMobile] = useState<string>('');

  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [received, setReceived] = useState<number>(0);

  const [payments, setPayments] = useState<PaymentMode[]>([{ mode: 'Cash', amount: 0 }]);

  // Totals
  const grossTotal = salesData.reduce((acc, item) => {
    const { amount } = calculateAmount(item);
    return acc + parseFloat(amount);
  }, 0);

  const handleDiscountPercentChange = (value: number) => {
    setDiscountPercent(value);
    setDiscountValue((grossTotal * value) / 100);
  };

  const handleDiscountValueChange = (value: number) => {
    setDiscountValue(value);
    setDiscountPercent(grossTotal ? (value / grossTotal) * 100 : 0);
  };

  const netTotal = Math.max(0, grossTotal - discountValue);
  const balance = Math.max(0, netTotal - received);

  // Customer autofill
  const handleNameChange = (value: string) => {
    setCustomerName(value);
    const customer = customers.find((c) => c.name.toLowerCase() === value.toLowerCase());
    if (customer) setCustomerMobile(customer.phone);
  };

  const handlePhoneChange = (value: string) => {
    setCustomerMobile(value);
    const customer = customers.find((c) => c.phone === value);
    if (customer) setCustomerName(customer.name);
  };

  // Payment methods
  const addPaymentMode = () => {
    setPayments((prev) => [...prev, { mode: 'Cash', amount: 0 }]);
  };

  const updatePayment = (index: number, field: 'mode' | 'amount', value: string | number) => {
    setPayments((prev) =>
      prev.map((p, i) =>
        i !== index
          ? p
          : field === 'amount'
          ? { ...p, amount: Number(value) || 0 }
          : { ...p, mode: value as PaymentMode['mode'] },
      ),
    );
  };

  // Table row handlers
  const handleRowChange = (index: number, field: keyof SaleItem, value: string | number) => {
    setSalesData((prev) =>
      prev.map((item, i) => (i !== index ? item : { ...item, [field]: value })),
    );
  };

  const handleItemNameChange = (index: number, value: string) => {
    setSalesData((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const product = productMaster.find((p) => p.itemName.toLowerCase() === value.toLowerCase());
        return product
          ? { ...product, qty: item.qty, discountPercent: item.discountPercent }
          : { ...item, itemName: value };
      }),
    );
  };

  const addRow = () => {
    setSalesData((prev) => [
      ...prev,
      {
        itemName: '',
        unit: '',
        pack: '',
        loc: '',
        batch: '',
        expiry: '',
        mrp: 0,
        qty: 1,
        discountPercent: 0,
        gst: 0,
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setSalesData((prev) => prev.filter((_, i) => i !== index));
  };

  const [billFile, setBillFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleBillUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBillFile(e.target.files[0]);
      setShowPreview(true); // open modal immediately
    }
  };

  const sampleTableData = [
    { name: 'CILACAR T TAB', hsn: '', qty: 1, unit: '', price: '', tax: '' },
    { name: 'CETZINE TAB', hsn: '', qty: 2, unit: '', price: '', tax: '' },
    { name: 'MILFLOX DROP', hsn: '', qty: 1, unit: '', price: '', tax: '' },
    { name: 'FAMOCID 40 TAB', hsn: '', qty: 10, unit: '', price: '', tax: '' },
    { name: 'REGESTRON CR 15 TAB', hsn: '', qty: 2, unit: '', price: '23.21', tax: '' },
    { name: 'GELUSIL MPS TAB 9+1', hsn: '', qty: 9, unit: '', price: '18.85', tax: '' },
    { name: 'MET XL 25 TAB', hsn: '', qty: 1, unit: '', price: '', tax: '' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Add New Purchase</h1>
        <label>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={handleBillUpload}
          />
          <Button className="cursor-pointer" as="span" color="purple">
            Upload Bill
          </Button>
        </label>
      </div>

      {/* Bill Preview Modal */}
      <Modal show={showPreview} onClose={() => setShowPreview(false)} size="6xl">
        <Modal.Header>Review Columns</Modal.Header>
        <Modal.Body>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">Item Name</th>
                  <th className="p-2 border">HSN Code</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Unit</th>
                  <th className="p-2 border">Price/Unit</th>
                  <th className="p-2 border">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                {sampleTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{row.name}</td>
                    <td className="p-2 border">{row.hsn}</td>
                    <td className="p-2 border">{row.qty}</td>
                    <td className="p-2 border">{row.unit}</td>
                    <td className="p-2 border">{row.price}</td>
                    <td className="p-2 border">{row.tax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowPreview(false)}>
            Cancel
          </Button>
          <Button color="failure" onClick={() => setShowPreview(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Add New Purchase</h1>

      {/* Customer & Invoice */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-5">
          <div>
            <Label value="Customer Name" />
            <TextInput
              list="customerNames"
              placeholder="Enter/Select Name"
              value={customerName}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            <datalist id="customerNames">
              {customers.map((c, i) => (
                <option key={i} value={c.name} />
              ))}
            </datalist>
          </div>

          <div>
            <Label value="Customer Mobile" />
            <TextInput
              list="customerPhones"
              placeholder="Enter/Select Phone"
              value={customerMobile}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            <datalist id="customerPhones">
              {customers.map((c, i) => (
                <option key={i} value={c.phone} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <Label value="Bill Date" />
            <Datepicker defaultDate={billDate} onChange={(date: Date) => setBillDate(date)} />
          </div>

          <div>
            <Label value="Invoice No." />
            <TextInput value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
          </div>

          <div>
            <Label value="State of Supply" />
            <Select value={stateOfSupply} onChange={(e) => setStateOfSupply(e.target.value)}>
              <option>Punjab</option>
              <option>Haryana</option>
              <option>Delhi</option>
              <option>UP</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Editable Table */}
      <div className="overflow-x-auto rounded-[8px] border">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Unit</Table.HeadCell>
            <Table.HeadCell>Pack</Table.HeadCell>
            <Table.HeadCell>Loc</Table.HeadCell>
            <Table.HeadCell>Batch</Table.HeadCell>
            <Table.HeadCell>Expiry</Table.HeadCell>
            <Table.HeadCell>MRP</Table.HeadCell>
            <Table.HeadCell>Qty</Table.HeadCell>
            <Table.HeadCell>D%</Table.HeadCell>
            <Table.HeadCell>D. Price</Table.HeadCell>
            <Table.HeadCell>GST%</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {salesData.map((item, i) => {
              const { dPrice, amount } = calculateAmount(item);
              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    <TextInput
                      list="productNames"
                      value={item.itemName}
                      className="truncate-input w-40"
                      onChange={(e) => handleItemNameChange(i, e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      value={item.unit}
                      onChange={(e) => handleRowChange(i, 'unit', e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      value={item.pack}
                      onChange={(e) => handleRowChange(i, 'pack', e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      value={item.loc}
                      onChange={(e) => handleRowChange(i, 'loc', e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      value={item.batch}
                      onChange={(e) => handleRowChange(i, 'batch', e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="month"
                      value={item.expiry}
                      onChange={(e) => handleRowChange(i, 'expiry', e.target.value)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="number"
                      value={item.mrp}
                      onChange={(e) => handleRowChange(i, 'mrp', Number(e.target.value))}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleRowChange(i, 'qty', Number(e.target.value))}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="number"
                      value={item.discountPercent}
                      onChange={(e) =>
                        handleRowChange(i, 'discountPercent', Number(e.target.value))
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>₹{dPrice}</Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="number"
                      value={item.gst}
                      onChange={(e) => handleRowChange(i, 'gst', Number(e.target.value))}
                    />
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-green-700">₹{amount}</Table.Cell>
                  <Table.Cell>
                    <Button color="failure" size="xs" onClick={() => deleteRow(i)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <datalist id="productNames">
          {productMaster.map((p, i) => (
            <option key={i} value={p.itemName} />
          ))}
        </datalist>
        <Button color="blue" size="xs" className="m-2" onClick={addRow}>
          + Add Row
        </Button>
      </div>

      {/* Payment & Summary */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-3">
          <h2 className="text-lg font-semibold">Mode of Payment</h2>
          {payments.map((p, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Select value={p.mode} onChange={(e) => updatePayment(i, 'mode', e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </Select>
              <TextInput
                type="number"
                value={p.amount}
                onChange={(e) => updatePayment(i, 'amount', Number(e.target.value))}
                placeholder="Amount"
              />
            </div>
          ))}
          <Button size="xs" color="blue" onClick={addPaymentMode}>
            + Add Payment Mode
          </Button>
        </div>

        <div className="w-full md:w-1/2 space-y-3">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            <Label value="Discount (%)" />
            <TextInput
              type="number"
              value={discountPercent.toFixed(2)}
              onChange={(e) => handleDiscountPercentChange(Number(e.target.value))}
            />
            <Label value="Discount Value" />
            <TextInput
              type="number"
              value={discountValue.toFixed(2)}
              onChange={(e) => handleDiscountValueChange(Number(e.target.value))}
            />
            <Label value="Total" />
            <TextInput disabled value={grossTotal.toFixed(2)} />
            <Label value="Received" />
            <TextInput
              type="number"
              value={received}
              onChange={(e) => setReceived(Number(e.target.value))}
            />
            <Label value="Balance" />
            <TextInput disabled value={balance.toFixed(2)} />
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button color="purple" onClick={() => console.log('Share clicked')}>
          Share
        </Button>
        <Button
          color="success"
          onClick={() => {
            setSalesData([
              {
                itemName: '',
                unit: '',
                pack: '',
                loc: '',
                batch: '',
                expiry: '',
                mrp: 0,
                qty: 1,
                discountPercent: 0,
                gst: 0,
              },
            ]);
            setBillDate(new Date());
            setInvoiceNumber('INV-001');
            setStateOfSupply('Punjab');
            setCustomerName('');
            setCustomerMobile('');
            setDiscountPercent(0);
            setDiscountValue(0);
            setReceived(0);
            setPayments([{ mode: 'Cash', amount: 0 }]);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default NewPurchase;
