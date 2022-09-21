//import logo from './logo.svg';

import Web3 from "web3";

import React, {useState} from "react"

import { SimpleStorageAbi } from './abis'



import './App.css';

function App() {
  var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"))
  const contractAddr = '0x0E718D484f4cC6e2d376681cc3eF9EEa06DAb5A7';
  const simpleContract = new web3.eth.Contract(SimpleStorageAbi, contractAddr);
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await simpleContract.methods.getStorageF().call();
    setGetNumber(result);
    console.log(result);
  }

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await simpleContract.methods.setStorageF(number)
    .estimateGas();
    const result = await simpleContract.methods.setStorageF(number).send(
      {
        from:account,
        gas
      }
    );
    console.log(result);
  }



  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type='text' name="name" value={number} onChange={e => setNumber(e.target.value)}/>
          </label>
          <input type='submit' value='Set Number' />
        </form>
        <br/>
        <button onClick={handleGet} type='button'>
          Get Number
        </button>
        {getNumber}
      </header>
    </div>
  );
}

export default App;
