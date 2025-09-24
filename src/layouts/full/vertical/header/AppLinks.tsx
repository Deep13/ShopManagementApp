import { Icon } from '@iconify/react';
import { useState } from 'react';

import * as AppsData from './Data';
import { Link } from 'react-router';

const AppLinks = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (section: string) => {
    setOpenDropdown((prev) => (prev === section ? null : section));
  };

  return (
    <div className="flex gap-6 px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-black">
      {/* Dashboard */}
      <Link
        to="/"
        className="flex text-black items-center gap-2 text-lg font-semibold hover:text-primary"
      >
        <Icon icon="solar:home-2-line-duotone" height={20} />
        Dashboard
      </Link>

      {/* Sales (Dropdown) */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('sales')}
          className="flex text-black items-center gap-2 text-lg font-semibold hover:text-primary"
        >
          <Icon icon="solar:cart-line-duotone" height={20} />
          Sales
          <Icon icon="solar:alt-arrow-down-line-duotone" height={16} />
        </button>
        {openDropdown === 'sales' && (
          <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md p-2 w-48">
            <Link
              onClick={() => setOpenDropdown(null)}
              to="/sales"
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              All Sales
            </Link>
            <Link
              onClick={() => setOpenDropdown(null)}
              to="/addSales"
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              New Sales
            </Link>
          </div>
        )}
      </div>

      {/* Purchase (Dropdown) */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('purchase')}
          className="flex text-black items-center gap-2 text-lg font-semibold hover:text-primary"
        >
          <Icon icon="solar:bag-line-duotone" height={20} />
          Purchase
          <Icon icon="solar:alt-arrow-down-line-duotone" height={16} />
        </button>
        {openDropdown === 'purchase' && (
          <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md p-2 w-48">
            <Link
              onClick={() => setOpenDropdown(null)}
              to="/purchase"
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              All Purchase
            </Link>
            <Link
              onClick={() => setOpenDropdown(null)}
              to="/addPurchase"
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              New Purchase
            </Link>
          </div>
        )}
      </div>

      {/* Inventory */}
      <Link
        to="/inventory"
        className="flex text-black items-center gap-2 text-lg font-semibold hover:text-primary"
      >
        <Icon icon="solar:box-line-duotone" height={20} />
        Inventory
      </Link>
    </div>
  );
};

export default AppLinks;
