import { useEffect, useState } from "react";

import Web3 from "web3";

import ABI from "./ABI.json";
import ProjectItem from "./components/projectList/ProjectItem";

import "./App.css";

const CONTRACT_ADDRESS = "0x100590AaE16a843E588954B32A80686dB71a91e6";

const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on("accountsChanged", DApp.updateAccount);
      } catch (error) {
        console.error("User denied account access");
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.warn("Please install MetaMask");
      return;
    }
    return DApp.initContract();
  },

  updateAccount: async function () {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
  },

  initContract: async function () {
    return (DApp.contracts.Pinance = await new DApp.web3.eth.Contract(
      ABI,
      CONTRACT_ADDRESS
    ));
  },
};

function App() {
  const [projects, setProject] = useState("");

  useEffect(() => {
    DApp.init().then((contract) => {
      contract.methods
        .getProjects()
        .call()
        .then((projects) => {
          console.log(projects);
          setProject(projects);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);
  return (
    <div className="App">

      <header id="header-main-page">
        <h1>PI_nance</h1>
        <p>Your project finance manager.</p>

      </header>

      <main id="content-main-page">
        <div className="projects-container">
          <h2>Projects</h2>
          <div className="projects-list">
            {projects &&
              projects.map((project, index) => (
                <ProjectItem
                  key={index}
                  {...project}
                />
              ))}
          </div>
          
        </div>
      </main>

      <footer id="footer-main-page">

      </footer>

    </div>
  );
}

export default App;
