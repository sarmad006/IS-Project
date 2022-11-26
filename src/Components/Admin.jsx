import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Admin = ({hashfile}) => {
    

    
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
     {hashfile ? 
     (
     <div>
     <a href={`https://gateway.pinata.cloud/ipfs/${hashfile}`}>Check Application</a> 
     </div>
     )
    : <p>No File exists</p> 
    }
    </div>
    </>
  )
}

export default Admin