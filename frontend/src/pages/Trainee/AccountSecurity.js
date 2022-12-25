import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./Profile.module.css";
import Button from "react-bootstrap/Button";
import ProfileSideBar from "./ProfileSidebar";
import Cookie from "universal-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";
const fetchInstUrl = "/instructor/instructorbyid";
const updateEmailUrl = "/individualtrainee/updateEmail";
const updateEmailinstUrl = "/instructor/updateEmail";
const updatePassword = "/individualtrainee/updatePassword";
const updateInstructorPassword = "/instructor/updatePassword";
const cookie = new Cookie();
const AccountSecurity = () => {
  const [isloading, setIsLoading] = useState(false);
  const id = cookie.get("currentUser");
  const [currentEmail, setCurrentEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("email..");
  const [data, setData] = useState("");
  const [oldPass, setOldPass] = useState("Enter current password");
  const [newPass, setNewPass] = useState("Enter new password");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    const fetch = cookie.get("status") == 1 ? fetchInstUrl : fetchUrl;
    try {
      const res = await axios.get(fetch, { params: { id: id } });
      if (cookie.get("status") == 1) {
        setData(res.data.firstField);
        setCurrentEmail(res.data.firstField.email);
        setFullname(
          res.data.firstField.firstname + " " + res.data.firstField.lastname
        );
      } else {
        setData(res.data);
        setCurrentEmail(res.data.email);
        setFullname(res.data.firstname + " " + res.data.lastname);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const passwordUpdate = async (event) => {
    event.preventDefault();
    const pass = {
      oldPass: oldPass,
      newPass: newPass,
    };
    if (newPass != newPassConfirm) {
      Swal.fire({
        icon: "error",
        title: "please make sure your passwords match !..",
      });
    } else {
      const update =
        cookie.get("status") == 1 ? updateInstructorPassword : updatePassword;
      try {
        const res = await axios.patch(update, pass);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "password updated successfully",
        });
        event.target.reset();
      } catch (err) {
        if (!err?.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error!",
          });
        } else if (err.response?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error!",
          });
        } else if (err.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "old password not correct...",
            text: "try again!",
          });
        } else if (err.response?.status === 500) {
          Swal.fire({
            icon: "error",
            title: "please fill all the details...",
            text: "try again!",
          });
        }
      }
    }
  };

  const emailUpdate = async (event) => {
    event.preventDefault();
    const body = {
      email: email,
    };
    const update =
      cookie.get("status") == 1 ? updateEmailinstUrl : updateEmailUrl;
    try {
      const res = await axios.patch(update, body);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "email updated successfully",
      });
      setCurrentEmail(email);
      event.target.reset();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Server error!",
      });
    }
  };

  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <>
          <section className={style["main"]}>
            <ProfileSideBar fullname={fullname} state={"security"} />
            <section className={style["security"]}>
              <section className={style["security-top"]}>
                <div>
                  <h1>Account</h1>
                  <label>
                    Edit your account settings and change your password here.
                  </label>
                </div>
              </section>

              <section className={style["security-bottom"]}>
                <form onSubmit={emailUpdate}>
                  <label>Email :</label>
                  <input
                    required
                    type="email"
                    placeholder={`Your email address is ${currentEmail}`}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <Button
                    style={{ backgroundColor: "#a00407", border: "none" }}
                    variant="dark"
                    type="submit"
                  >
                    save
                  </Button>
                </form>
              </section>

              <section></section>
              <section className={style["security-bottom-bottom"]}>
                <form onSubmit={passwordUpdate}>
                  <label>Password :</label>
                  <input
                    required
                    type="password"
                    placeholder={`Enter Current Password`}
                    onChange={(e) => setOldPass(e.target.value)}
                  ></input>
                  <input
                    required
                    type="password"
                    placeholder={`Enter New password`}
                    onChange={(e) => setNewPass(e.target.value)}
                  ></input>
                  <input
                    required
                    type="password"
                    placeholder={`Re-type New password`}
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                  ></input>
                  <Button
                    style={{ backgroundColor: "#a00407", border: "none" }}
                    variant="dark"
                    type="submit"
                  >
                    {" "}
                    Change Password
                  </Button>
                </form>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default AccountSecurity;
