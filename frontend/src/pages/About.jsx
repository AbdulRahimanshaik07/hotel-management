
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "./MainLayout";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    // Simple scroll animation for cards
    const cards = document.querySelectorAll(".why-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-card");
          }
        });
      },
      { threshold: 0.3 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <MainLayout>
      {/* Inline CSS */}
      <style>{`
        .why-card {
          background: #fff;
          border-radius: 1rem;
          padding: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px);
        }

        .why-card h5 {
          color: #d32f2f;
        }

        .why-card.animate-card {
          opacity: 1;
          transform: translateY(0);
        }

        .why-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 767px) {
          .why-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      {/* <section
        style={{
          background: "linear-gradient(135deg, #ffe5e5, #fff0f0)",
          color: "#333",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <h1 className="display-5 fw-bold mb-3" style={{ color: "#d32f2f" }}>
            Welcome to Shri Ram Hostel
          </h1>
          <p className="lead mb-4">
            A perfect blend of comfort, security, and learning environment for students of
            <strong> Shri Ram Group of Colleges, Muzaffarnagar.</strong>
          </p>
          <Button
            as={Link}
            to="/login/student"
            variant="danger"
            size="lg"
            className="fw-bold rounded-pill px-4 py-2 shadow-sm"
          >
            Join Our Hostel
          </Button>
        </Container>
      </section> */}


      {/* Hero Section */}
<section
  style={{
    background: "linear-gradient(135deg, #ffd6d6, #ffe5e5, #fff0f0)", // smooth red-pink gradient
    color: "#333",
    padding: "100px 0",
    textAlign: "center",
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite",
  }}
>
  <style>{`
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
  <Container>
    <h1 className="display-5 fw-bold mb-3" style={{ color: "#d32f2f" }}>
      Welcome to Shri Ram Hostel
    </h1>
    <p className="lead mb-4">
      A perfect blend of comfort, security, and learning environment for students of
      <strong> Shri Ram Group of Colleges, Muzaffarnagar.</strong>
    </p>
    <Button
      as={Link}
      to="/login/student"
      variant="danger"
      size="lg"
      className="fw-bold rounded-pill px-4 py-2 shadow-sm"
    >
      Join Our Hostel
    </Button>
  </Container>
</section>


      {/* About Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="/public/images/bg5.jpg"
                alt="Shri Ram Hostel Building"
                className="img-fluid rounded-4 shadow-lg"
              />
            </Col>

            <Col md={6}>
              <h2 className="fw-bold mb-3" style={{ color: "#d32f2f" }}>
                About Shri Ram Hostel
              </h2>
              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                At <strong>Shri Ram Hostel</strong>, we provide more than just accommodation —
                we create a second home for students pursuing excellence at Shri Ram Group of Colleges.
                Designed for comfort and productivity, our hostel ensures a safe, vibrant, and
                inclusive atmosphere that nurtures both academic and personal growth.
              </p>

              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                Our mission is to provide a <strong>secure, hygienic, and modern living space</strong>
                where students can focus on their studies, make lifelong friendships, and enjoy a
                balanced lifestyle. We take pride in offering top-notch facilities and a
                student-centric management approach.
              </p>

              <Button
                as={Link}
                to="/contact"
                variant="danger"
                className="rounded-pill mt-3 fw-bold"
              >
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5" style={{ background: "#fff5f5" }}>
        <Container>
          <h2 className="fw-bold text-center mb-4" style={{ color: "#d32f2f" }}>
            Why Choose Shri Ram Hostel?
          </h2>
          <Row className="g-4">
            {[
              {
                title: "🏠 Comfortable & Spacious Rooms",
                desc: "Fully furnished rooms with beds, study tables, and ample ventilation — ensuring a cozy environment for every student.",
              },
              {
                title: "🔒 24×7 Security & CCTV Surveillance",
                desc: "Your safety is our top priority. Security staff and surveillance ensure peace of mind for students and parents alike.",
              },
              {
                title: "🍽️ Healthy & Hygienic Food",
                desc: "Enjoy nutritious and delicious meals prepared under strict hygiene standards, catering to both taste and health.",
              },
              {
                title: "🌐 High-Speed Wi-Fi",
                desc: "Stay connected for studies, entertainment, and family calls with hostel-wide high-speed internet access.",
              },
              {
                title: "🎓 Academic Support & Discipline",
                desc: "A peaceful environment that promotes study, discipline, and personal growth — helping you stay focused on your goals.",
              },
              {
                title: "🌳 Serene Campus Location",
                desc: "Located near the college, surrounded by greenery and open spaces — providing a calm, inspiring place to live and learn.",
              },
            ].map((item, idx) => (
              <Col md={4} key={idx}>
                <div className="why-card">
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                    {item.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(90deg, #ffe5e5, #fff0f0)",
          color: "#333",
        }}
      >
        <Container>
          <h2 className="fw-bold mb-3" style={{ color: "#d32f2f" }}>
            Ready to Experience Hostel Life?
          </h2>
          <p className="lead mb-4">
            Apply today and become part of a vibrant student community that supports growth, friendship, and success.
          </p>
          <Button
            as={Link}
            to="/student/register"
            variant="danger"
            size="lg"
            className="rounded-pill fw-bold px-4 py-2 shadow-sm"
          >
            Apply for Hostel Admission
          </Button>
        </Container>
      </section>
    </MainLayout>
  );
};

export default About;
