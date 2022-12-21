import React, { useState, useEffect } from "react";
import Courses from "../../Course/Courses";
import { BsSearch } from "react-icons/bs";
import NavbarStyles from "./SearchStyles.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import spinner from "/Users/abdullahahmad/Agiles/frontend/src/static/download.gif";
import LoadingScreen from "react-loading-screen";
import AdminFilter from "./AdminFilter";

function SetPromotion() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearched] = useState([]);
  const [action, setAction] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const handleSearch = async (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let URL = "/course/listCourses/details";
      if (action == 1) URL = "/course/listCourses/filter";
      if (action == 2) URL = "/course/listCourses/search";
      const res = await fetch(URL);

      let jsondata = await res.json();
      if (res.ok) {
        setCourses(jsondata);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [action]);
  if (isloading) return <LoadingScreen loading={true} logoSrc={spinner} />;
  return (
    <div>
      <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch
          className={NavbarStyles["search-icon"]}
          onClick={handleSearch}
        />
        <input
          className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={(event) => setSearchString(event.target.value)}
        ></input>
      </form>
      <div>
        <AdminFilter />
      </div>
      <div>search</div>
      <Table>
        <TableRow>ggg</TableRow>
      </Table>
    </div>
  );
}

export default SetPromotion;
