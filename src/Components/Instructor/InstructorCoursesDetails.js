import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from 'axios';

export class InstructorCoursesDetails extends Component {
  state = {
    item: []
  };

  getItems = () => {
    let { id } = useParams();
    axios
      .get(`https://peaceful-dawn-85735.herokuapp.com/videos/${id}`)
      .then(res => {
        const item = res.data;
        this.setState({
          item
        }).catch(err => [console.log(err)]);
      });
  };

  render() {
    return <div>hello</div>;
  }
}

export default InstructorCoursesDetails;
