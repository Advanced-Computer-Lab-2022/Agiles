import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import style from "./PrevReports.module.css";



const PrevReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {

        const fetchData = async() => {
            const res = await fetch("/instructor/viewReportedProblems");
            let jsondata = await res.json();
            if(res.ok){
                setReports(jsondata);
            }
        };
        fetchData();
    },[]);

return(
<>
<h1>Your Previous Reports</h1>
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