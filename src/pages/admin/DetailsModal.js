import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../shared/contexts/FirebaseContext";
import { UserContext } from "../../shared/contexts/UserContext";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

function DetailsModal(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { showUser, setShowUser } = useContext(UserContext);

  //   Register
  const changeStatus = async (data) => {
    let userDoc = doc(db, "Users", props.user.id);
    // Insert the Application
    let newFields = {
      customername: props.user.customername,
      customeraddress: props.user.customername,
      date: props.user.date,
      ordertype: props.user.ordertype,

      order: true,
      status: "delivered",
      orderdetails: props.user.orderdetails,
      quantity1: props.user.quantity1,
      quantity2: props.user.quantity2,
      quantity3: props.user.quantity3,
    };
    console.log(data);

    // Update User
    await updateDoc(userDoc, newFields).then(() => {
      toast("Order Change Successful added successfully");
    });
  };
  console.log(props.user);

  return (
    <form
      className="p-6 flex flex-col justify-center items-center bg-white w-full h-full"
      onSubmit={handleSubmit(changeStatus)}
    >
      <div className="flex py-[20px] flex-col items-center space-y-4 overflow-y-auto h-[500px] w-full">
        <p>Contact: {props.user.contactnumber}</p>
        <p>customeraddress: {props.user.customeraddress}</p>
        <p>customername: {props.user.customername}</p>
        <p>date: {props.user.date}</p>
        <p>email: {props.user.email}</p>
        <p>Contact: {props.user.contactnumber}</p>
        <p>firstname: {props.user.firstname}</p>
        <p>lastname: {props.user.lastname}</p>
        <p>ordertype: {props.user.ordertype}</p>
        <p>status: {props.user.status}</p>
        <p>username: {props.user.username}</p>
        <p>orderdetails: {props.user.orderdetails[0]}</p>
        <p>orderdetails: {props.user.orderdetails[1]}</p>
        <p>orderdetails: {props.user.orderdetails[2]}</p>
        {/* separator */}
      </div>
      <div className="border-t-4 pb-4  border-[#2EE878] flex justify-center w-full"></div>
      <Button size={"small"} text={"done"} />
      <Button size={"small"} text={"being delivered"} />
    </form>
  );
}

export default DetailsModal;
