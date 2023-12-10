import React, { useEffect, useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";
import { FaHandHoldingUsd } from "react-icons/fa";

import "./ProjectDetailsModal.css";

export default function ProjectDetailsModal(props) {
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        const deadlineMilliseconds = Number(props.deadline) / 1000000;
        const deadlineDate = new Date(deadlineMilliseconds);

        const day = deadlineDate.getDate();
        const month = deadlineDate.getMonth() + 1;
        const year = deadlineDate.getFullYear();

        setDeadline(`${day}/${month}/${year}`);
    }, [props.deadline]);

    return (
        <div className="project-details-modal">
            <div className="project-details-modal-content">
                <IoIosCloseCircle
                    className="project-details-modal-close-button"
                    onClick={props.closeProjectDetailsModal}
                />

                <div className="project-details-container">
                    <h1>{props.name}</h1>
                    <p className={"project-details-status " + props.status}>{props.status}</p>
                    <p>IE: {props.educationInstitution}</p>
                    <p>Dono: {props.owner}</p>
                    <p>Descrição: {props.description}</p>
                    <p>Meta: {props.fundingGoal.toString()}</p>
                    <p>Adquiridos: {props.fundsRaised.toString()}</p>
                    <p>Data final: {deadline}</p>
                    <div className="project-last-transactions">
                        <h4>Últimas transações</h4>
                    </div>
                    <progress
                        id="project-details-progress"
                        max={props.fundingGoal.toString()}
                        value={props.fundsRaised.toString()}
                    ></progress>
                    <button className="project-details-modal-pinance-button">
                        Pinance <FaHandHoldingUsd />
                    </button>
                </div>
            </div>
        </div>
    );
}
