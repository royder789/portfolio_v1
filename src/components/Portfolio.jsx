import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Typewriter from "typewriter-effect";
import emailjs from "emailjs-com";
import "./Portfolio.css";
import profileImg from "../assets/sneha.jpeg"; // adjust path if needed




const EMAILJS_SERVICE_ID = "service_8h970oz";
const EMAILJS_TEMPLATE_ID = "template_pc6orlc";
const EMAILJS_PUBLIC_KEY = "-IP5u0Pq6_dmhieXL";

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

  // Function to handle resume download
  // Replace the handleResumeDownload function with this:
  const handleResumeDownload = () => {
    // Create a direct download link to the resume
    const link = document.createElement('a');
    link.href = '/Sneha_2237024_cse_cec.pdf'; // Make sure this file is in your public folder
    link.download = 'Sneha_Kumari_Resume.pdf';
    document.body.appendChild(link);

    // Check if file exists
    fetch(link.href)
      .then(response => {
        if (response.ok) {
          link.click();
        } else {
          alert('Resume file not found. Please contact me directly at sneharoy2304@gmail.com');
        }
      })
      .catch(() => {
        alert('Resume file not found. Please contact me directly at sneharoy2304@gmail.com');
      })
      .finally(() => {
        document.body.removeChild(link);
      });
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
          <div className="logo">Sneha<span>Kumari</span></div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
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
                src={profileImg}
                alt="Sneha Kumari"
                className="profile-image"
              />
              <div className="image-glow" />
            </div>
          </motion.div>

          <motion.h1 className="hero-title" variants={fadeUp}>
            <span className="title-gradient">Sneha Kumari</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={fadeUp}>
            <Typewriter
              options={{
                strings: [
                  "Data Analyst",
                  "Computer Science Engineer",
                  "Data Visualization Specialist",
                  "Problem Solver",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </motion.p>

          <motion.p className="hero-description" variants={fadeUp}>
            I transform raw data into meaningful insights through analytics, visualization, and predictive modeling.
            Passionate about solving complex problems and creating data-driven solutions that make a difference.
          </motion.p>

          <motion.div className="hero-buttons" variants={fadeUp}>
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket" />
              View My Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-paper-plane" />
              Get In Touch
            </a>
            <button onClick={handleResumeDownload} className="btn btn-secondary">
              <i className="fas fa-file" />
              Download Resume
            </button>
          </motion.div>

          <div className="quick-links">
            <a href="https://www.linkedin.com/in/sneha23kumari/" target="_blank" rel="noreferrer" className="ql">
              <i className="fab fa-linkedin-in" /> LinkedIn
            </a>
            <a href="mailto:sneharoy2304@gmail.com" className="ql">
              <i className="fas fa-envelope" /> sneharoy2304@gmail.com
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
                title: "Programming Languages",
                icon: "fas fa-code",
                skills: ["C++", "Python", "JavaScript", "SQL"],
              },
              {
                title: "Data Analytics & Visualization",
                icon: "fas fa-chart-bar",
                skills: ["Tableau", "Power BI", "Excel", "Data Modeling", "Predictive Analytics"],
              },
              {
                title: "Data Science & ML",
                icon: "fas fa-brain",
                skills: ["NumPy", "Pandas", "Machine Learning", "Data Cleaning", "Data Standardization"],
              },
              {
                title: "Database & Concepts",
                icon: "fas fa-database",
                skills: ["MySQL", "DBMS", "OOPS", "Data Structures & Algorithms"],
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

          {/* Coding Platforms */}
          <motion.div
            className="coding-platforms"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3>Coding Platforms</h3>
            <div className="platforms-container">
              <div className="platform">
                <span className="platform-name">LeetCode</span>
                <span className="platform-stats">200+ problems solved | Highest Rating: 1741</span>
              </div>
              <div className="platform">
                <span className="platform-name">GeeksforGeeks</span>
                <span className="platform-stats">60+ problems solved</span>
              </div>
            </div>
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
                title: "Mental Health Insights in Tech Industry",
                desc:
                  "Architected a comprehensive SQL database to structure, clean, and integrate mental health survey data from the tech industry, ensuring data integrity and analytical readiness.",
                tech: ["MySQL", "Python", "Data Cleaning", "Data Standardization"],
                icon: "fas fa-brain",
                live: "#",
                code: "#",
              },
              {
                title: "Health-Care Dashboard",
                desc:
                  "Built a responsive Power BI dashboard to analyze hospital wait-list data by case type, age group, and specialty over time with dynamic filters and trend analysis.",
                tech: ["Power BI", "Data Visualization", "Excel", "Data Modeling"],
                icon: "fas fa-heartbeat",
                live: "#",
                code: "#",
              },
              {
                title: "Interactive Dashboard on Data Science Jobs and Salaries",
                desc:
                  "Designed an interactive Tableau dashboard to visualize and explore trends in Data Science job roles, salaries, and company sizes using real-world data from Kaggle.",
                tech: ["Tableau", "Excel", "Data Preprocessing", "Predictive Analytics"],
                icon: "fas fa-chart-line",
                live: "#",
                code: "#",
              },
              {
                title: "Music Recommendation System",
                desc:
                  "Designed a Music Recommendation System using Streamlit with a content-based approach powered by KNN, preprocessing a dataset of 170k+ songs.",
                tech: ["Python", "Machine Learning", "Streamlit", "KNN"],
                icon: "fas fa-music",
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
                      Live Demo
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

      {/* Education Section */}
      <section id="education" className="education-section">
        <div className="container">
          <div className="section-header">
            <h2>Education</h2>
            <p>My academic journey</p>
          </div>

          <motion.div
            className="education-timeline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div className="education-item" variants={fadeUp}>
              <div className="education-icon">
                <i className="fas fa-graduation-cap" />
              </div>
              <div className="education-content">
                <h3>B.Tech - Computer Science and Engineering</h3>
                <h4>Chandigarh Engineering College, Chandigarh Group of Colleges, Landran</h4>
                <p className="education-duration">CGPA: 8.2</p>
                <div className="coursework">
                  <h5>Relevant Coursework:</h5>
                  <div className="coursework-list">
                    <span>Data Analytics & Predictive Modeling</span>
                    <span>Data Structures & Algorithms</span>
                    <span>Data Visualization</span>
                    <span>Database Management System (DBMS)</span>
                    <span>Machine Learning</span>
                    <span>Software Management</span>
                    <span>Object Oriented Design & Programming</span>
                    <span>Theory of Computation</span>
                    <span>Operating System</span>
                    <span>Computer Networks</span>
                    <span>Human Resource Management</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="certifications-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3>Certifications</h3>
            <div className="certifications-list">
              <div className="certification">
                <i className="fas fa-certificate" />
                <span>Supervised Machine Learning: Regression and Classification</span>
              </div>
              <div className="certification">
                <i className="fas fa-certificate" />
                <span>Data Structures and Algorithms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
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
                head: "Technical Head — Phoenix Club",
                where: "Department Technical Club",
                lines: "Led technical initiatives, organized workshops, and mentored juniors in programming and data science concepts.",
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
                  <p>sneharoy2304@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-linkedin" />
                </div>
                <div className="contact-details">
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/sneha23kumari</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-file-pdf" />
                </div>
                <div className="contact-details">
                  <h3>Resume</h3>
                  <p>
                    <button onClick={handleResumeDownload} className="project-link">
                      Download my CV
                    </button>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="contact-details">
                  <h3>Location</h3>
                  <p>Chandigarh,Punjab,India</p>
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
            <a href="https://www.linkedin.com/in/sneha23kumari/" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="mailto:sneharoy2304@gmail.com" className="social-link">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Sneha Kumari. Built with React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;