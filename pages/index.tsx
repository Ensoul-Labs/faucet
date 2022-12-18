import Head from 'next/head'
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from "next/image"

export default function Home() {
  // const [sbtAddr, setSbtAddr] = useState<string>('');
  const [inputToken, setInputToken] = useState<string>('');
  const { address, isConnected } = useAccount();
  const [result, setResult] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');

  const BACKEND_ADDR = "https://us-central1-ensoul-labs-df8ed.cloudfunctions.net/app";
  // const BACKEND_ADDR = "http://localhost:5001/ensoul-labs-df8ed/us-central1/app";
  const sbtAddr = "0xbd86C457eC5Fe66e9f6857b5A56e93B844B084ad";

  const faucetHandler = async () => {

    const {status, data}:any = await axios.get(
      `${BACKEND_ADDR}/faucet/${sbtAddr}/${address}`
    ).catch((error) => {
      if (axios.isAxiosError(error)) {
        setErrMessage(`Error: ${error.response?.data.message}`);
        console.log(`axios error: ${error.response?.data.message}`);
        return false;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    });

    if (status === 200) {
      console.log(data);
      setResult(`Sent 0.1 Matic to your address successfully! tx: ${data.data}`);
    }
  }

  const donateHandler = async () => {}

  return (
    <div className="bg-[url('../static/images/bg.svg')] bg-cover h-screen overflow-hidden min-h-[961px]">
      <Head>
        <title>Soul Faucet</title>
      </Head>
      <div className="ml-[1500px] mt-3" >
          <ConnectButton />
      </div>
      
      <div className='h-12 w-[800px]' >
          {
            result === '' ? null :
            <div className="alert alert-info shadow-lg ml-[600px]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{result}</span>
            </div>
          </div>
          }
          {
            errMessage === "" ? null :
            <div className="alert alert-error shadow-lg ml-[600px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errMessage}</span>
              </div>
            </div>
          }
      </div>
      <div className='grid justify-center w-full mt-12' >
        <h1 className="text-5xl" >Soul Faucet</h1>
        <div className="form-control mt-3 " >
            <div className="input-group">
              <select className="select select-accent max-w-xs w-[130px]" >
                <option disabled defaultValue="Select your community">Select your community</option>
                <option value={"0xbd86C457eC5Fe66e9f6857b5A56e93B844B084ad"}>Test DAO</option>
                <option value={"0xbd86C457eC5Fe66e9f6857b5A56e93B844B084ad"} >SeeDAO</option>
                <option value={"0x53465d4ccE85D59e61bec2EcAFbC8f0114693FF6"}>Ensoul Labs</option>
                <option value={""}>Rebase</option>
              </select>
              <select className="select select-accent w-[130px] max-w-xs" >
                <option disabled defaultValue="Select Token Type">Select Token Type</option>
                <option >Matic</option>
                <option >Ether</option>
                <option >Goerli Ether</option>
                <option >BNB</option>
              </select>
            </div>
            <div className='mt-5' >
              <div className="form-control ">
                <div className="input-group">
                  <input type="text" placeholder="Type here" className="input input-bordered w-[500px]" />
                  <button className="btn btn-square w-36" onClick={() => faucetHandler()} >
                    Send Me Matic
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className='grid justify-center w-full mt-20' >
        <div className={"indicator mt-2 px-5 py-6 bg-white rounded-2xl mr-6 flex flex-col justify-center items-center shadow hover:shadow-lg"}>
            <div className='rounded-2xl bg-[#92B6FF] w-32 h-32 flex justify-center shadow'>
                <Image src="https://storage.googleapis.com/ensoul-labs-image/test.jpeg" alt="" width={130} height={130} className="rounded-full p-2" />
            </div>
            <div className="mt-4 w-36 text-center text-sx text-[#818894] font-semibold">Donator</div>
            <div className="mt-4 w-36 text-center text-sm text-[#b1c9f2] font-semibold">Thanks for contribution!</div>
        </div>
        <button className="btn btn-accent w-[100px] ml-10 mt-5">Donate</button>
      </div>
      <div className='flex items-center justify-center mt-[100px] ' > 
        <p className='text-1xl mr-5' >Made With ❤️ by </p>
        <Image src="/static/images/logo.svg" width={100} height={41} alt={""} />
      </div>
    </div>
  )
}
