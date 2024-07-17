import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TransactionAgent = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getData = async () => {
      const res = await axiosSecure.get(`/agent/transactions/${user.email}`);
      setTransactions(res.data);
    };
    if (user) {
      getData();
    }
  }, [axiosSecure, user]);

  console.log(transactions);
  return (
    <div>
      <Helmet>
        <title>Transaction | Agent Dashboard</title>
      </Helmet>
      <div>
        <SectionTitle title="Transaction History" />
      </div>

      <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-md">
        <div className="container p-2 mx-auto sm:p-4 text-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Service Name</th>
                  <th className="p-3 ">Price</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3 ">Email</th>
                  <th className="p-3 ">Transiction Id</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAgent;
