import React from 'react'

import { IoIosCloseCircle } from "react-icons/io";

import './CreateProjectModal.css';

export default function CreateProjectModal(props) {

  const createProjectData = () => {
    const projectName = document.getElementById('project-name').value;
    const projectIE = document.getElementById('project-ie').value;
    let projectDescription = document.getElementById('project-description').value;
    const projectGoal = document.getElementById('project-goal').value;
    let projectDeadline = document.getElementById('project-deadline').value;

    projectDeadline = new Date(projectDeadline).getTime() / 1000;

    props.createProjectDApp(projectName, projectIE, projectDescription, projectGoal, projectDeadline)
    props.closeCreateProjectModal()
  }
  return (
    <div className='create-project-modal'>
      <div className="create-project-modal-content">
        <form className="create-project-forms">
          <h1>Cadastrar Novo Projeto</h1>
          <label htmlFor="project-name">Nome do Projeto</label>
          <input type="text" id="project-name" />

          <label htmlFor="project-name">Instituição de Ensino</label>
          <input type="text" id="project-ie" />

          <label htmlFor="project-description">Descrição do Projeto</label>
          <textarea id="project-description" />

          <label htmlFor="project-goal">Meta do Projeto</label>
          <input type="number" id="project-goal" />

          <label htmlFor="project-deadline">Prazo do Projeto</label>
          <input type="date" id="project-deadline" />

          <div className="create-project-forms-buttons">
            <button className='create-project-cancel' type="button" onClick={props.closeCreateProjectModal}>Cancelar</button>
            <button className='create-project-create' type="button" onClick={createProjectData}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
