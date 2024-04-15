"use client";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const users = [
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },
    {
      id: 4,
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users?per_page=12")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data);
        setData(data.data);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 p-3 gap-4 pb-20">
      {data?.map((user) => (
        <div key={user.id} className="">
          <div className="border bg-gray-500/80 text-white h-full">
            <img src={user.avatar} alt="" className="w-full mb-2" />
            <div className="p-2">
              <h4>{`${user.first_name} ${user.last_name}`} </h4>
              <p className="text-xs">{user.email} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
