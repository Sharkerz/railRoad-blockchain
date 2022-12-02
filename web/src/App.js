import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import {useEffect, useState} from "react";
import contract from "./RailRoad.json";
import React from "react";

const metamask = window.ethereum;
const ganache = new Web3('HTTP://127.0.0.1:7545');

const web3 = new Web3(metamask);


function App(): Element {
    
    const [ accounts, setAccounts ] = useState([]);
    const [balance, setBalance] = useState([]);

    const requestAccounts = async(): Promise<void> => {

        const _accounts = await web3.eth.getAccounts();
        setAccounts(_accounts)

        const _balance = await web3.eth.getBalance(_accounts[0]);
        setBalance(web3.utils.fromWei(_balance, 'ether'));

        let YourContract = new web3.eth.Contract(contract.abi, '0xAfE44D75a9bF866D1b35dd7e6B0c76D57AC95C34', {gasPrice: '20000000000', gas: '20000000000'});
        console.log(YourContract)

        const acc = await web3.eth.accounts;
        console.log(acc)

        const val = await YourContract.methods.getAvailableCards().call({from: _accounts[0], gasPrice: '20000000000'});
        console.log(val);

        const isAdmin = await YourContract.methods.isAdmin().call({ from: _accounts[0], gasPrice: '20000000000'});
        console.log(isAdmin);
    }

    useEffect(():void => {
        requestAccounts()
    }, [])

    return (
        <div className="App">
            {accounts && <> <p>My userAccount {accounts[0]}</p></>}
            {balance && <> <p>My balance {balance} ETH</p></>}
        </div>
    );
}

export default App;
