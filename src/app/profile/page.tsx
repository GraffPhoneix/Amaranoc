"use client";

import { useEffect, useState } from "react";
import Register from "@.../components/UI/Register";
import UserProfile from "@.../components/UI/Profile";

export default function Profile() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth") === "true");
  }, []);

  return (
    <div>
      {isAuth ? <UserProfile /> : <Register />}
    </div>
  );
}
