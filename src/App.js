import { useEffect, useState } from "react";

import Web3 from "web3";

import ABI from './ABI.json';
import "./App.css";

const CONTRACT_ADDRESS = "0xCf6f170393e96b9d0672b385845cae3C33FAa35A";


const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        DApp.account = accounts[0];
        window.ethereum.on('accountsChanged', DApp.updateAccount);
      } catch (error) {
        console.error('User denied account access')
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.warn("Please install MetaMask")
      return ;
    }
    return DApp.initContract();
  },

  updateAccount: async function() {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
  },

  initContract: async function () {
    return DApp.contracts.Pinance = (await new DApp.web3.eth.Contract(ABI, CONTRACT_ADDRESS));
  },

  getAllProjects: async function () {
    try {
      return DApp.contracts.Pinance.methods.getProjects().call({ from: DApp.account });
    } catch (error) {
      console.error('Error retrieving projects:', error.message);
      return [];
    }
  },
}

function App() {

  const [projects, setProject] = useState("");
  
  
  DApp.init();

  DApp.getAllProjects().then((projects) => {
    setProject(projects);
  });
  
  return (
    <div className="App">
      <header>
        <h1>PI.nance</h1>
        <p>Your project finance manager.</p>
        
        <div className="projects">
          <h2>Projects</h2>
          <ul>
            {projects && projects.map((project, index) => {
              console.log(project.goal);
              return (
                <li key={index}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>Goal: {Web3.utils.fromWei(project.goal, 'ether')} ETH</p>
                  <p>Current: {Web3.utils.fromWei(project.balance, 'ether')} ETH</p>
                  <p>Owner: {project.owner}</p>
                </li>
              );
            })}
          </ul>
        </div>

        </header>
    </div>
  );
}

export default App;