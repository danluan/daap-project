// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FinanceProjects {

    struct Transaction {
        address sender;
        uint256 value;
    }

    struct Project {
        uint256 id;
        string name;
        address owner;
        uint goal;
        uint balance;
        Transaction[] transactions;
        uint256 transactions_count;
    }

    mapping(uint => Project) projects;

    uint[] projects_id;
    uint last_id;

    constructor() {
        last_id = 0;
        createProject("Bola gigante", 3, msg.sender);
        createProject("Super mega blaster hyperbeam", 2, msg.sender);
        createProject("Project 3", 40, msg.sender);
        createProject("Project 4", 1, msg.sender);
        createProject("Project 5", 3000, msg.sender);
        createProject("Project 6", 1000000, msg.sender);
    }
    
    function createProject( string memory name, uint goal, address owner ) public {
        last_id = last_id + 1;
        projects_id.push(last_id);   

        Project storage new_project = projects[last_id];

        new_project.id = last_id;
        new_project.name = name;
        new_project.owner = owner;
        new_project.goal = goal;
        new_project.balance = 0;
        new_project.transactions_count = 0;
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory projects_list = new Project[](projects_id.length);

        for (uint i = 0; i < projects_id.length; i++) {
            projects_list[i] = projects[projects_id[i]];
        }

        return projects_list;
    }

    function getProject(uint id) public view returns (Project memory) {
        return projects[id];
    }
    
    
}