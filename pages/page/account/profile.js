import React, { useContext } from "react";
import AccountLayout from "../../../components/account/account-layout";
import ProfilePage from "./common/profile-page";
import UserContext from "../../../helpers/user/UserContext";
import { updateUser, changeEmail, userLogout } from "../../../services/api/user.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const router = useRouter();

  const saveUser = (updatedData) => {
    let data = { ...user, ...updatedData };

    const updateUserRes = updateUser(data).catch((err) => {
      toast.error(err.message || "Error! Please try again later");
    });

    if (updateUserRes) {
      if (user.email != updatedData.email) {
        changeEmail({ email: updatedData.email })
          .then(() => {
            toast.success("Please login again");
            userContext.setUser()
            userLogout();
            router.push("/page/account/login");
          })
          .catch((err) => {
            toast.error(err.message || "Error! Please try again later");
          });
      } else {
        userContext.setUser({ ...user, ...updatedData });
        toast.success("Saved successfully");
      }
    }
  };

  return (
    <AccountLayout>
      <ProfilePage
        user={user}
        saveUser={(data) => {
          saveUser(data);
        }}
      />
    </AccountLayout>
  );
};

export default Profile;
