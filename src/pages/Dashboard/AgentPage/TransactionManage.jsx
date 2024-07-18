import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TransactionManage = () => {
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  const axiosSecure = useAxiosSecure();

  const { user, reload, setReload } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await axiosSecure.get(
        `/cash-manage?page=${currentPage}&size=${itemsPerPage}&search=${search}&mobileNumber=${user?.mobileNumber}`
      );

      setAllUsers(res.data);
      setLoading(false);
    };

    getData();
  }, [
    axiosSecure,
    currentPage,
    itemsPerPage,
    search,
    searchText,
    updateStatus,
    user?.mobileNumber,
  ]);

  const numberOfPages = Math.ceil(allUsers.count / itemsPerPage);

  let pages = [];
  if (!loading) {
    pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
  } else {
    pages = Array.from({ length: 1 }, (_, index) => index + 1);
  }

  //  handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setCurrentPage(1);
  };

  // handle make profile active
  const handleMakeApprove = async (id) => {
    if (!id) return;

    try {
      const res = await axiosSecure.patch(`/agent/approve/${id}`, {
        status: "success",
      });

      if (res.data.acknowledged) {
        toast.success(res.data.message, {
          autoClose: 1500,
        });
        setUpdateStatus(!updateStatus);
        setReload(!reload);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="relative h-full">
      <Helmet>
        <title>Manage Users Request | Dashboard</title>
      </Helmet>

      <div>
        <SectionTitle title="Manage All Users Request" />
      </div>
      <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded">
        <div>
          {/* search */}
          <form onSubmit={handleSearch}>
            <div className="relative w-full px-4 mb-3">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Search by user name or status"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-7 ">
                <button type="submit">
                  <FaSearch />
                </button>
              </div>
            </div>
          </form>

          {/* table */}
          <div className="container p-2 mx-auto sm:p-4 text-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Requester Name</th>
                    <th className="p-3">Requester Number</th>
                    <th className="p-3">Transaction Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Fee</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.result?.map((user) => (
                    <tr
                      key={user?._id}
                      className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                      <td className="p-3 text-nowrap">
                        <p>{user?.transactionId}</p>
                      </td>
                      <td className="p-3 text-nowrap">
                        <p>{user?.senderName}</p>
                      </td>
                      <td className="p-3 text-nowrap">
                        <p>{user?.senderMobileNumber}</p>
                      </td>
                      <td className="p-3">
                        <p>{user?.transactionMethod}</p>
                      </td>
                      <td className="p-3">
                        <p>{user?.amount}</p>
                      </td>
                      <td className="p-3">
                        <p>{user?.fee || 0}</p>
                      </td>
                      <td className="p-3 text-nowrap">
                        <p>{user?.requestStatus}</p>
                      </td>
                      <td className="p-3 text-nowrap">
                        <p>{new Date(user.date).toLocaleString()}</p>
                      </td>

                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleMakeApprove(user?._id)}
                          className="px-3 py-1 font-semibold text-nowrap rounded-md bg-blue-600 text-gray-50">
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}

      <div className="flex fixed bottom-5 left-0 right-0 items-center justify-center mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 capitalize bg-blue-400 text-slate-900 font-semibold rounded-md cursor-not-allowed hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-gray-200">
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum
                ? "bg-orange-500 text-white"
                : "bg-blue-400"
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}>
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-slate-900 font-semibold transition-colors duration-300 transform bg-blue-400 rounded-md  hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-gray-200 pr-7">
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TransactionManage;
