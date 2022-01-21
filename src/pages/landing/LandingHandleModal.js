import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../shared/contexts/FirebaseContext";
import { UserContext } from "../../shared/contexts/UserContext";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

function LandingHandleModal(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { showUser, setShowUser } = useContext(UserContext);

  //   Register
  const registerUser = (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        let newFields = {
          username: data.username,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          contactnumber: data.contactnumber,
          email: data.email,
        };

        const user = userCredential.user;
        await addDoc(collection(db, "Users"), newFields).then(() => {
          toast("User added successfully");
          setValue("username", "");
          setValue("password", "");
          setValue("username", "");
          setValue("firstname", "");
          setValue("lastname", "");
          setValue("contactnumber", "");
          setValue("email", "");
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast("Email already in use");
            break;
          case "auth/invalid-email":
            toast("Email is Invalid");
            break;
          case "auth/operation-not-allowed":
            toast("Error Occured");
            break;
          case "auth/weak-password":
            toast("Password not strong enough");
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  //   Signin
  const signInUser = (data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (props.type === "admin") {
          setShowUser(2);
        } else {
          setShowUser(1);
        }
        toast("User Login Successful!");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast("Email already in use");
            break;
          case "auth/invalid-email":
            toast("Email is Invalid");
            break;
          case "auth/operation-not-allowed":
            toast("Error Occured");
            break;
          case "auth/weak-password":
            toast("Password not strong enough");
            break;
          case "auth/user-not-found":
            toast("User Does not Exist!");
            break;
          case "auth/wrong-password":
            toast("Your inputted wrong Password");
            break;

          default:
            console.log(error.message);
            break;
        }
      });
  };

  return (
    <form
      className="p-6 flex flex-col justify-center items-center bg-white w-full h-full"
      onSubmit={handleSubmit(
        props.type === "register" ? registerUser : signInUser
      )}
    >
      <div className="flex py-[20px] flex-col items-center space-y-4 overflow-y-auto h-[500px] w-full">
        {props.type === "register" && (
          <div>
            {/* username */}
            <div>
              <div className="">Username</div>
              <input
                type="text"
                className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <div className="text-[#D62B55]">Username is required</div>
              )}
            </div>

            {/* first name */}
            <div>
              <div className="">First Name</div>
              <input
                type="text"
                className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <div className="text-[#D62B55]">First Name is required</div>
              )}
            </div>
            {/* last name */}
            <div>
              <div className="">Last Name</div>
              <input
                type="text"
                className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <div className="text-[#D62B55]">Last Name is required</div>
              )}
            </div>
            {/* contact number */}
            <div>
              <div className="">Contact Number</div>
              <input
                type="text"
                className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
                {...register("contactnumber", { required: true })}
              />
              {errors.contactnumber && (
                <div className="text-[#D62B55]">Contact Number is required</div>
              )}
            </div>
          </div>
        )}

        {/* email */}
        <div>
          <div className="">Email</div>
          <input
            type="text"
            className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="text-[#D62B55]">Email is required</div>
          )}
        </div>
        {/* password */}
        <div>
          <div className="">Password</div>
          <input
            type="password"
            className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px] border-[#2EE878]"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <div className="text-[#D62B55]">Password is required</div>
          )}
          {errors.password?.type === "minLength" && (
            <div className="text-[#D62B55]">
              Password must be greater than or equals 6 characters
            </div>
          )}
        </div>

        {/* separator */}
      </div>
      <div className="border-t-4 pb-4  border-[#2EE878] flex justify-center w-full"></div>
      <Button
        size={"small"}
        text={props.type === "register" ? "REGISTER" : "SIGNIN"}
      />
    </form>
  );
}

export default LandingHandleModal;
