import { useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams(); 
    let searchString = searchParams.get("search");
    const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/course/listCourses/search?search=${searchString}`);
      if (res.ok) {
        setCourses(res.data);
        console.log(res.data);
      }
    };
    fetchData();
  }, []);
        return (<div>
           iasfnlklanfsk
        </div>
     );
}
 
export default SearchResults;