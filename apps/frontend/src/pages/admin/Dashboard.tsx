import React from 'react'

function Dashboard() {

  const handleLogout = () => {
    console.log('someone clicked logout!');
  };

  return (
    <div>
      Dashboard
    <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard