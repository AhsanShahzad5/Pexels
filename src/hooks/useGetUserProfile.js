import { useState, useEffect } from "react";

const useGetUserProfile = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const getUser = async () => {
      try {
        const apiUrl = process.env.API_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          console.error(data.error);
          return;
        }
        if (data.isFrozen) {
          setUser(null);
          return;
        }
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { loading, user };
};

export default useGetUserProfile;
