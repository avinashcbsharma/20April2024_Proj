import React, { useState } from 'react';
import axios from 'axios';

const PincodeLookup = () => {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(true);

  const fetchData = async () => {
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      setMessage(response.data[0].Message);
      setData(response.data[0].PostOffice);
      setIsVisible(false);
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };
  // console.log("Full Data:  ", data);
  const filteredData = data.filter((item) => item.Name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {isVisible &&<h3> Enter Pincode</h3>}
      {isVisible &&<input id = "InPincode" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder=" Pincode" />}
      {isVisible && <button id="btn" onClick={fetchData}>Lookup</button>}

      {loading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      
      {!isVisible && <p><strong>Message: </strong>{message}</p>}
      
      {!isVisible && <input id = 'fltr' type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter" />}

      {filteredData.length === 0 && <div>Couldn’t find the postal data you’re looking for…</div>}
    <div id="card_container">
      {filteredData.map((item, index) => (      
          <div id = "pincode_card"  key={index} >
            <p>Name: {item.Name}</p>
            <p>Branch Type: {item.BranchType}</p>
            <p>Delivery Status: {item.DeliveryStatus}</p>
            <p>District: {item.District}</p>
            <p>Division: {item.Division}</p>
          </div>
      ))}
    </div>
    </div>
  );
};

export default PincodeLookup;
