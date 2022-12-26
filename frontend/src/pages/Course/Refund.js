//create refund page
import React from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import RegCourse from './RegCourse';
import style from './RegCourse.module.css';

const Refund = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <div className={style["mainreg"]}>
                <div className={style["mainLeft"]}>
                    <RegCourse
                    course_id={location.state.course_id}
                    course_img={location.state.course_img}
                    course_title={location.state.course_title}
                    course_inst={location.state.course_inst}
                    name="refund"
                    progress={location.state.progress}
                    idx={0} > 
                    </RegCourse>
                </div>
                <div className={style["mainRight"]}>
                    <h1>Request Refund</h1><h3>We are sorry you are unhappy with the course {location.state.course_title}
                    and would like a refund to help us process your request, please include a reason</h3>
                </div>
            </div>
        </div>
    );
    }

export default Refund;