import axios from 'axios';
import React, { useEffect } from 'react';

const Home = () => {
  const pet = async () => {
    try {
      const res = await axios({
        method: 'post',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: `${process.env.REACT_APP_API_URL}/api/v1/pets/getallpets`,
      });
      console.log(res.data);
    } catch (error) {
      if (error.response.data.error.message === 'jwt expired') {
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    pet();
  }, []);

  return <div>Home</div>;
};

export default Home;
