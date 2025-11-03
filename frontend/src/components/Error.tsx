import { useRouteError } from "react-router-dom";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
  data?: string;
};

export default function Error() {
  const error = useRouteError() as RouteError;

  return (
    <div className="h-screen flex flex-col w-full bg-rose-200 justify-center items-center">
      <h1 className="text-3xl font-bold text-rose-900">
        Oops! Something went wrong..
      </h1>

      <p className="mt-4 text-2xl text-red-600 font-bold">
        {error?.statusText || error?.message || "Unknown error"}
      </p>

      {error?.data && (
        <p className="text-rose-500 mt-2">{error.data}</p>
      )}

      <a
        className="mt-6 text-center font-bold underline cursor-pointer text-blue-900"
        href="/"
      >
        Back to Home
      </a>
    </div>
  );
}
