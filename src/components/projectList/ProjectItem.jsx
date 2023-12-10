import React from 'react';

import './ProjectItem.css';

const ProjectItem = (props) => {
    return (
        <div className='projects-list-item'>
            <h4>{props.name}</h4>
            <p className="description">{props.description}</p>
            <p>{props.educationInstitution}</p>
        </div>
    );
};

export default ProjectItem;
