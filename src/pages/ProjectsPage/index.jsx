import { useState } from "react";
// import { data } from "../../data/data";
import { Link } from "react-router-dom";

export default function ProjectsPage() {

  // const [projects, setProjects] = useState(data);

  return (
    <div>
      <h1>Projects Page</h1>
   

      {/* <section>
        {projects && projects.map((p => (
          <div key={p.id}>
            <Link to={`/projects/${p.id}`}>
            <h2>{p.name}</h2>
            </Link>
          </div>
        )))}
      </section> */}
    </div>
  );
}