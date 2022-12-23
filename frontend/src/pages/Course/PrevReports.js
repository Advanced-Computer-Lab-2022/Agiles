import axios from "axios";
import { useEffect, useState ,useRef} from "react";
import Card from 'react-bootstrap/Card';
import style from "./PrevReports.module.css";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";





const PrevReports = () => {
    const [reports, setReports] = useState([]);
    const [followUp, setFollowUp] = useState("");
    const [reportId, setReportId] = useState("");
    const [followUpArr , setFollowUpArr]=useState([]);
   
     
   
    
    const handleSubmit = async(event) => {
       const follow = {
       reportId: reportId,
       followUpArr: followUpArr,
       };
       event.preventDefault();
       let config = {
         headers: {
           header1: "Access-Control-Allow-Origin",
         },
       };
       try {
         const res = await axios.patch("/instructor/addFollowUp", follow, config);
         Swal.fire({
           position: "top-end",
           icon: "success",
           title: "Your Follow Up has been added Successfully",
           showConfirmButton: false,
           timer: 1500,
         });
     } catch (e) {
       Swal.fire({
         position: "top-end",
         icon: "error",
         title: "Error during Add the follow up please Try Again",
         showConfirmButton: false,
         timer: 1500,
       });
     }
 
     };
    
    
    useEffect(() => {
        
        const fetchData = async() => {
            const res = await fetch("/instructor/viewReportedProblems");
            let jsondata = await res.json();
            if(res.ok){
                setReports(jsondata);
              //  console.log(reports);
            }
        };
        fetchData();
    },[]);
return(
<>
<h1 style={{ paddingLeft: '40%',color: "rgb(160, 4, 7)" ,paddingBottom : "4%" }}>Your Previous Reports</h1>
<div className={style["cards"]}>
<ul>
{reports.map((report, index) => {
    return(
<li>

        <Card
        bg={report["status"] === 'pending' ? 'danger' : 'success'}
        key={report["status"] === 'pending' ? 'Danger' : 'Success'}
        text={(report["status"] === 'pending' ? 'Danger' : 'Success') === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-2"
        >
          <Card.Header>{report["status"]}</Card.Header>
          <Card.Body>
            <Card.Title>{report["reportType"]} Problem </Card.Title>
            <Card.Text>
            {report["description"]}
            <br></br>
            {report["followUp"].length == 0
            ? <span></span>
                :
                <>
                 <div>
            
                <span >Your Follow Ups</span>
                <br></br>
            {report["followUp"].map((follow, indexx) => {
                return(
                    <>
            <span>{indexx+1}. {follow}</span>
            <br></br>
        </>
            );
        })}
            </div>
        </>}

            <div>
      {report["status"]==="pending"
        ?  <>

        <div>
        <Popup trigger={<Button variant="secondary">Add Follow Up</Button>} position="right center">
    <div>
      <form onSubmit={handleSubmit} >
        <label>Add Your Follow Up</label>
        <input
    label="Add Follow Up"
    id={index}
    onChange={(e)=>{
     setReportId(report["_id"]);setFollowUpArr([...report["followUp"],e.target.value]);}
    } 
    />
   <Button variant="success" type="submit" onClick={handleSubmit}>Add Follow Up</Button>
      </form>

    </div>
  </Popup>
            </div>
            </>
        : <span></span>
      }
    </div>
            </Card.Text>
          </Card.Body>
        </Card>
              </li>
            );
    })}
    </ul>
    </div>
    
</>
);

};
export default PrevReports;