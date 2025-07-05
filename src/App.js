
import { useState, useEffect } from "react";
import { HashLoader } from 'react-spinners';

import MoonLoader from "react-spinners/MoonLoader";

import { IoIosClose } from "react-icons/io";


import { CiStar } from "react-icons/ci";
import logo from './images/logo.png';
import './App.css';


function App() {


  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [requireBusinessName, setRequireBusinessName] = useState(false);
  const [requireLocation, setRequireLocation] = useState(false);

  const [detailedData, setDetailedData] = useState([]);

  const [previousName, setPreviousName] = useState('');
  const [previousLocation, setPreviousLocation] = useState('');

  const [showTheWarningOne, setShowTheWarningOne] = useState('')

  const [isNewHeadlineDone, setIsNewHeadlineDone] = useState(false)




  useEffect(() => {
    if (showTheWarningOne) {
      const timeout = setTimeout(() => {
        setShowTheWarningOne(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [showTheWarningOne]);



  const onClickSubmitOne =   (e) => {
    e.preventDefault();
    if (businessName && location) {
      setSubmitted(true);
      if(previousName !== businessName || previousLocation !== location){
        setDetailedData([])
        setPreviousName(businessName)
        setPreviousLocation(location)
        const getDetails = async () => {
          console.log("hahah")
          const data = {name:businessName, location: location}
          const url = "https://localbusiness-t4nf.onrender.com/business-data"
          const options = {
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          }

          const response = await fetch(url, options);
          const retrivedData = await response.json();
          setDetailedData(retrivedData);
        }

        getDetails();
      }else if(previousName === businessName && previousLocation === location){
        setShowTheWarningOne(true)
      }

    }else{
      if (businessName.length === 0) {
        setRequireBusinessName(true);
      }else{
        setRequireBusinessName(false);
      }
      if (location.length === 0) {
        setRequireLocation(true);
      }else{
        setRequireLocation(false);
      }
    }


  }

  const onchangeBusinessName = (e) => {
    setBusinessName(e.target.value);
    if (e.target.value.length !== 0) {
      setRequireBusinessName(false);
    }
  }

  const onblurtheBusinessName = (e) => {
    if (e.target.value.length === 0) {
      setRequireBusinessName(true);
    }else{
      setRequireBusinessName(false);
    }
  }

  const onchangeLocation = (e) => {
    setLocation(e.target.value);
    if (e.target.value.length !== 0) {
      setRequireLocation(false);
    }
  }

  const onblurtheLocation = (e) => {
    if (e.target.value.length === 0) {
      setRequireLocation(true);
    }else{
      setRequireLocation(false);
    }
  }

  const onClickRegerateButton = () => {
    if(location && businessName){
      setIsNewHeadlineDone(true)
      const getDetails = async () => {
        const url = `https://localbusiness-t4nf.onrender.com/regenerate-headline?name=${businessName}&location=${location}`
        const response = await fetch(url);
        const data = await response.json();
        setDetailedData({...detailedData, headline:data.headline})
        setIsNewHeadlineDone(false)
      }
      getDetails();
    }
  }

  return (
    <div className="App">
      <div className='app-logo-cont'>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='app-logo-text'>Mini Local Business Dashboard</h1>
      </div>
      <form className='form-container'>
        <div className='form-field'>
          <label htmlFor="businessName">Business Name:</label>
          <input onBlur={onblurtheBusinessName} onChange={onchangeBusinessName}  placeholder="Enter business name"  type="text" id="businessName" name="businessName" required />
          <p className='error-text' style={{ display: requireBusinessName ? 'block' : 'none' }}>
            required*
          </p>
        </div>
        <div className='form-field'>
          <label htmlFor="location">Location:</label>
          <input onBlur={onblurtheLocation} onChange={onchangeLocation} placeholder="Enter location" type="text" id="location" name="location" required />
          <p className='error-text' style={{ display: requireLocation ? 'block' : 'none' }}>
            required*
          </p>
        </div>
        <button onClick={onClickSubmitOne} type="submit" className='submit-button'>
          Submit
        </button>
        {showTheWarningOne &&         
        <div className="warning-of-submit-one">
          <IoIosClose onClick={() => setShowTheWarningOne(false)} className="close-button-warning" />
          <p>1. Change the name or location to view the related details.</p>
          <p>2. If you want a new headline with the same name and location, just click the Regerate Headline button below.</p>
        </div> 
        }

      </form>
      {submitted && (
        <div className='card-container'>
          {detailedData.length === 0 ? 
            <div className='loader-container'>
                <div>
                  <HashLoader
                    color="#36d7b7"
                    loading={true}
                    size={50}
                    speedMultiplier={1.2}
                  />
                </div>
                <p className="loader-text">Loading...</p>
              </div> : 
              <>
                <h1 className="card-items">Ratings: <span className="special-one">{detailedData.rating}</span><CiStar className="star-icon" /></h1>
                <h1 className="card-items">Review: <span className="special-one">{detailedData.reviews}</span></h1>
                
                <h1 className="card-items">Headline: <br /> {detailedData.headline}  </h1>
                <div className="regerate-button-container">
                  <button type="button" onClick={onClickRegerateButton} className="regerate-button">Regenerate Headline</button>
                  
                  {isNewHeadlineDone && <MoonLoader  color="#45a049" size={20} />}
                  
                </div>
              </> 
              }
        </div>
      )}
    </div>
  );
}

export default App;
