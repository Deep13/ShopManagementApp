import { Badge, Table, Sidebar, Button, TextInput } from 'flowbite-react';
import { useState } from 'react';

import user2 from '/src/assets/images/profile/user-2.jpg';
import user1 from '/src/assets/images/profile/user-1.jpg';
import user3 from '/src/assets/images/profile/user-3.jpg';
import user5 from '/src/assets/images/profile/user-5.jpg';
import user7 from '/src/assets/images/profile/user-7.jpg';
import { TableTypeDense } from 'src/components/react-tables/column-visiblity/page';
import { useNavigate } from 'react-router';

const basicTableData: TableTypeDense[] = [
  {
    avatar: user1,
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    status: 'Active',
    statuscolor: 'success',
    teams: [
      { id: '1', color: 'error', text: 'S' },
      { id: '2', color: 'secondary', text: 'D' },
    ],
    budget: '$3.9',
  },
  {
    avatar: user2,
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    status: 'Pending',
    statuscolor: 'warning',
    teams: [
      { id: '1', color: 'secondary', text: 'N' },
      { id: '2', color: 'warning', text: 'X' },
      { id: '3', color: 'primary', text: 'A' },
    ],
    budget: '$24.5k',
  },
  {
    avatar: user3,
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    status: 'Completed',
    statuscolor: 'primary',
    teams: [{ id: '1', color: 'secondary', text: 'X' }],
    budget: '$12.8k',
  },
  {
    avatar: user7,
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    status: 'Active',
    statuscolor: 'success',
    teams: [
      { id: '1', color: 'primary', text: 'X' },
      { id: '2', color: 'error', text: 'Y' },
    ],
    budget: '$2.4k',
  },
  {
    avatar: user5,
    name: 'Micheal Doe',
    post: 'Content Writer',
    pname: 'Helping Hands WP Theme',
    status: 'Cancel',
    statuscolor: 'error',
    teams: [{ id: '1', color: 'secondary', text: 'S' }],
    budget: '$9.3k',
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = basicTableData.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const navigate = useNavigate();
  return (
    <div className="flex gap-4">
      {/* Sidebar */}
      <aside className="h-full w-64 rounded-lg bg-white shadow-md p-4 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>
          <Button
            onClick={() => {
              navigate('/addInventory');
            }}
            color="blue"
            pill
            fullSized
            className="mb-6"
          >
            Add Inventory
          </Button>

          <ul className="space-y-2 text-sm text-gray-700 font-medium">
            {[
              'Category',
              'Dosage Type',
              'Schedule Type',
              'Tags',
              'Expiry',
              'Stock',
              'Stock Range',
              'Stock Adjustment',
              'Manufacturer',
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section (optional) */}
        <div className="text-xs text-gray-400 text-center mt-6">© 2025 Inventory App</div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 border rounded-md border-ld overflow-hidden space-y-3">
        {/* Search */}
        <div className="p-4">
          <TextInput
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-base font-semibold py-3">Item Name</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Min</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Max</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Stock</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Location</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Disc.</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Total PTR</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredData.map((item: any, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap">
                    <div className="flex gap-3 items-center">
                      <img src={item.avatar} alt="icon" className="h-10 w-10 rounded-full" />
                      <div className="truncate line-clamp-2 max-w-56">
                        <h6 className="text-base font-semibold">{item.name}</h6>
                        <p className="text-sm text-bodytext">{item.pname}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.min || '-'}</Table.Cell>
                  <Table.Cell>{item.max || '-'}</Table.Cell>
                  <Table.Cell>{item.stock || 0}</Table.Cell>
                  <Table.Cell>{item.loc || '-'}</Table.Cell>
                  <Table.Cell>{item.disc || '0%'}</Table.Cell>
                  <Table.Cell>{item.ptr || '₹0.00'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
