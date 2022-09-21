import React from "react"
const Repo =({repo})=>{
    const {full_name,description,language}=repo;
   console.log(repo);
    return(
        <div className="repo">
            <h2>{full_name.split('/')[1]}</h2>
            <p>{description}</p>
            {
                language && 
                <div className="skills-topic">
                    <span>{language}</span>
                    <span>{language}</span>
                    <span>{language}</span>
                </div>
            }
        </div>
    );

}
export default Repo;