
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Typewriter from "typewriter-effect";
import emailjs from "emailjs-com";
import "./Portfolio.css";

/**
 * HOW TO ENABLE EMAIL FORM:
 * 1) Create an EmailJS account → add a service + template.
 * 2) Replace EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY below.
 * 3) Ensure the form field names match your EmailJS template: from_name, from_email, subject, message.
 *
 * Needed deps:
 *   npm i framer-motion typewriter-effect emailjs-com
 * Also make sure Font Awesome is loaded in index.html for the icons (or swap to your own icons).
 */
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Portfolio = () => {
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef(null);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    setIsMounted(true);
    createStars();
    window.addEventListener("resize", createStars);
    return () => window.removeEventListener("resize", createStars);
  }, []);

  const createStars = () => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;
    const area = window.innerWidth * window.innerHeight;
    const baseCount = 0.00012; // density
    const starsCount = Math.min(300, Math.max(120, Math.floor(area * baseCount)));
    starsContainer.innerHTML = "";
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      const size = Math.random() * 2 + 0.8;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID.startsWith("YOUR_")) {
      alert("EmailJS is not configured yet. Please add your Service, Template, and Public keys in Portfolio.jsx.");
      return;
    }
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      e.target.reset();
      showToast("Thanks! Your message has been sent.");
    } catch (err) {
      console.error(err);
      showToast("Oops, something went wrong. Please try again.");
    }
  };

  const showToast = (text) => {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 2500);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className={`portfolio ${isMounted ? "visible" : ""}`}>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      {/* Animated Background */}
      <div className="stars" id="stars" />
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="nav-container">
          <div className="logo">My<span>Portfolio</span></div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div
          className="hero-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.div className="profile-container" variants={fadeUp}>
            <div className="profile-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Profile"
                className="profile-image"
              />
              <div className="image-glow" />
            </div>
          </motion.div>

          <motion.h1 className="hero-title" variants={fadeUp}>
            <span className="title-gradient">Your Name</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={fadeUp}>
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "AI & Deep Learning Enthusiast",
                  "UI/UX Designer",
                  "Open Source Contributor",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </motion.p>

          <motion.p className="hero-description" variants={fadeUp}>
            I design & build delightful, performant web experiences. From elegant UI to scalable backend,
            I love shipping products that make people go “whoa”.
          </motion.p>

          <motion.div className="hero-buttons" variants={fadeUp}>
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket" />
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-paper-plane" />
              Get In Touch
            </a>
            <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noreferrer">
              <i className="fas fa-file" />
              Resume
            </a>
          </motion.div>

          <div className="quick-links">
            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noreferrer" className="ql">
              <i className="fab fa-linkedin-in" /> LinkedIn
            </a>
            <a href="mailto:youremail@example.com" className="ql">
              <i className="fas fa-envelope" /> youremail@example.com
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2>Skills & Expertise</h2>
            <p>Technologies and tools I specialize in</p>
          </div>

          <motion.div
            className="skills-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                title: "Frontend",
                icon: "fas fa-code",
                skills: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5", "CSS3", "Framer Motion"],
              },
              {
                title: "Backend",
                icon: "fas fa-server",
                skills: ["Node.js", "Express", "Python", "FastAPI", "MongoDB", "PostgreSQL", "REST", "GraphQL"],
              },
              {
                title: "Design & Tools",
                icon: "fas fa-palette",
                skills: ["Figma", "Git", "Docker", "CI/CD", "AWS", "Vercel", "Jest", "Vitest"],
              },
            ].map((cat, idx) => (
              <motion.div key={idx} className="skill-category tilt" variants={fadeUp}>
                <div className="skill-icon">
                  <i className={cat.icon} />
                </div>
                <h3>{cat.title}</h3>
                <div className="skills-list">
                  {cat.skills.map((s) => (
                    <span key={s} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2>Project Highlights</h2>
            <p>Some of my recent work that I'm proud of</p>
          </div>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                title: "ddShop — E‑Commerce Platform",
                desc:
                  "Full‑stack e‑commerce with payment integration, auth, and analytics dashboard.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                icon: "fas fa-shopping-cart",
                live: "#",
                code: "#",
              },
              {
                title: "WBC Classifier",
                desc:
                  "Deep learning pipeline (CNN/Transformers) for white blood cell classification with Grad‑CAM insights.",
                tech: ["PyTorch", "Transformers", "FastAPI", "Docker"],
                icon: "fas fa-notes-medical",
                live: "#",
                code: "#",
              },
              {
                title: "VizBoard",
                desc:
                  "Real‑time analytics dashboard with streaming charts and collaborative filters.",
                tech: ["D3.js", "WebSockets", "Vue", "Flask"],
                icon: "fas fa-chart-line",
                live: "#",
                code: "#",
              },
            ].map((p, i) => (
              <motion.div key={i} className="project-card" variants={fadeUp}>
                <div className="project-image">
                  <div className="project-overlay">
                    <i className={p.icon} />
                  </div>
                </div>
                <div className="project-content">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.live} className="project-link" target="_blank" rel="noreferrer">
                      <i className="fas fa-external-link-alt" />
                      Live
                    </a>
                    <a href={p.code} className="project-link" target="_blank" rel="noreferrer">
                      <i className="fab fa-github" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2>Experience</h2>
            <p>My professional journey so far</p>
          </div>

          <div className="timeline">
            {[
              {
                range: "2024 — Present",
                role: "Senior Frontend Developer",
                org: "Tech Innovations Inc.",
                desc:
                  "Leading UI architecture, performance optimization, and design systems for multi‑brand apps.",
              },
              {
                range: "2022 — 2024",
                role: "Full Stack Developer",
                org: "Digital Solutions Ltd.",
                desc:
                  "Built MERN applications, GraphQL APIs, and automated CI pipelines for rapid shipping.",
              },
              {
                range: "2020 — 2022",
                role: "UI/UX Designer",
                org: "Creative Agency Co.",
                desc: "Designed mobile/web interfaces, ran usability tests, and delivered pixel‑perfect UIs.",
              },
            ].map((exp, idx) => (
              <motion.div
                className="timeline-item"
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="timeline-content">
                  <div className="timeline-date">{exp.range}</div>
                  <h3>{exp.role}</h3>
                  <h4>{exp.org}</h4>
                  <p>{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Positions of Responsibility */}
      <section id="leadership" className="leadership-section">
        <div className="container">
          <div className="section-header">
            <h2>Leadership</h2>
            <p>Positions of responsibility & community work</p>
          </div>

          <motion.div
            className="leadership-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                head: "Club Head — Coding Society",
                where: "SVNIT",
                lines: "Organized 10+ hackathons, mentored juniors, and launched an open‑source initiative.",
              },
              {
                head: "Lead — Design Guild",
                where: "University Chapter",
                lines: "Built a component library and ran weekly design critiques for 50+ members.",
              },
            ].map((l, idx) => (
              <motion.div key={idx} className="leadership-card" variants={fadeUp}>
                <div className="leadership-badge"><i className="fas fa-crown" /></div>
                <h3>{l.head}</h3>
                <p className="leadership-where">{l.where}</p>
                <p>{l.lines}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Feel free to reach out for collaborations or just a friendly hello</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>youremail@example.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-linkedin" />
                </div>
                <div className="contact-details">
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/yourhandle</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-file-pdf" />
                </div>
                <div className="contact-details">
                  <h3>Resume</h3>
                  <p>
                    <a href="/resume.pdf" className="project-link" target="_blank" rel="noreferrer">
                      Download my CV
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="contact-details">
                  <h3>Location</h3>
                  <p>Surat, India</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group">
                  <input name="from_name" type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input name="from_email" type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input name="subject" type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Your Message" rows="5" required />
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="container">
          <div className="social-links">
            <a href="https://linkedin.com/in/yourhandle" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://github.com/yourhandle" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://x.com/yourhandle" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://dribbble.com/yourhandle" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-dribbble" />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Your Name. Built with React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
