//initialize
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Document,Page } from 'react-pdf'
import style from './Certificate.module.css'

import pdf from '../../static/certificate.pdf'
import certimage from '../../static/certificate.png';
//import button react bootstrap
import {Button} from 'react-bootstrap'
import jsPDF from "jspdf";



//fetch data
    

//set data
const Certificate = () => {

    const location = useLocation();
    const courseId = location.state.course_id;
    const index = location.state.idx;
    const courseImg = location.state.course_img;
    const courseTitle = location.state.course_title;
    const courseInst = location.state.course_inst;
    const fname = location.state.fname;
    const lname = location.state.lname;

    const downloadPDFFile = () => {
        fetch(pdf).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'SamplePDF.pdf';
                alink.click();
            })
        })
    }

    const handleCertificate = () => {
        downloadPDFFile();
    }


    return (
        <section className= {style["main-section"]}>
            {/* certificate iamge */}
            <section className={style["certificate-section"]}>
                <img src={certimage
                } alt="certificate" className={style["certificate-img"]}/>
            </section>
            {/* course details */}
            <section className={style["course-section"]}>
                <div className={style["course-recepient"]}>
                    <h1 className={style["recepient-name"]}>{fname+" "+lname}</h1>
                    <h2 className={style["recepient-title"]}>has successfully completed</h2>
                </div>
                <div className={style["course-img"]}>
                    <img src={courseImg
                    } alt="course-img" className={style["course-img"]}/>
                </div>
                <div className={style["course-details"]}>
                    <h1 className={style["course-title"]}>{courseTitle}</h1>
                    <h2 className={style["course-inst"]}>{courseInst}</h2>
                    <Button className={style["course-btn"]} onClick={handleCertificate}>Download Certificate</Button>
                </div>
            </section>
        </section>


    )
}

export default Certificate
