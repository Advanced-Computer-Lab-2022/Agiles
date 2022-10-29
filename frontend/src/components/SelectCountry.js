import React, { useEffect, useState } from "react";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import "./SelectCountry.css"

function SelectCountry() {
   const [country , setCountry] = useState("");
  
   return ( 


    <div className="chooseCountry">

    <CountryDropdown  id="UNIQUE_ID" className='YOUR_CSS_CLASS' preferredCountries={[window.sessionStorage.getItem('originCountry')]}  value="" handleChange={e => {
     window.sessionStorage.setItem('originCountry', e.target.value);
      const arr = window.sessionStorage.getItem('originCountry').split(" (");
      window.sessionStorage.setItem('country',arr[0] );
    
     fetch(`https://restcountries.com/v2/name/${window.sessionStorage.getItem("country")}`)
        .then(async response => {
            const data = await response.json();
            if(window.sessionStorage.getItem("country")=="United States"){
              window.sessionStorage.setItem("currency","usd");
            }else{
              window.sessionStorage.setItem("currency",data[0].currencies[0].code);
            }

          
          
            
            const curr = window.sessionStorage.getItem("currency").toLowerCase();
          
            window.sessionStorage.setItem("factor",1);          
            
       fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${curr}.json`)
          .then(async response => {
              const data = await response.json();
              var y =Object.values(data);
              console.log(y[1]);
              window.sessionStorage.setItem("factor",y[1]);
                       
            });
          });


    }
}></CountryDropdown>   
    </div> 
); 
}

export default SelectCountry;
