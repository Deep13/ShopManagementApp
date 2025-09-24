import AnnualProfit from 'src/components/dashboards/Dashboard2/AnnualProfit';
import Customer from '../../components/dashboards/Dashboard1/Customer';
import CustomerChart from '../../components/dashboards/Dashboard1/CustomerChart';
import Project from '../../components/dashboards/Dashboard1/Project';
import RevenueByProduct from '../../components/dashboards/Dashboard1/RevenueByProduct';
import RevenueForcast from '../../components/dashboards/Dashboard1/RevenueForcast';
import SalesOverview from '../../components/dashboards/Dashboard1/SalesOverview';
import TotalSettelment from '../../components/dashboards/Dashboard1/TotalSettelment';
import WelcomeBox from '../../components/dashboards/Dashboard1/WelcomeBox';
import YourPerformance from '../../components/dashboards/Dashboard1/YourPerformance';

const Dashboard1 = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="flex items-center justify-center gap-5 w-full">
        <div className="min-w-[55%]">
          <RevenueForcast />
        </div>
        <AnnualProfit />
        <AnnualProfit />
      </div>
      <div className="w-full">
        <RevenueByProduct />
      </div>
    </div>
  );
};

export default Dashboard1;
