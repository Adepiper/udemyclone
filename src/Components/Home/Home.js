import React, { Component } from 'react';
import './Home.css';
import Courses from './Courses';

export class Home extends Component {
  state = {
    courses: [
      {
        id: 1,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Front-End',
        video: ''
      },
      {
        id: 2,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Front-End',
        video: ''
      },
      {
        id: 3,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Front-End',
        video: ''
      },
      {
        id: 4,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Devops',
        video: ''
      },
      {
        id: 5,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Python',
        video: ''
      },
      {
        id: 6,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Back-End',
        video: ''
      },
      {
        id: 7,
        title: 'Lorem ipsum dolor site',
        about: `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        deserunt.`,
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolorum ea, dolores numquam rem quas, voluptatum possimus alias
        obcaecati maxime dolor, porro corrupti hic natus et est eaque
        perferendis assumenda ipsa iste asperiores? Ut nisi ducimus
        ullam amet atque soluta, explicabo veniam hic doloribus
        molestiae excepturi iure pariatur minus, dolorem exercitationem
        tenetur cupiditate voluptatum, asperiores voluptate rerum. Quo,
        dignissimos iure. Laboriosam expedita reiciendis cum repellat
        dignissimos consequuntur officia ducimus, dolorem officiis
        aperiam magnam cumque! Id maiores incidunt velit doloribus
        tempora doloremque animi, nesciunt corrupti autem est rem
        distinctio aut hic ipsam magni in vitae ut voluptatibus tempore
        inventore facere veritatis? Quos!`,
        courseCover: `https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        stack: 'Visual-Effect',
        video: ''
      }
    ]
  };
  render() {
    return (
      <div className='container-fluid'>
        <div className='container'>
          <header className='header'>
            <div className='jumbotron text-center'>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione hic repudiandae harum asperiores iure ipsum dolore odit.
                Praesentium, quasi ipsum!
              </p>
              <button className='btn btn-outline-primary'>Go to courses</button>
            </div>
          </header>

          <div className=' courses'>
            <Courses courses={this.state.courses} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
