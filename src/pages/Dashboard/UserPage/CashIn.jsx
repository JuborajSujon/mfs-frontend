import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const CashIn = () => {
  const [password, setPassword] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { amount, recipient, password } = data;

      // validate amount
      const sendAmount = Number(amount);

      if (!(typeof sendAmount === "number")) {
        toast.error("Please enter a valid amount", {
          autoClose: 1500,
        });
        return;
      }

      // validate recipient
      const recipientNumber = Number(recipient.trim());
      if (!/^[0-9]{11}$/.test(recipientNumber)) {
        toast.error("Please enter a valid phone number", {
          autoClose: 1500,
        });
        return;
      }

      // validate password
      const pin = parseInt(password);
      if (!/^[0-9]{5}$/.test(pin)) {
        toast.error("PIN should be 5 digits only numbers", {
          autoClose: 1500,
        });
        return;
      }

      const userInfo = {
        userEmail: user?.email,
        amount: sendAmount,
        recipient: recipientNumber,
        pin,
      };
      const response = await axiosSecure.post("/user/cash-in", userInfo);

      if (response.data.acknowledged) {
        toast.success(response.data.message, {
          autoClose: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section>
      <Helmet>
        <title>Cash In | Fast Pay</title>
      </Helmet>

      <SectionTitle title="Cash In" />
      <section className="py-16 sm:pt-20 sm:pb-36 flex items-center relative overflow-hidden">
        <div className="container mx-auto relative z-3 animate__animated animate__zoomIn">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white shadow-md rounded-md">
              <img src="logo.png" className="mx-auto w-12" alt="" />

              <h5 className="my-4 text-xl text-slate-700 dark:text-slate-900 font-semibold">
                Cash In Request To Agent Account
              </h5>
              <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1">
                  {/** Recipient Mobile Number */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="phoneNumber">
                      Agent Mobile Number
                    </label>
                    <input
                      {...register("recipient", { required: true })}
                      id="phoneNumber"
                      type="number"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="Mobile Number"
                    />
                    {errors.recipient && (
                      <span className="text-red-500">
                        Please enter a valid phone number
                      </span>
                    )}
                  </div>

                  {/** Amount */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="sendAmount">
                      Cash In Amount
                    </label>
                    <input
                      {...register("amount", { required: true })}
                      id="sendAmount"
                      type="number"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="Enter Cash In Amount"
                    />
                    {errors.amount && (
                      <span className="text-red-500">
                        Please enter a valid amount
                      </span>
                    )}
                  </div>

                  {/** PIN */}
                  <div className="mb-4 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="LoginPIN">
                      Your PIN
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", { required: true })}
                        id="LoginPIN"
                        type={password ? "" : "password"}
                        className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                        placeholder="5-digit PIN"
                      />

                      <div className="absolute mt-2 top-1/2 -translate-y-1/2 right-2">
                        {password ? (
                          <BsEyeSlash
                            onClick={() => setPassword(!password)}
                            size={20}
                          />
                        ) : (
                          <BsEye
                            onClick={() => setPassword(!password)}
                            size={20}
                          />
                        )}
                      </div>
                    </div>
                    {errors.password && (
                      <span className="text-red-500">
                        Please enter a valid PIN
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="btn text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full">
                      Cash In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CashIn;
