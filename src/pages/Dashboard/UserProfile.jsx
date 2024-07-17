import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Profile | {`${user?.name}`}</title>
      </Helmet>

      <div>
        <SectionTitle title="Personal Information" />
      </div>

      <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 ">
        <img
          src="https://i.ibb.co/Y2T7TS7/ava.png"
          alt={user?.name}
          className="w-32 h-32 mx-auto rounded-full border border-blue-400 p-2"
        />
        <div className="space-y-4">
          <div className="my-2 space-y-1 text-center">
            <h2 className="text-xl font-semibold sm:text-2xl">{user?.name}</h2>
            <p className="text-xs sm:text-base text-gray-600">
              <span className="font-bold">User Email:</span> {user?.email}
            </p>
            <p className="text-xs sm:text-base text-gray-600">
              <span className="font-bold">User Phone:</span>{" "}
              {user?.mobileNumber}
            </p>
            <p className="text-xs sm:text-base text-gray-600">
              <span className="font-bold">User Role:</span> {user?.role}
            </p>
            <p className="text-xs sm:text-base text-gray-600">
              <span className="font-bold">User Balance:</span> {user?.balance}{" "}
              Taka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
