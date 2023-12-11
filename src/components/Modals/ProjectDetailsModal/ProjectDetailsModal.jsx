import React, { useEffect, useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";
import { FaHandHoldingUsd } from "react-icons/fa";

import "./ProjectDetailsModal.css";

export default function ProjectDetailsModal(props) {

    const [deadline, setDeadline] = useState("");
    const [fundsRaised, setFundsRaised] = useState(0);

    function weiToEtherString(wei) {
        const WEI_PER_ETHER = (10 ** 18);
        return (wei / WEI_PER_ETHER).toString();
    }

    useEffect(() => {
        const deadlineMilliseconds = Number(props.deadline) / 1000000;
        const deadlineDate = new Date(deadlineMilliseconds);

        const day = deadlineDate.getDate();
        const month = deadlineDate.getMonth() + 1;
        const year = deadlineDate.getFullYear();

        setDeadline(`${day}/${month}/${year}`);

        setFundsRaised(props.fundsRaised.toString());
    }, [props.deadline, props.fundsRaised]);

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
                    <p>Meta: {weiToEtherString(props.fundingGoal.toString())} Ether</p>
                    <p>Adquiridos: {weiToEtherString(fundsRaised)} Ether</p>
                    <p>Data limite: {deadline}</p>

                    <div>

                    </div>
                    <progress
                        id="project-details-progress"
                        max={props.fundingGoal.toString()}
                        value={fundsRaised}
                    ></progress>
                    <div className="project-details-pinance">
                        <input className="project-details-pinance-value" type="number" placeholder="Valor em Wei" />

                        <button className="project-details-modal-pinance-button" onClick={
                            () => {
                                console.log(props.index + 1)
                                return props.sendFundsDApp(
                                    props.index + 1,
                                    Number(document.querySelector(".project-details-pinance-value").value)
                                )
                            }}>
                            Pinance <FaHandHoldingUsd />
                        </button>
                    </div>

                    <button className="project-details-finalize"
                        onClick={
                            () => {
                                console.log(props.index + 1)
                                return props.finalizeProjectDApp(
                                    props.index + 1
                                )
                            }}>
                        Finalizar projeto
                    </button>
                </div>
            </div>
        </div>
    );
}
