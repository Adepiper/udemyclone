import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InstructorCoursesDetails = () => {
  const [item, setItem] = useState([]);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    //console.log(id);
    axios.get(`http://localhost:4000/videos/${id}`).then(res => {
      setItem(res.data);
    });
  }, [id]);
  console.log(item);
  if (item.length === 0) {
    return (
      <div className='conatiner-fluid student'>
        <div className='container'>
          <p>Loading</p>
        </div>
      </div>
    );
  } else {
    console.log(item);
    return (
      <div className='container-fluid student'>
        <div className='container'>
          <header>
            <h2></h2>
          </header>

          <div>
            <iframe className='screen' allowFullScreen></iframe>
          </div>

          <div className='about'>
            <h2>About Course</h2>
            <div className='stack'>
              <h3>Stack</h3>
              <p>{/*item.snippet.channelTitle*/}</p>
            </div>
            <div className='description'>
              <h3>Description</h3>
              <p>{/*item.snippet.description*/}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InstructorCoursesDetails;
