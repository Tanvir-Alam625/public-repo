import React from "react"
const Repo =({repo})=>{
    return(
        <div className="repo">
            <h2>{repo.full_name}</h2>
            <p>{repo.description}</p>
            <div className="skills-topic">
                <span>JavaScript</span>
                <span>NodeJS</span>
                <span>ReactJS</span>
            </div>
        </div>
    );

}
export default Repo;