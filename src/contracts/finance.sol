// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Pinance {
    struct Project {
        string name;
        address payable owner;
        string educationInstitution;
        uint deadline;
        string description;
        uint fundingGoal;
        uint fundsRaised;
        Status status;
        Transaction[] transactions;
    }

    enum Status {
        Active,
        Closed,
        Canceled
    }

    struct Transaction {
        address donor;
        uint value;
    }

    uint[] projects_id;
    uint last_id;

    mapping(uint => Project) public projects;
    uint public projectCount;

    event ProjectCreated(
        uint projectId,
        string name,
        address owner,
        string educationInstitution,
        uint deadline,
        string description,
        uint fundingGoal
    );

    event DonationReceived(
        uint projectId,
        address donor,
        uint amount
    );

    event ProjectFinalized(
        uint projectId,
        Status status
    );

    constructor() {
        projectCount = 0;
    }

    function createProject(string memory _name, string memory _educationInstitution, uint _deadline, string memory _description, uint _fundingGoal) public {
        require(_deadline > block.timestamp, "Deadline must be in the future.");
        require(bytes(_description).length <= 100, "Description must be under 100 characters.");
        
        projectCount++;
        Project storage newProject = projects[projectCount];
        newProject.name = _name;
        newProject.owner = payable(msg.sender);
        newProject.educationInstitution = _educationInstitution;
        newProject.deadline = _deadline;
        newProject.description = _description;
        newProject.fundingGoal = _fundingGoal;
        newProject.status = Status.Active;

        emit ProjectCreated(projectCount, _name, msg.sender, _educationInstitution, _deadline, _description, _fundingGoal);
    }

    function donate(uint _projectId) public payable {
        Project storage project = projects[_projectId];
        require(project.status == Status.Active, "Project must be active");
        require(msg.value > 0, "Donation must be greater than 0.");

        project.fundsRaised += msg.value;
        project.transactions.push(Transaction(msg.sender, msg.value));

        emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    function finalizeProject(uint _projectId) public payable {
    Project storage project = projects[_projectId];
    // require(block.timestamp >= project.deadline, "Project deadline has not passed yet.");
    require(msg.sender == project.owner, "Only project owner can finalize.");

    if (project.fundsRaised >= project.fundingGoal) {
        project.status = Status.Closed;
        project.owner.transfer(project.fundsRaised);
    } else {
        project.status = Status.Canceled;
        for (uint i = 0; i < project.transactions.length; i++) {
            Transaction storage refund = project.transactions[i];
            address payable donorAddress = payable(refund.donor);
                if(refund.value > 0){
                    donorAddress.transfer(refund.value);
                    delete project.transactions[i];
                }
        }
        }

        emit ProjectFinalized(_projectId, project.status);

    }

    function getProjects() public view returns(Project[] memory){
        Project[] memory projectsReturn = new Project[](projectCount);

        for(uint i = 0; i < projectCount; i++){
            projectsReturn[i] = projects[i+1];
        }

        return projectsReturn;
    }

    function getTime() public view returns(uint){
        return block.timestamp;
    }
}
