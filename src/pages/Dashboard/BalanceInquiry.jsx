import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const BalanceInquiry = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Balance Inquiry | Fast Pay</title>
      </Helmet>

      <div>
        <SectionTitle title="Balance Inquiry" />
      </div>

      <div>
        <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-300 ">
          Your Current Balance:{" "}
          <span className="text-blue-400">{user?.balance}</span> Taka{" "}
        </h1>
      </div>
    </div>
  );
};

export default BalanceInquiry;
