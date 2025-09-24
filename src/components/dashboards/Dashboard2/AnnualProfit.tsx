import CardBox from '../../shared/CardBox';
import { Badge, Select, Table } from 'flowbite-react';

import product1 from '/src/assets/images/products/dash-prd-1.jpg';
import product2 from '/src/assets/images/products/dash-prd-2.jpg';
import product3 from '/src/assets/images/products/dash-prd-3.jpg';
import product4 from '/src/assets/images/products/dash-prd-4.jpg';
// const ChartData: any = {
//   chart: {
//     id: "annual-profit",
//     type: "area",
//     height: 80,
//     sparkline: {
//       enabled: true,
//     },
//     group: "sparklines",
//     fontFamily: "inherit",
//     foreColor: "#adb0bb",
//   },
//   series: [
//     {
//       name: "Users",
//       color: "var(--color-primary)",
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ],
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   fill: {
//     type: "gradient",
//     color: "var(--color-primary)",

//     gradient: {
//       shadeIntensity: 0,
//       inverseColors: false,
//       opacityFrom: 0.1,
//       opacityTo: 0.8,
//       stops: [100],
//     },
//   },

//   markers: {
//     size: 0,
//   },
//   tooltip: {
//     theme: "dark",
//     fixed: {
//       enabled: true,
//       position: "right",
//     },
//     x: {
//       show: false,
//     },
//   },
// };

const ProductTableData2 = [
  {
    img: product2,
    project: 'Web App Project',
    name: 'Mathew Flintoff',
    progrsss: '73.2%',
    statuscolor: 'lightsecondary',
    statustextcolor: 'text-secondary',
    statustext: 'Very High',
    money: '$24.5K',
  },
  {
    img: product3,
    project: 'Modernize Dashboard',
    name: 'Anil Kumar',
    progrsss: '73.2%',
    statuscolor: 'lightsuccess',
    statustextcolor: 'text-success',
    statustext: 'Low',
    money: '$12.8K',
  },
  {
    img: product1,
    project: 'Minecraf App',
    name: 'Jason Roy',
    progrsss: '73.2%',
    statuscolor: 'lightwarning',
    statustextcolor: 'text-warning',
    statustext: 'Medium',
    money: '$3.5K',
  },

  {
    img: product4,
    project: 'Dashboard Co',
    name: 'George Cruize',
    progrsss: '73.2%',
    statuscolor: 'lighterror',
    statustextcolor: 'text-error',
    statustext: 'High',
    money: '$2.4K',
  },
];

const AnnualProfit = () => {
  return (
    <>
      <CardBox>
        <div>
          <h5 className="card-title">Annual Profit</h5>
          <Table>
            <Table.Head className="border-b border-bordergray dark:border-darkborder">
              <Table.HeadCell className="py-2 px-3  ps-0 text-ld font-normal">
                Assigned
              </Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Progress</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-bordergray dark:divide-darkborder ">
              {ProductTableData2.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap ps-0">
                    <div className="flex gap-3 items-center">
                      <img src={item.img} alt="icon" className="h-12 w-12 rounded-tw" />
                      <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                        <h6 className="text-sm">{item.project}</h6>
                        <p className="">{item.name}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap ">
                    <p className="text-sm">{item.progrsss}</p>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default AnnualProfit;
