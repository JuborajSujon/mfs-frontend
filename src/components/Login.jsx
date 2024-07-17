import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import useAuth from "./../hooks/useAuth";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { setUser, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Login Handler
  const onSubmit = async (data) => {
    try {
      const { emailphone, password } = data;

      const pin = parseInt(password);
      if (!/^[0-9]{5}$/.test(pin)) {
        toast.error("PIN should be 5 digits only numbers", {
          autoClose: 2000,
        });
        return;
      }

      let userId;

      if (emailphone.includes("@")) {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!emailPattern.test(emailphone)) {
          toast.error("Please enter a valid email address", {
            autoClose: 2000,
          });
          return;
        }
        userId = emailphone;
      } else {
        const phonePattern = /^[0-9]{11}$/;

        if (!phonePattern.test(emailphone)) {
          toast.error("Please enter a valid phone number", {
            autoClose: 2000,
          });
          return;
        }

        userId = emailphone;
      }

      const userInfo = {
        phoneOrEmail: userId,
        pin,
      };

      const result = await axiosPublic.post("/login", userInfo);

      if (result.data._id) {
        const jwt = await axiosPublic.post("/jwt", {
          email: result.data.email,
        });

        if (jwt.data.token) {
          localStorage.setItem("access-token", jwt.data.token);

          localStorage.setItem("user", JSON.stringify(result.data));

          setLoading(false);

          toast.success("Logged in successfully", {
            autoClose: 1500,
          });
          reset();
          navigate("/dashboard");
        } else {
          localStorage.removeItem("access-token");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <section>
      <Helmet>
        <title>Fast Pay | Login</title>
      </Helmet>
      <section className="py-16 sm:pt-20 sm:pb-36 flex items-center relative overflow-hidden">
        <div className="container mx-auto relative z-3 animate__animated animate__zoomIn">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white shadow-md rounded-md">
              <Link to="/">
                <img src="logo.png" className="mx-auto w-12" alt="" />
              </Link>
              <h5 className="my-4 text-xl text-slate-700 dark:text-slate-900 font-semibold">
                Login
              </h5>
              <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1">
                  {/** Email or Phone */}
                  <div className="mb-3 flex flex-col">
                    <label
                      className="font-medium text-slate-500 dark:text-slate-900"
                      htmlFor="LoginEmail">
                      Email or Phone
                    </label>
                    <input
                      {...register("emailphone", { required: true })}
                      id="LoginEmail"
                      type="text"
                      className="w-full border-2 border-slate-100 p-1 rounded-md dark:bg-transparent dark:border-black/40 dark:text-slate-900 py-2 mt-3"
                      placeholder="Enter Email or Phone Number"
                    />
                    {errors.emailphone && (
                      <span className="text-red-500">
                        Please enter a valid email
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
                      Login
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-slate-400 me-2">
                    Don't have an account?
                  </span>{" "}
                  <Link
                    to={"/register"}
                    className="text-slate-500 dark:text-slate-900 font-bold">
                    Register
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

export default Login;
