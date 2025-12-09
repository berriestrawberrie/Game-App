import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllUsers } from "../api/playerHandler";
import type { UserInterface } from "../interfaces/interfaces";

export interface UserData extends UserInterface {
  id: number;
}

const AllUsers = () => {
  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    if (!token) return console.log("Missing Player Token");

    const fetchData = async () => {
      try {
        const fetchedUsers = await getAllUsers(token);
        setData(fetchedUsers);
        console.log(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Layout title="All Players">
      <div className="flex flex-wrap gap-2  justify-center">
        {data.map((user) => (
          <div
            key={user.id}
            className="rounded-xl bg-light-200 w-[200px] h-[250px] p-2
            dark:bg-dark-100 dark:text-white"
          >
            <h3 className="text-center font-bold text-lg">
              {user.firstName} {user.lastName}
            </h3>
            {user.avatarUrl ? (
              <img className="mx-auto h-[200px]" src={user.avatarUrl} />
            ) : (
              <img className="mx-auto h-[200px]" src="/user-2.png" />
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AllUsers;
