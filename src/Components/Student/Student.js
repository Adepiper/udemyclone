import React, { Component } from 'react';
import './Student.css';

export class Student extends Component {
  render() {
    return (
      <div className='container-fluid student'>
        <div className='container'>
          <header>
            <h2>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
              quis.
            </h2>
          </header>

          <video src='' className='screen'></video>
          <div className='about'>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              deserunt.
            </p>

            <div className='stack'>
              <h3>Stack</h3>
              <p>Front-End</p>
            </div>
            <div className='description'>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                inventore facere veritatis? Quos!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
