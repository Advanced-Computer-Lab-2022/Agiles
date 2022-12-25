import FilterStyles from "./AdminFilter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "react-bootstrap/Accordion";
import { subjectList } from "../../Course/subjectList.js";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
const AdminFilter = ({ changeMessage, currentMessage, courses }) => {
  const [disapled, setDisapled] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const handleChangePrice1 = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setMinPrice(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setMinPrice(event.target.value);
    }
  };
  const handleChangePrice2 = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setMaxPrice(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setMaxPrice(event.target.value);
    }
  };
  const handleChangePriceFree = async (event) => {
    if (event.target.checked) {
      setMinPrice(0);
      setMaxPrice(0);
      setDisapled(true);
    } else {
      setMaxPrice(Number.MAX_SAFE_INTEGER);
      setDisapled(false);
    }
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async () => {
    if (subject == "" && minPrice == null && maxPrice == null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "please fill at least one field ",
      });
    } else {
      let newMessage = [];
      currentMessage.forEach((el) => {
        if (
          (subject == "" || el.subject == subject) &&
          (minPrice == null || el.price >= minPrice) &&
          (maxPrice == null || el.price <= maxPrice)
        ) {
          newMessage.push(el);
        }
      });
      changeMessage(newMessage);
    }
  };
  return (
    <div className={FilterStyles["filter"]}>
      <div className={FilterStyles["top"]}></div>
      <hr />
      <div className="center">
        <Accordion defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Subject</Accordion.Header>
            <Accordion.Body style={{ display: "grid" }}>
              {subjectList.map((subject, index) => (
                <Form.Check
                  name="subject"
                  key={index}
                  type="radio"
                  id={`default-${subject}`}
                  value={subject}
                  onChange={handleChangeSubject}
                  label={subject}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body style={{ display: "flex" }}>
              <Form.Control
                type="number"
                placeholder="Min"
                disabled={disapled}
                onChange={handleChangePrice1}
                className={FilterStyles["inpt"]}
              />
              <Form.Control
                type="number"
                placeholder="Max"
                disabled={disapled}
                className={FilterStyles["inpt"]}
                onChange={handleChangePrice2}
              />
              <Form.Check
                type="checkbox"
                label="Free"
                className={FilterStyles["check"]}
                onClick={handleChangePriceFree}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div style={{display:'flex',gap:'1rem'}}>
      <button className={FilterStyles["logo"]} onClick={handleSubmit}>
        <span>
          <FilterListIcon /> Filter
        </span>
      </button>
      <button className={FilterStyles["logo"]} onClick={()=>changeMessage(courses)}>
        <span>
         clear filter
        </span>
      </button>
      </div>
    </div>
  );
};

export default AdminFilter;
