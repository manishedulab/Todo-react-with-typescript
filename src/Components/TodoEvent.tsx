import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import {Navbar,Nav} from "react-bootstrap"
const TodoEvent: React.FC = () => {
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  }
  return (
    <>
      <Navbar color="faded">
        <Nav className='mr-auto nav_bar_wrapper'>
          <>
            <button className="button button1" onClick={logout}>Log Out</button>
          </>
        </Nav>
      </Navbar>
    <main className=''>
        <AddTodo />
      </main></>
  )
}
export default TodoEvent;





     

