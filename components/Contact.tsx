import { socials } from "@/data/site";
import { SocialIcon } from "./Icons";

export default function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <h2 className="section__title reveal">Contact Me</h2>
      <p className="section__lead reveal">Have a project in mind? Let&apos;s talk.</p>

      <div className="socials reveal">
        {socials.map((s) => (
          <a key={s.id} className={`social social--${s.id}`} href={s.href} target="_blank" rel="noopener noreferrer">
            <span className="social__icon">
              <SocialIcon id={s.id} />
            </span>
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
