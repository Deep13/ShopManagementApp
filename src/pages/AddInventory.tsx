import React, { useState } from 'react';
import { Button, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router';

const itemMaster = [
  { name: 'Paracetamol', hsn: '30049011' },
  { name: 'Amoxicillin', hsn: '30031010' },
  { name: 'Ibuprofen', hsn: '30049012' },
];

const AddInventory = () => {
  const [itemName, setItemName] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'pricing' | 'stock'>('pricing');
  const [stockRows, setStockRows] = useState([{ batch: '', expiry: '', quantity: '' }]);

  const handleItemChange = (value: string) => {
    setItemName(value);
    const found = itemMaster.find((item) => item.name === value);
    if (found) setHsnCode(found.hsn);
  };

  const generateItemCode = () => {
    const randomCode = Math.floor(1000000000 + Math.random() * 9000000000);
    setItemCode(randomCode.toString());
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleStockChange = (index: number, field: string, value: string) => {
    const updated = [...stockRows];
    updated[index] = { ...updated[index], [field]: value };
    setStockRows(updated);
  };

  const addStockRow = () => {
    setStockRows([...stockRows, { batch: '', expiry: '', quantity: '' }]);
  };

  const deleteStockRow = (index: number) => {
    setStockRows(stockRows.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setItemName('');
    setHsnCode('');
    setItemCode('');
    setImages([]);
    setStockRows([{ batch: '', expiry: '', quantity: '' }]);
    setActiveTab('pricing');
    setImages([]);
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Item</h2>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Inputs */}
        <div className="lg:col-span-2 space-y-3">
          <div>
            <TextInput
              list="itemNames"
              placeholder="Item Name *"
              value={itemName}
              onChange={(e) => handleItemChange(e.target.value)}
              className="rounded-md h-9 text-sm max-w-[36rem]"
            />
            <datalist id="itemNames">
              {itemMaster.map((item) => (
                <option key={item.name} value={item.name} />
              ))}
            </datalist>
          </div>

          <TextInput
            placeholder="Item HSN"
            value={hsnCode}
            readOnly
            className="rounded-md h-9 text-sm max-w-[36rem]"
          />

          <Select className="rounded-md h-9 text-sm max-w-[36rem]">
            <option>Category</option>
            <option>Medicine</option>
            <option>Equipment</option>
          </Select>

          <div className="flex gap-2">
            <TextInput
              placeholder="Item Code"
              value={itemCode}
              readOnly
              className="rounded-md h-9 text-sm max-w-[36rem]"
            />
            <Button size="xs" onClick={generateItemCode}>
              Assign Code
            </Button>
          </div>

          {/* <Button size="xs" className="w-fit">
            Select Unit
          </Button> */}
        </div>

        {/* Right Image Upload */}
        <div className="flex flex-col">
          <label className="w-fit">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button as="span" size="xs" className="w-fit cursor-pointer">
              Upload Images
            </Button>
          </label>

          {/* Image Previews */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 border rounded-md overflow-hidden group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition"
                >
                  <Icon
                    className="bg-red-600 text-white p-2 rounded-full"
                    icon="solar:trash-bin-minimalistic-line-duotone"
                    width="36"
                    height="36"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button
          className={`pb-2 font-medium ${
            activeTab === 'pricing' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('pricing')}
        >
          Pricing
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === 'stock' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('stock')}
        >
          Stock
        </button>
      </div>

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-medium mb-2">MRP</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <TextInput placeholder="MRP" className="rounded-md h-9 text-sm" />
              <TextInput
                placeholder="Disc. On MRP For Sale (%)"
                className="rounded-md h-9 text-sm"
              />
              <TextInput
                placeholder="Disc. On MRP For Wholesale (%)"
                className="rounded-md h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Sale Price</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <TextInput placeholder="Sale Price" className="rounded-md h-9 text-sm" />
              <TextInput placeholder="Disc. On Sale Price" className="rounded-md h-9 text-sm" />
              <Select className="rounded-md h-9 text-sm">
                <option>Percentage</option>
                <option>Flat</option>
              </Select>
            </div>
            {/* <Button size="xs" color="light" className="mt-2">
              + Add Wholesale Price
            </Button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h3 className="text-sm font-medium mb-2">Purchase Price</h3>
              <TextInput placeholder="Purchase Price" className="rounded-md h-9 text-sm" />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Taxes</h3>
              <Select className="rounded-md h-9 text-sm">
                <option>None</option>
                <option>5%</option>
                <option>12%</option>
                <option>18%</option>
                <option>28%</option>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Stock Tab */}
      {activeTab === 'stock' && (
        <div>
          <table className="w-full border mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Batch No</th>
                <th className="p-2 border">Expiry Date</th>
                <th className="p-2 border">Opening Quantity</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">
                    <TextInput
                      value={row.batch}
                      onChange={(e) => handleStockChange(idx, 'batch', e.target.value)}
                      placeholder="Batch No"
                      className="rounded-md h-9 text-sm"
                    />
                  </td>
                  <td className="p-2 border">
                    <TextInput
                      type="date"
                      value={row.expiry}
                      onChange={(e) => handleStockChange(idx, 'expiry', e.target.value)}
                      className="rounded-md h-9 text-sm"
                    />
                  </td>
                  <td className="p-2 border">
                    <TextInput
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleStockChange(idx, 'quantity', e.target.value)}
                      placeholder="Qty"
                      className="rounded-md h-9 text-sm"
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Button color="failure" size="xs" onClick={() => deleteStockRow(idx)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button size="sm" color="light" onClick={addStockRow}>
            + Add Row
          </Button>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button color="light" onClick={handleSave}>
          Save & New
        </Button>
        <Button
          color="blue"
          onClick={() => {
            handleSave();
            navigate('/inventory');
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddInventory;
