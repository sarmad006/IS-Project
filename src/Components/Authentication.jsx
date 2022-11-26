import React,{useState} from 'react'
import { RingSpinnerOverlay } from 'react-spinner-overlay';
import { toast } from 'react-toastify'
import FileInput from './FileInput'
import Admin from './Admin'

const Authentication = () => {
    const allowedAccounts={
        "admin":"0xa8A2b9B81664faF64C9557d74Fe6F8224e02A474",
        "dean" : "0x552756837bDdEd8A09F7d260d4f0aB6d1517bEF6",
        "student" : "0xC5892fAbB85e66D63017a0D7fa9e98678b5320e9"
      }
      const [Loader,setLoader]=useState(false);
      const [hashFile,setHashFile]=useState(false)
      const [user,setUser]=useState(false);
    
      const connectMetaMask=async(role)=>{
        if(window.ethereum){
          console.log("Connected to metamask")
         const chainId= await window.ethereum.request({method:'eth_chainId'})
          const ganacheChainId="0x539";
          if(chainId!==ganacheChainId)
          {
            return;
          }
          else{
            console.log("Connected to ganache");
          }
          const accounts= await window.ethereum.request({method:"eth_requestAccounts"})
          console.log(accounts);
          if(role==="Admin" && accounts[0].toLowerCase()===allowedAccounts.admin.toLowerCase())
          {
            setUser("admin")
          }
          else if(role==="Dean" &&  accounts[0].toLowerCase()===allowedAccounts.dean.toLowerCase())
          {
            setUser("dean")
          }
          else if(role==="Student" && accounts[0].toLowerCase()===allowedAccounts.student.toLowerCase())
          {
            setUser("student")
          }
          else
          {
            toast.error("Not authorized",{position: "bottom-center",
            autoClose: 5000,
            theme:"dark"
          })

          }
           setTimeout(()=>{
          setLoader(false)
         },2000)
        }
      }
    
      const handleClick=(e,role)=>{
         e.preventDefault();
         setLoader(true)
         connectMetaMask(role);
        
      }
     
  return (
    <div>
        {Loader && <RingSpinnerOverlay  loading={Loader} color="blue"/>}
        {user ? (
            <div className="flex justify-center  my-20">
            <div className='w-2/4'>
      {user==="student" && <FileInput setHashFile={setHashFile}/>}
      {user==="admin" && <Admin hashFile={hashFile}/>}
      {user==="dean" && <p className="text-lg text-black">Dean</p>}
                </div>
                </div>
        ) : 
        (
        <div className='bg-[url("/public/background.jpg")] bg-no-repeat bg-cover bg-center w-full h-screen p-24'>
        <div className="p-2 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 mx-auto">
        <p className="text-lg  border-b-2 border-blue-400 w-1/4 pb-2 font-semibold">Sign In</p>
        <div className='flex flex-col justify-center items-center mt-6 gap-y-2'>
          <button onClick={(e)=>handleClick(e,"Student")} className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Student</button>
          <button onClick={(e)=>handleClick(e,"Admin")}className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Admin</button>
          <button onClick={(e)=>handleClick(e,"Dean")}className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Dean</button>
        </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Authentication