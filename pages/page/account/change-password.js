import React, { useContext } from "react";
import AccountLayout from "../../../components/account/account-layout";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import { useForm } from "react-hook-form";
import { changePassword, userLogout } from "../../../services/api/user.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      data = { ...data, email: user.email };
      changePassword({ ...data, identity_id: user.identity })
        .then(() => {
          toast.success("Password changed successfully. Please login again");
          userContext.setUser()
          userLogout();
          router.push("/page/account/login");
        })
        .catch((err) => {
          toast.error(err.message || "Error! Please try again later");
        });
    } else {
      errors.showMessages();
    }
  };

  return (
    <AccountLayout>
      <div className="contact-page register-page account-page">
        <Row>
          <Col sm="12">
            <h3>PERSONAL DETAIL</h3>
            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="6">
                  <Label for="name">Current Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    {...register("current_password", {
                      required: true,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Label for="name">New Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    {...register("new_password", {
                      required: true,
                    })}
                  />
                </Col>
              </Row>
              <button type="submit" className="btn btn-solid">
                change password
              </button>
            </Form>
          </Col>
        </Row>
      </div>
    </AccountLayout>
  );
};

export default Profile;
