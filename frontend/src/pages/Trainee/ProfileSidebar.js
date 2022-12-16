import style from './Profile.module.css'
import userimage from "../../static/user.png"
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ProfileSideBar = ({fullname,state}) => {
    const navigate = useNavigate();
    const status = cookies.get('status');
    const handleNavigate = (e)=>{
            navigate(e.target.id)
    }  
    return ( <section className={style['side-bar']}>
             <section className={style['side-bar-top']}>
               <img src = {userimage} alt="User"></img>
               <label>{fullname}</label>
             </section>
             <section className={style['side-bar-bottom']}>
                    <ul>
                        <li id ="/profile" className={state==='profile'?style['side-bar-bottomClicked']:""} onClick={handleNavigate}><span id ="/profile" >Profile</span></li>
                        <li id ="/accountsettings" className={state==='security'?style['side-bar-bottomClicked']:""} onClick={handleNavigate}><span  id ="/accountsettings">Account Security</span></li>
                       {status!=1&&<li id ="/paymentMethods" className={state==='payment'?style['side-bar-bottomClicked']:""} onClick={handleNavigate}><span id ="/paymentMethods">Payment Methods</span></li>}
                       {status==1&&<li id ="/reviews" className={state==='reviews'?style['side-bar-bottomClicked']:""} onClick={handleNavigate}><span id ="/paymentMethods">Reviews</span></li>}
                       <li id ="/wallet" className={state==='wallet'?style['side-bar-bottomClicked']:""} onClick={handleNavigate}><span id ="/wallet">Wallet</span></li>
  
                    </ul>
                </section>
    </section> );
}
 
export default ProfileSideBar;