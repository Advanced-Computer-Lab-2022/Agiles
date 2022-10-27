import React, { useState } from "react";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import "./SelectCountry.css"

function SelectCountry() {
   const [country , setCountry] = useState("egy");
  return ( 


    <div className="chooseCountry">

    <CountryDropdown  id="UNIQUE_ID" className='YOUR_CSS_CLASS' preferredCountries={['eg']}  value="" handleChange={e => {
      window.localStorage.setItem('country', e.target.value);
      console.log(window.localStorage.getItem('country'));
    }
}></CountryDropdown>   
    </div> 
); 
}

export default SelectCountry;
