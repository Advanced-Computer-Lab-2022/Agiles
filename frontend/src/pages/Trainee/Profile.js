import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./Profile.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ProfileSideBar from "./ProfileSidebar";
import Cookie from "universal-cookie";
import axios from "axios";
import { useEffect } from "react";
const cookie = new Cookie();
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";
const updateUrl = "/individualtrainee/updateBasics";
const Profile = () => {
  const [isloading, setIsLoading] = useState(false);
  const id = cookie.get("currentUser");
  const [data, setData] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [minibio, setMiniBio] = useState("");
  const [wallet, setWallet] = useState(<div></div>);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchUrl, { params: { id: id } });
      setData(res.data);
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
      setMiniBio(res.data.mini_bio);
      if (!data.state) {
        setWallet(<div>Wallet : {data.wallet == null ? "" : data.wallet}</div>);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSumbit = (event) => {
    event.preventDefault();
    const body = {
      userId: id,
      firstname: firstname,
      lastname: lastname,
      minibio: minibio,
    };
    try {
      const res = axios.patch(updateUrl, body);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main"]}>
          <ProfileSideBar
            fullname={data.firstname + " " + data.lastname}
            state={"profile"}
          />
          <section className={style["profile"]}>
            <section className={style["profile-top"]}>
              <div>
                <h1>Public profile</h1>
                <label>Add information about yourself</label>
              </div>
            </section>
            <section className={style["profile-bottom"]}>
              <form onSubmit={handleSumbit}>
                <label>Basics :</label>
                <input
                  placeholder={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                ></input>
                <input
                  placeholder={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                ></input>
                <input
                  placeholder={minibio == "" ? "write your mini bio" : minibio}
                  onChange={(e) => setMiniBio(e.target.value)}
                ></input>
                <Button variant="dark" type="submit">
                  {" "}
                  save
                </Button>
              </form>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
