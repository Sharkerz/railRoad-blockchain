
import Web3 from "web3";
import contract from '../Contracts/RailRoad.json';

const ganache = 'HTTP://127.0.0.1:7545';
// const metamask = window.ethereum;
const web3 = new Web3(ganache);
const railRoad = new web3.eth.Contract(contract.abi, '0x07d16A5CB961fD28823AE5a19b86e0cE08d4a8A7', {gasPrice: '20000000000', gas: '20000000000'});

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

  allCards = async (account) => {
    return await railRoad.methods.retrieveAllCards().call({ from: account});
  }

  availableCards = async (account) => {
    return await railRoad.methods.getAvailableCards().call({ from: account, gasPrice: '20000000000'});
  }

  myCards = async (account) => {
    return await railRoad.methods.getMyCards().call({ from: account, gasPrice: '20000000000'});
  }

  createCard = async (account, data) => {
    return await railRoad.methods.createCard(data.name, data.price, data.count, data.discount, data.image, data.description).call({ from: account, gasPrice: '20000000000'});
  }

}

export default new Contract();