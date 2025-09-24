import { Badge, Button, Datepicker, Dropdown, Table, TextInput } from 'flowbite-react';
import { IconDotsVertical } from '@tabler/icons-react';
import { Icon } from '@iconify/react';
import TitleCard from 'src/components/shared/TitleBorderCard';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

// Mocked table data
const billTableData = [
  {
    billNo: 'BILL001',
    entryDate: '2025-07-29',
    billDate: '2025-07-30',
    enteredBy: 'Dr. A Sharma',
    patient: 'ABV',
    patientMobile: '9876543210',
    billAmount: 4500,
  },
  {
    billNo: 'BILL002',
    entryDate: '2025-07-30',
    billDate: '2025-07-31',
    enteredBy: 'Nurse Priya',
    patient: 'ABV',
    patientMobile: '9123456789',
    billAmount: 3200,
  },
  {
    billNo: 'BILL003',
    entryDate: '2025-07-31',
    billDate: '2025-07-31',
    enteredBy: 'Reception',
    patient: 'ABV',
    patientMobile: '9012345678',
    billAmount: 2750,
  },
];

const tableActionData = [
  {
    icon: 'tabler:plus',
    listtitle: 'Add',
  },
  {
    icon: 'tabler:edit',
    listtitle: 'Edit',
  },
  {
    icon: 'tabler:trash',
    listtitle: 'Delete',
  },
];

const Purchase = () => {
  const totalAmount = useMemo(
    () => billTableData.reduce((acc, item) => acc + item.billAmount, 0),
    [],
  );

  const [search, setSearch] = useState<string>('');

  const naviagte = useNavigate();

  return (
    <TitleCard title="Purchase Table">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5">
        <div className="flex gap-3 items-center flex-wrap">
          <Button
            onClick={() => {
              naviagte('/addPurchse');
            }}
            color="primary"
            className="flex items-center gap-2 mr-8"
          >
            Add
          </Button>
          <div className="flex gap-1 items-center">
            <div className="text-black">Start Date:</div>
            <div className="">
              <Datepicker language="en" />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-black">End Date:</div>
            <div className="">
              <Datepicker language="en" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="w-24 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 cursor-pointer">
            {Object.keys(billTableData?.[0] || {}).map((item) => (
              <option key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
            ))}
          </select>

          <TextInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Bill No.</Table.HeadCell>
              <Table.HeadCell>Entry Date</Table.HeadCell>
              <Table.HeadCell>Bill Date</Table.HeadCell>
              <Table.HeadCell>Entered By</Table.HeadCell>
              <Table.HeadCell>Patient</Table.HeadCell>
              <Table.HeadCell>Mobile</Table.HeadCell>
              <Table.HeadCell className="text-right">Bill Amount (₹)</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {billTableData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.billNo}</Table.Cell>
                  <Table.Cell>{item.entryDate}</Table.Cell>
                  <Table.Cell>{item.billDate}</Table.Cell>
                  <Table.Cell>{item.enteredBy}</Table.Cell>
                  <Table.Cell>{item.patient}</Table.Cell>
                  <Table.Cell>{item.patientMobile}</Table.Cell>
                  <Table.Cell className="text-right font-semibold">
                    ₹{item.billAmount.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <IconDotsVertical size={22} />
                        </span>
                      )}
                    >
                      {tableActionData.map((action, i) => (
                        <Dropdown.Item key={i} className="flex gap-3">
                          <Icon icon={action.icon} height={18} />
                          <span>{action.listtitle}</span>
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}

              {/* Total Row */}
              <Table.Row className="font-bold text-white totalRow">
                <Table.Cell colSpan={6}>Total</Table.Cell>
                <Table.Cell className="text-right">₹{totalAmount.toLocaleString()}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </TitleCard>
  );
};

export default Purchase;
