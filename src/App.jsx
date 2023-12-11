import { useEffect, useState } from "react";

import Web3 from "web3";

import ABI from "./ABI.json";
import ProjectItem from "./components/projectList/ProjectItem";

import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import CreateProjectModal from "./components/Modals/CreateProjectModal/CreateProjectModal";

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
  const [contract, setContract] = useState("");

  const [createProjectModal, setCreateProjectModal] = useState(false);

  const openCreateProjectModal = () => {
    setCreateProjectModal(true);
  }

  const closeCreateProjectModal = () => {
    setCreateProjectModal(false);
  }

  function createProjectDApp (name, IE, description, goal, deadline) {
    DApp.init().then((contract) => {
      console.log(contract)
      contract.methods
        .createProject(name, IE, deadline, description, goal)
        .send({ from: DApp.account })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

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

  }, [contract]);

  return (
    <div className="App">
      <Header />

      <main id="content-main-page">
        <section id="content-new-project">
          <button onClick={openCreateProjectModal} id="button-new-project">+ Cadastrar Novo Projeto</button>
        </section>
        <div className="projects-container">
          <div className="projects-list">
            {projects &&
              projects.map((project, index) => (
                <ProjectItem key={index} {...project} />
              ))}
          </div>
        </div>
      </main>
      {createProjectModal &&
        <CreateProjectModal
          closeCreateProjectModal={closeCreateProjectModal}
          createProjectDApp={createProjectDApp}
        />}
      <Footer />
    </div>
  );
}

export default App;
