"use client";
import Count from "@/components/Count";
import UserList from "@/components/UserList";
import { useGetUsersQuery } from "@/redux/services/userApi";
import LoginPage from "./login/page";
import Loader from "@/components/Loader";

export default function Home() {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <p>Some Error</p>;

  return (
    <main className="flex flex-col items-center justify-between">
      <LoginPage />

      <div className="h-screen pt-20 px-5">
        <Count />

        <UserList />
      </div>
    </main>
  );
}
