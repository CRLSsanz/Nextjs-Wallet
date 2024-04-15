"use client";
import { useGetUsersQuery } from "@/redux/services/userApi";

const AnalyticsPage = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Some Error</p>;

  return (
    <div className="w-full p-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
      {data?.map((user) => (
        <div key={user.id} className="p-3 bg-gray-200">
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPage;
