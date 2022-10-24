import React from "react";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import "./SelectCountry.css"

function SelectCountry() {
  return ( 
    <div className="chooseCountry">

    <CountryDropdown  id="UNIQUE_ID" className='YOUR_CSS_CLASS' preferredCountries={['eg']}  value="" handleChange={e => console.log(e.target.value)}></CountryDropdown>   
    </div> 
); 
}

export default SelectCountry;
