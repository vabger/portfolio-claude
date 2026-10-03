import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Tools from "@/components/Tools";
import Topbar from "@/components/Topbar";
import { profile } from "@/data/site";

export default function Home() {
  return (
    <>
      <Background />
      <Topbar />
      <Nav />
      <main id="top">
        <Hero />
        <Projects />
        <Tools />
        <Contact />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
      <Reveal />
    </>
  );
}
