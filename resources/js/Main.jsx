import * as React from 'react';
import Sidebar from "./components/Sidebar.jsx";
import Button from '@mui/material/Button';

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setSidebarOpen(true)}>Hello</Button>
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
    </>
  );
}