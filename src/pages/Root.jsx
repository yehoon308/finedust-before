import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../header/NavBar';

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
