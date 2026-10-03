import { projects } from "@/data/site";
import Poster from "./Posters";
import ProjectVideo from "./ProjectVideo";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <h2 className="section__title reveal">Projects</h2>

      <div className="projects reveal">
        {projects.map((p) => {
          const body = (
            <>
              <div className="project__media">{p.video ? <ProjectVideo src={p.video} poster={p.image} /> : <Poster kind={p.poster} />}</div>
              <div className="project__info">
                <h3>{p.title}</h3>
                <p>{p.type}</p>
                <hr />
                <span>{p.year}</span>
              </div>
            </>
          );

          return p.href ? (
            <a key={p.title} className="project" href={p.href} target="_blank" rel="noopener noreferrer">
              {body}
            </a>
          ) : (
            <article key={p.title} className="project" tabIndex={0}>
              {body}
            </article>
          );
        })}
      </div>
    </section>
  );
}
