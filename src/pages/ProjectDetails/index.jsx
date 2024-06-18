import { useParams } from "react-router-dom";
// import { data } from "../../data/data";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectDetails() {

    // const params = useParams();
    // console.log(params);

    // const project = data.find(p=>p.id == params.id);

    // useEffect(()=>{
    //     const fetchProject =(id)=>{
    //         //fetch
    //         console.log(`fetching ${id}`);

    //     }
    //     fetchProject(params.id);
    // },[params.id]);

    return (
      <div>
        <h1>Project Details Page</h1>

        <Link to={'/projects'}>back</Link>
        <h1>project Details</h1>

        {/* <h2>{project.name}</h2>
        <h3>Status: {project.status}</h3>
        <p>{project.description}</p>
        <div>start_date: {project.start_date}</div>
        <div>end_date: {project.end_date}</div>
        <div>Team ID: #{project.team_id}</div> */}
      </div>
    );
  }