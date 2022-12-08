
import Web3 from "web3";
import contract from "../RailRoad.json";

const ganache = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(ganache);
const railRoad = new web3.eth.Contract(contract.abi, '0x2fA2B60C8475b491054272119B2124AC30735c0b', {gasPrice: '20000000000', gas: '20000000000'});

class Contract {
  accounts = async () => {
    return await web3.eth.getAccounts();
  }

  balance = async (account) => {
    const _balance = await web3.eth.getBalance(account);
    
    return web3.utils.fromWei(_balance, 'ether');
  }

  isAdmin = async (account) => {
    return await railRoad.methods.isAdmin().call({ from: account, gasPrice: '20000000000'});
  }

  availableCards = async (account) => {
    return await railRoad.methods.getAvailableCards().call({ from: account, gasPrice: '20000000000'});
  }
}

export default new Contract();