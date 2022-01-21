import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../shared/contexts/FirebaseContext";
import Button from "../../../components/Button";

function PlaceOrder() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(false);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        const q = query(collection(db, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (doc.data().email === res.email) {
              setUser({ id: doc.id, ...doc.data() });
              if (doc.data().order) {
                setOrder(true);
              }
              // alert(`Hello ${doc.data().username}!`);
            }
          });
        });
        return () => unsubscribe;
      }
      return () => user;
    });
  }, []);

  const onSubmit = async (data) => {
    // Find User
    let userDoc = doc(db, "Users", user.id);

    // Insert the Application
    let newFields = {
      customername: data.customername,
      customeraddress: data.customername,
      date: data.date,
      ordertype: data.ordertype,

      order: true,
      status: "pending",
      orderdetails: data.orderdetails,
      quantity1: data.quantity1,
      quantity2: data.quantity2,
      quantity3: data.quantity3,
    };
    console.log(data);

    // Update User
    await updateDoc(userDoc, newFields).then(() => {
      toast("Application added successfully");
    });
  };

  if (order) {
    return (
      <div className="flex flex-col justify-center items-center h-screen transform scale-75 md:scale-100">
        Wait for Admin
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-full transform scale-75 md:scale-100 space-y-5 md:mx-5 py-14">
        <div className="text-[20px]">ORDER FORM</div>

        <form
          className="w-full flex flex-col justify-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" p-6  flex justify-center items-center bg-white   ">
            <Toaster />
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4  items-center space-y-5  overflow-y-auto">
              {/* ORDER TYPE */}
              <div className="md:col-span-2 w-[215px] md:w-full">
                <div>ORDER TYPE</div>
                <div className="flex space-x-2 flex-wrap">
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="Delivery"
                  >
                    <input
                      {...register("ordertype", { required: true })}
                      type="radio"
                      name="ordertype"
                      value="Delivery"
                      id="Delivery"
                    />
                    <div>Delivery</div>
                  </label>
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="Pick-up"
                  >
                    <input
                      {...register("ordertype", { required: true })}
                      type="radio"
                      name="ordertype"
                      value="Pick-up"
                      id="Pick-up"
                    />
                    <div>Pick-up</div>
                  </label>
                </div>
                {errors.ordertype?.type === "required" && (
                  <div className="text-[#D62B55]">Order type is required.</div>
                )}
                <div className=" border-t-2 w-full flex pb-4 mt-[5px] justify-center items-center"></div>
              </div>
              {/* Date */}
              <div>
                <div className="">Date</div>
                <input
                  type="date"
                  className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <div className="text-[#D62B55]">Date is required.</div>
                )}
              </div>
              {/* Customer Name */}
              <div>
                <div className="">Customer Name</div>
                <input
                  type="text"
                  className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
                  {...register("customername", { required: true })}
                />
                {errors.customername && (
                  <div className="text-[#D62B55]">
                    Customer Name is required.
                  </div>
                )}
              </div>

              {/* Customer Address */}
              <div className="md:col-span-2">
                <div className="">Customer Address</div>
                <textarea
                  className="md:px-[10px] border-2 w-[215px] md:w-full  rounded-[9px] h-[156px]"
                  {...register("customeraddress", { required: true })}
                />
                {errors.customeraddress && (
                  <div className="text-[#D62B55]">
                    Customer Address is required.
                  </div>
                )}
              </div>
              {/* Order Details */}
              <div className="md:col-span-2 w-[215px] md:w-full">
                <div>Order Details</div>

                <div className="flex space-x-2 flex-wrap">
                  <label
                    className="space-x-2 flex flex-col justify-center items-center"
                    htmlFor="bbq"
                  >
                    <input
                      {...register("orderdetails", { required: true })}
                      type="checkbox"
                      name="orderdetails"
                      value="bbq"
                      id="bbq"
                    />
                    <div>bbq (Price: 5)</div>
                    {/* Quantity */}
                    <div>
                      <div className="">Quantity for bbq</div>
                      <input
                        type="number"
                        className="px-[10px] border-2 w-[100px]  h-[45px] rounded-[9px]"
                        {...register("quantity1", { required: true })}
                      />
                      {errors.quantity1 && (
                        <div className="text-[#D62B55]">
                          Quantity for bbq is required.
                        </div>
                      )}
                    </div>
                  </label>
                  <label
                    className="space-x-2 flex flex-col justify-center items-center"
                    htmlFor="ensaymada"
                  >
                    <input
                      {...register("orderdetails", { required: true })}
                      type="checkbox"
                      name="orderdetails"
                      value="ensaymada"
                      id="ensaymada"
                    />
                    <div>ensaymada (Price: 10)</div>
                    {/* Quantity */}
                    <div>
                      <div className="">Quantity for ensaymada</div>
                      <input
                        type="number"
                        className="px-[10px] border-2 w-[100px] h-[45px] rounded-[9px]"
                        {...register("quantity2", { required: true })}
                      />
                      {errors.quantity2 && (
                        <div className="text-[#D62B55]">
                          Quantity for ensaymada is required.
                        </div>
                      )}
                    </div>
                  </label>
                  <label
                    className="space-x-2 flex flex-col justify-center items-center"
                    htmlFor="nilupak"
                  >
                    <input
                      {...register("orderdetails", { required: true })}
                      type="checkbox"
                      name="orderdetails"
                      value="nilupak"
                      id="nilupak"
                    />
                    <div>nilupak (Price: 15)</div>
                    {/* Quantity */}
                    <div>
                      <div className="">Quantity for nilupak</div>
                      <input
                        type="number"
                        className="px-[10px] border-2 w-[100px]  h-[45px] rounded-[9px]"
                        {...register("quantity3", { required: true })}
                      />
                      {errors.quantity3 && (
                        <div className="text-[#D62B55]">
                          Quantity for nilupak is required.
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                {errors.orderdetails?.type === "required" && (
                  <div className="text-[#D62B55]">
                    Order Details is required.
                  </div>
                )}
                <div className=" border-t-2 w-full flex pb-4 mt-[5px] justify-center items-center"></div>
              </div>
            </div>
          </div>
          <div className=" border-t-2 w-full flex pb-4 mt-[100px] justify-center items-center"></div>
          <Button size={"small"} text={"SUBMIT"} />
        </form>
      </div>
    );
  }
}

export default PlaceOrder;
