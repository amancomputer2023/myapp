import { useState, useEffect } from "react";
import React from "react";
import "../../styles/invoice.css";

const Invoice = () => {
  const [billNumber, setBillNumber] = useState("");
  const [customer, setCustomer] = useState({
    name: "name",
    address: "address",
    phoneNumber: "phone number",
  });

  const [items, setItems] = useState([
    { sno: 1, item: "item name", qty: 0, rate: 0, amount: 0 }
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  const today = new Date();

  const addItem = () => {
    setItems([...items, { sno: items.length + 1, item: "", qty: 1, rate: 0, amount: 0 }]);
  };
  
  const removeItem = (index) => {
    const updatedItems = items
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, sno: i + 1 }));
    setItems(updatedItems);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [field]: value };

        // Convert to numbers and update amount
        const qty = Number(newItem.qty);
        const rate = Number(newItem.rate);
        newItem.amount = qty * rate;

        return newItem;
      }
      return item;
    });
    setItems(updatedItems);
  };


  const updateBillNumber = (e) => {
    setBillNumber(e.target.value);
  };

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(newTotal);
  }, [items]);

  return (
    <div>
      <div id="invoice" className="p-5 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white p-6 border border-gray-200 shadow-lg print-only">
          {/* Invoice Header */}
          <div className="flex justify-between items-center border-b-2 border-black pb-4">
            <div className="flex items-center">
              <img
                src="https://backend-1-cek6.onrender.com/images/image-1741203755524.jpg"
                alt="Company Logo"
                className="h-28 pl-5"
              />
            </div>
            <div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold mb-0">
                  Aman Computer Sells & Services
                </h2>
                <p className="text-sm mb-0">
                  Binaika Tiraha, Mandla, Madhya Pradesh 481661
                </p>
                <p className="text-sm mb-0">Phone: +91 9770277454</p>
                <p className="text-sm mb-0">
                  Email: amankumarjhariya005@gmail.com
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold mb-0">Invioce</p>
              <p className=" mb-0 inline">Bill Number : </p>
              <input
                className="w-16"
                type="text"
                value={billNumber}
                onChange={(e) => updateBillNumber(e)}
              />
              <p className="">Date : {today.toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})}</p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mt-6 text-left">
            <p className="font-bold text-lg mb-0">BILL TO</p>
            <input
              className="mb-0 font-semibold block w-full"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />

            <input
              className="mb-0 block w-full"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
            />

            <p className="inline">Phone Number: </p>
            <input
              className="mb-0"
              value={customer.phoneNumber}
              onChange={(e) =>
                setCustomer({ ...customer, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* Table */}
          <table className="w-full mt-6 border-collapse border border-black">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-black p-2">S.No</th>
                <th className="border border-black p-2">Items</th>
                <th className="border border-black p-2">Qty</th>
                <th className="border border-black p-2">Rate (₹)</th>
                <th className="border border-black p-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.sno} className="border border-black">
                  <td className="border border-black p-2">{row.sno}</td>
                  <td className="border border-black p-2">{row.item}</td>
                  <td className="border border-black p-2 text-center">
                    {row.qty}
                  </td>
                  <td className="border border-black p-2">{row.rate}</td>
                  <td className="border border-black p-2">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Section */}
          <div className="mt-6 text-right">
            <p className="text-lg font-bold mr-4">Total Amount: {totalAmount}</p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between text-left">
            <div>
              <p className="font-semibold">
                Sign By: <br /> Aman Kumar Jhariya
              </p>
              <img src="https://backend-1-cek6.onrender.com/images/image-1741206057041.jpg"  alt="Signature" className="h-12 mt-2 mix-blend-darken" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Account Details:</p>
              <p>Name: AMAN KUMAR JHARIYA</p>
              <p>A/C No.: 1632104000073176</p>
              <p>IFSC: IBKL0001632</p>
            </div>
          </div>
        </div>
        </div>
        <br />
        <div className="max-w-5xl mx-auto bg-white p-6 border border-gray-200 shadow-lg">
          <h2 className="text-xl">Add Items</h2>
          <table className="w-full mt-6 border-collapse border border-black">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-black p-2">S.No</th>
                <th className="border border-black p-2">Items</th>
                <th className="border border-black p-2">Qty</th>
                <th className="border border-black p-2">Rate (₹)</th>
                <th className="border border-black p-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={row.sno} className="border border-black">
                  <td className="border border-black p-2">{row.sno}</td>
                  <td className="border border-black p-2">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) =>
                        updateItem(index, "item", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-black p-2">
                    <input
                      type="number"
                      value={row.qty}
                      onChange={(e) => updateItem(index, "qty", e.target.value)}
                    />
                  </td>
                  <td className="border border-black p-2">
                    <input
                      type="number"
                      value={row.rate}
                      onChange={(e) =>
                        updateItem(index, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-black p-2">{row.amount}</td>
                  <td className="border border-black p-2">
                    <button onClick={() => removeItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addItem}>Add Item</button>
        </div>
        {/* Print Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Print Invoice
          </button>
      </div>
    </div>
  );
};

export default Invoice;
