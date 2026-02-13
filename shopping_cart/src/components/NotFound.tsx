import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen mx-auto w-full max-w-xl mt-44 ">
      <div className="border p-4 rounded flex flex-col gap-4">
        <p className="text-xl text-center font-semibold ">Not Fount</p>
        <Link
          className="py-1 w-full bg-black text-white rounded text-center coursor-pointer "
          to={"/"}
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
