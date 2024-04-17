import React, { useState, useContext } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import { useRouter } from "next/router";
import AccountLayout from "../../../components/account/account-layout";
import NewAddress from "../../../components/account/new-address";
import { buckets, post, patch, remove, update } from "../../../services/api/data.service";

const Dashboard = () => {
  const [addAddressModal, setAddressModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const userContext = useContext(UserContext);
  const user = userContext.user;

  const addressToggle = () => {
    if (addAddressModal) setSelectedAddress("");
    setAddressModal(!addAddressModal);
  };
  const confirmationToggle = () => {
    setConfirmationModal(!confirmationModal);
  };

  const saveAddress = async (data) => {
    let addressData;

    if (data.action == "create") {
      addressData = await post(buckets.ADDRESS, {...data.data,user:user._id}).catch((err) => {
        console.log(err);
      });
    } else {
      addressData = await patch(buckets.ADDRESS, selectedAddress._id, data.data).catch(
        (err) => {
          console.log(err);
        }
      );
    }

    if (addressData?._id) {
      user.addresses = user.addresses || [];

      if (data.action == "create") {
        user.addresses.push(addressData);
        await patch(buckets.USER, user._id, { addresses: user.addresses });
      } else {
        const addressIndex = user.addresses.findIndex((el) => {
          return el._id == addressData._id;
        });
        user.addresses[addressIndex] = addressData;
        userContext.setUser(user);
      }
    }
    setSelectedAddress("");
    addressToggle();
  };

  const removeAddress = async (id) => {
    await remove(buckets.ADDRESS, id);
    user.addresses = user.addresses.filter((el) => {
      return el._id != id;
    });
    userContext.setUser(user);

    setSelectedAddress("");
    confirmationToggle();
  };

  return (
    <>
      <AccountLayout>
        <div className="address-book">
          <div className="page-title top-sec">
            <h2>Address Book</h2>
            <a className="btn btn-sm btn-solid" onClick={addressToggle}>
              add new
            </a>
          </div>
          <div className="address-book-section">
            {user?.addresses.map((address) => (
              <div className="address-box" key={address._id}>
                <h5>{address.title}</h5>
                <div className="middle">
                  <p>
                    {address.address} {address.state}/{address.city}
                  </p>
                  <p>Phone: {address.phone}</p>
                </div>
                <div className="bottom">
                  <a
                    onClick={() => {
                      setSelectedAddress(address);
                      addressToggle();
                    }}
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => {
                      setSelectedAddress(address);
                      confirmationToggle();
                    }}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AccountLayout>
      <Modal
        centered
        isOpen={addAddressModal}
        className="new-address-modal"
        toggle={addressToggle}
      >
      <NewAddress address={selectedAddress} saveAddress={(data) => saveAddress(data)} />
      </Modal>
      <Modal
        centered
        isOpen={confirmationModal}
        toggle={confirmationToggle}
        className="confirmation-modal"
      >
        <span>Are you sure you want to delete the address?</span>
        <div className="bottom">
          <a onClick={() => removeAddress(selectedAddress._id)}>Yes</a>
          <a onClick={() => confirmationToggle()}>No</a>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
