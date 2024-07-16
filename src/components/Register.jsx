import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Register Handler for create user , update user profile
  const onSubmit = async (data) => {
    try {
      const { email, password, name, mobileNumber, role } = data;

      const pin = parseInt(password);

      if (!/^[0-9]{5}$/.test(pin)) {
        toast.error("PIN should be 5 digits only numbers", {
          autoClose: 2000,
        });
        return;
      }

      const userInfo = {
        name,
        email,
        mobileNumber,
        pin,
        role,
        status: "pending",
      };

      const result = await axios.post(
        "http://localhost:5000/api/auth/register",
        userInfo
      );
      if (result.status === 200) {
        console.log(result.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <section>
      <Helmet>
        <title>Fast Pay | Register</title>
      </Helmet>
      <section className="py-16 sm:pt-20 sm:pb-36 flex items-center relative overflow-hidden">
        <div className="container mx-auto relative z-3 animate__animated animate__zoomIn">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white shadow-md rounded-md">
              <Link to="/">
                <img src="logo.png" className="mx-auto w-12" alt="" />
              </Link>
              <h5 className="my-4 text-xl text-slate-700 dark:text-slate-900 font-semibold">
                Register
              </h5>
              <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1">
                  {/** Name */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      id="fullName"
                      type="text"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="Enter Your Full Name"
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        Please enter a valid name
                      </span>
                    )}
                  </div>

                  {/** Email */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="LoginEmail ">
                      Email Address:
                    </label>
                    <input
                      {...register("email", { required: true })}
                      id="LoginEmail"
                      type="email"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        Please enter a valid email
                      </span>
                    )}
                  </div>

                  {/** Mobile Number */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="mobileNo">
                      Mobile Number
                    </label>
                    <input
                      {...register("mobileNumber", { required: true })}
                      id="mobileNo"
                      type="text"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="Enter Your Mobile Number"
                    />
                    {errors.mobileNumber && (
                      <span className="text-red-500">
                        Please enter a valid mobile number
                      </span>
                    )}
                  </div>
                  {/** PIN */}
                  <div className="mb-4 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="LoginPIN">
                      PIN
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
                    {errors.pin && (
                      <span className="text-red-500">
                        Please enter a valid PIN
                      </span>
                    )}
                  </div>

                  {/** Select Account Type */}
                  <div className="mb-4 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900 "
                      htmlFor="LoginPassword">
                      Select Account Type
                    </label>
                    <select
                      {...register("role", { required: true })}
                      defaultValue={"user"}
                      className="rounded select w-full mt-3 border border-slate-200 dark:bg-slate-700 dark:text-white">
                      <option value="user">User</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="btn text-base bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
                      Register / Sign up
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-slate-400 me-2">
                    Already have an account ?
                  </span>{" "}
                  <Link
                    to={"/"}
                    className="text-slate-500 dark:text-slate-900 font-bold">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
