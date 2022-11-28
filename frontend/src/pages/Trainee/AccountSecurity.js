import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from './Profile.module.css'
import Button from "react-bootstrap/Button";
import ProfileSideBar from "./ProfileSidebar";
import Cookie from "universal-cookie";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useState,useEffect } from "react";
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";
const updateEmailUrl = "/individualtrainee/updateEmail"
const cookie = new Cookie();
const AccountSecurity = () => {
  const [isloading, setIsLoading] = useState(false);
  const id = cookie.get("currentUser");
  const [currentEmail ,setCurrentEmail] = useState("");
  const [fullname,setFullname] = useState("");
  const [email , setEmail] = useState("email..");
  const [data, setData] = useState("");
  const [oldPass , setOldPass] = useState("Enter current password");
  const [newPass , setNewPass] = useState("Enter new password");
  const [newPassConfirm,setNewPassConfirm] = useState("");
  const [success , setSuccess] = useState(false);
  const [fail , setFail] = useState(false);
  const [successPass , setSuccessPass] = useState(false);
  const [failPass , setFailPass] = useState(false);
  const [errMsg,setErrMsg]= useState("");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchUrl, { params: { id: id } });
      setData(res.data);
      setCurrentEmail(res.data.email)
      setFullname(res.data.firstname + " "+res.data.lastname)
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(()=>{
      fetchData();
  },[]);

const passwordUpdate = async (event) => {
    event.preventDefault();
    const pass = {
      oldPass: oldPass,
      newPass: newPass,
    };
    if (newPass!= newPassConfirm){
      setSuccess(false);
      setFailPass(true);
      setErrMsg("passwords do not match")
    }
    else{
    try {
      const res = await axios.patch(`/individualtrainee/updatePassword?id=${id}`,pass);
      setSuccessPass(true);
      setFailPass(false);
      setErrMsg("updated successfully")
      event.target.reset();
    
    } catch (err) {
      setSuccess(false);
      setFailPass(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("wrong username fetched not exist");
      } else if (err.response?.status === 401) {
        setErrMsg("old Password incorrect");
      } else if (err.response?.status === 500) {
        setErrMsg("please Fill all fields");
      }
    }
  }
  };
  useEffect(() => {
    setSuccess(false);
    setFail(false);
    setSuccessPass(false);
    setFailPass(false);
    setErrMsg("");},[email,oldPass,newPass,newPassConfirm])

  const emailUpdate = async (event) => {
    event.preventDefault();
    const body = {
      userId : id ,
      email :email
    }
    try {
      const res = await axios.patch(updateEmailUrl,body);
      setSuccess(true);
      setFail(false);
      setCurrentEmail(email)
      setErrMsg("Email updated successfully")
      event.target.reset();
    } catch (e) {
      setSuccess(false);
      setSuccess(true);
      setErrMsg("update Failed")
    }
  };
  
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (<>
        
        <section className={style['main']}>
          <ProfileSideBar fullname ={fullname} state={'security'}/>
          <section className={style["security"]}>
            <section className={style["security-top"]}>
              <div>
                <h1>Account</h1>
                <label>Edit your account settings and change your password here.</label>
              </div>
            </section>
            <section >
        {fail && <Alert key='danger' variant='danger'>{errMsg}</Alert>}
       {success && <Alert key='success' variant='success'> {errMsg}</Alert>}
        </section>
            <section className={style["security-bottom"]}>
              <form onSubmit={emailUpdate} >
                <label>Email :</label>
                <input required type="email" placeholder={`Your email address is ${currentEmail}`} onChange={(e)=>setEmail(e.target.value)}></input>
                <Button variant="dark" type="submit" >save</Button>
              </form>
            </section>
            <section >
        {failPass && <Alert key='danger' variant='danger'>{errMsg}</Alert>}
       {successPass && <Alert key='success' variant='success'> {errMsg}</Alert>}
        </section>
            <section className={style["security-bottom-bottom"]}>
              <form onSubmit={passwordUpdate} >
                <label>Password :</label>
                <input required type="password"  placeholder={`Enter Current Password`} onChange={(e)=>setOldPass(e.target.value)}></input>
                <input required type="password"  placeholder={`Enter New password`} onChange={(e)=>setNewPass(e.target.value)}></input>
                <input required type="password" placeholder={`Re-type New password`} onChange={(e)=>setNewPassConfirm(e.target.value)}></input>
                <Button variant="dark" type='submit' >  Change Password</Button>
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
