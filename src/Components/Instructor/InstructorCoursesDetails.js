import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InstructorCoursesDetails = () => {
  const [item, setItem] = useState([]);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:4000/videos/${id}`).then(res => {
      setItem(res.data);
    });
  }, [id]);

  return <div>hello</div>;
};

export default InstructorCoursesDetails;
