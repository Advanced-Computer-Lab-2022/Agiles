import { Form, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";

import axios from "axios";

const CourseExam = (props) => {
    const location = useLocation();
    const query = props.courseId;
    const [CourseExam, setCourseExam] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    
    let corporate = false;
    if (props.corporate) {
        corporate = true;
    }
    useEffect(() =>{
        

        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`/individualtrainee/courseExam?courseId=${query}`);
            let jsondata = await res.json();
            if (res.ok) {
                setCourseExam(jsondata);
            }
            setIsLoading(false);
          };
          fetchData();
    },[]);
   
    return (

        
        
         <div>
            <h1>Exam</h1>
            <form>
            {CourseExam.map((exam,index) => {
                return(
                    <>
                    <label>-{exam.questions}</label>
                    <div>
                    <input type="radio" value="1" name={`Choices${index}`}/> {exam.firstChoices}
                    <br/>
                    <input type="radio" value="2" name={`Choices${index}`} /> {exam.secondChoices}
                    <br/>
                    <input type="radio" value="3" name={`Choices${index}`} /> {exam.thirdChoices}
                    <br/>
                    <input type="radio" value="4" name={`Choices${index}`} /> {exam.fourthChoices}
                    <br/>
                    <br/>
                    <br/>
                  </div>
                    </>
                )
                })}
                </form>
         </div>
     



        
/*
    <div>
<h1>Exam</h1>
        {CourseExam.map((el,index) =>{
            
        <label>hello</label>    


        })}

    </div> 


    */
    );
};
export default CourseExam ;