
import { useState } from "react";
import { HashLoader } from 'react-spinners';

import logo from './images/logo.png';
import './App.css';


function App() {


  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [requireBusinessName, setRequireBusinessName] = useState(false);
  const [requireLocation, setRequireLocation] = useState(false);

  const onClickSubmitOne = (e) => {
    e.preventDefault();
    if (businessName && location) {
      setSubmitted(true);
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
      </form>
      {submitted && (
        <div className='card-container'>
          {/* <div className='loader-container'>
              <div>
                <HashLoader
                  color="#36d7b7"
                  loading={true}
                  size={50}
                  speedMultiplier={1.2}
                />
              </div>
              <p className="loader-text">Loading...</p>
            </div> */}
          <h1>Ratings: 4.5 </h1>
          <h1>Review: 400</h1>
          <h1>Headline: </h1>
        </div>
      )}
    </div>
  );
}

export default App;
