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
      const res = await axiosSecure.get(
        `/agent/transactions/${user?.mobileNumber}`
      );
      setTransactions(res.data);
    };
    if (user) {
      getData();
    }
  }, [axiosSecure, user]);

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
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Receiver Name</th>
                  <th className="p-3">Receiver Number</th>
                  <th className="p-3">Sender Name</th>
                  <th className="p-3">Sender Number</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Fee Amount</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Transaction Method</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">{transaction.transactionId}</td>
                    <td className="p-3 text-nowrap">
                      {transaction.recipientName}
                    </td>
                    <td className="p-3">{transaction.recipient}</td>
                    <td className="p-3 text-nowrap">
                      {transaction.senderName}
                    </td>
                    <td className="p-3">{transaction.senderMobileNumber}</td>
                    <td className="p-3">{transaction.amount}</td>
                    <td className="p-3">{transaction.fee}</td>
                    <td className="p-3">{`${
                      transaction.amount + transaction.fee
                    }`}</td>
                    <td className="p-3">{transaction.transactionMethod}</td>
                    <td className="p-3">{`${new Date(
                      transaction.date
                    ).toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAgent;
