
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "./MainLayout";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
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
      <style>{`
        :root {
          --red: #d32f2f;
          --black: #111;
          --white: #fff;
          --light-red: #ffeaea;
        }

        /* 🌟 HERO SECTION */
        .hero-section {
          position: relative;
          background: radial-gradient(circle at top left, #fff 0%, #fbeaea 40%, #fff 90%);
          overflow: hidden;
          padding: 130px 0;
          text-align: center;
        }

        .hero-bg-shape {
          position: absolute;
          top: -150px;
          right: -150px;
          width: 400px;
          height: 400px;
          background: rgba(211,47,47,0.1);
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
        }

        .hero-title {
          color: var(--red);
          font-weight: 800;
          letter-spacing: 1px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          position: relative;
          z-index: 1;
        }

        .hero-sub {
          color: var(--black);
          max-width: 700px;
          margin: 20px auto 40px;
          position: relative;
          z-index: 1;
        }

        .hero-btn {
          background: var(--red);
          color: var(--white);
          border: none;
          border-radius: 50px;
          padding: 12px 35px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(211,47,47,0.3);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .hero-btn:hover {
          background: #b71c1c;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(211,47,47,0.4);
        }

        /* 🏠 ABOUT SECTION */
        .about-section {
          background-color: var(--white);
          padding: 80px 0;
        }

        .about-img {
          border-radius: 1rem;
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        .about-title {
          color: var(--red);
          font-weight: 700;
        }

        .about-text {
          color: #333;
          line-height: 1.8;
        }

        /* 💪 WHY CHOOSE US SECTION */
        .why-section {
          background: var(--black);
          color: var(--white);
          padding: 90px 0;
        }

        .why-section h2 {
          color: var(--red);
          font-weight: 800;
          text-align: center;
          margin-bottom: 50px;
        }

        .why-card {
          background: #1c1c1c;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .why-card.animate-card {
          opacity: 1;
          transform: translateY(0);
        }

        .why-card:hover {
          background: #222;
          box-shadow: 0 10px 25px rgba(211,47,47,0.3);
          transform: translateY(-5px);
        }

        .why-card h5 {
          color: var(--red);
          margin-bottom: 10px;
        }

        .why-card p {
          color: #ddd;
        }

        /* 🚀 CTA SECTION - SAME STYLE AS WHY CHOOSE */
        // .cta-section {
        //   background: var(--black);
        //   color: var(--white);
        //   padding: 100px 0;
        //   position: relative;
        //   text-align: center;
        // }

        // .cta-section::before {
        //   content: "";
        //   position: absolute;
        //   top: -150px;
        //   left: -150px;
        //   width: 400px;
        //   height: 400px;
        //   background: rgba(211,47,47,0.15);
        //   border-radius: 50%;
        //   filter: blur(80px);
        //   z-index: 0;
        // }

        // .cta-section h2 {
        //   color: var(--red);
        //   font-weight: 800;
        //   margin-bottom: 20px;
        //   position: relative;
        //   z-index: 1;
        // }

        // .cta-section p {
        //   color: #ddd;
        //   max-width: 700px;
        //   margin: 0 auto 30px;
        //   position: relative;
        //   z-index: 1;
        // }

        // .cta-btn {
        //   background: var(--red);
        //   color: var(--white);
        //   border: none;
        //   border-radius: 50px;
        //   padding: 12px 35px;
        //   font-weight: 600;
        //   box-shadow: 0 8px 25px rgba(211,47,47,0.3);
        //   transition: all 0.3s ease;
        //   position: relative;
        //   z-index: 1;
        // }

        // .cta-btn:hover {
        //   background: #b71c1c;
        //   transform: translateY(-3px);
        //   box-shadow: 0 12px 30px rgba(211,47,47,0.4);
        // }

        // @media (max-width: 768px) {
        //   .hero-section, .about-section, .why-section, .cta-section {
        //     padding: 60px 20px;
        //   }
        // }

        .cta-section {
          background: linear-gradient(135deg, #fff, #ffe5e5, #fff);
          text-align: center;
          padding: 100px 0;
          position: relative;
        }
        .cta-section h2 {
          color: var(--red);
          font-weight: 800;
          margin-bottom: 20px;
        }
        .cta-section p {
          color: var(--black);
          max-width: 700px;
          margin: 0 auto 30px;
          line-height: 1.7;
        }
        .cta-btn {
          background: var(--red);
          color: var(--white);
          border: none;
          border-radius: 50px;
          padding: 12px 35px;
          font-weight: 600;
          box-shadow: 0 8px 20px rgba(211,47,47,0.3);
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          background: #b71c1c;
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(211,47,47,0.4);
        }

        @media (max-width: 768px) {
          .hero-section { padding: 80px 20px; }
          .about-section, .why-section, .cta-section { padding: 60px 20px; }
        }
      `}</style>

      {/* 🌟 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-shape"></div>
        <Container>
          <h1 className="display-5 hero-title">Welcome to Shri Ram Hostel</h1>
          <p className="lead hero-sub">
            Experience the perfect balance of comfort, discipline, and care at{" "}
            <strong>Shri Ram Hostel</strong> — where every student finds a second home.
          </p>
          <Button as={Link} to="/login/student" className="hero-btn">
            Join Our Hostel
          </Button>
        </Container>
      </section>

      {/* 🏠 ABOUT SECTION */}
      <section className="about-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="/images/bg5.jpg"
                alt="Shri Ram Hostel Building"
                className="img-fluid about-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="about-title mb-3">About Shri Ram Hostel</h2>
              <p className="about-text">
                <strong>Shri Ram Hostel</strong> provides more than accommodation — it creates
                a positive, secure, and academic environment that encourages success and growth.
              </p>
              <p className="about-text">
                We are committed to offering <strong>modern facilities</strong> with
                hygiene, safety, and discipline at the core of hostel life.
              </p>
              <Button
                as={Link}
                to="/contact"
                variant="dark"
                className="rounded-pill mt-3 fw-bold"
              >
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 💪 WHY CHOOSE SECTION */}
      <section className="why-section">
        <Container>
          <h2>Why Choose Shri Ram Hostel?</h2>
          <Row className="g-4">
            {[
              { title: "🏠 Comfortable Rooms", desc: "Spacious, ventilated, and fully furnished rooms for a homely stay." },
              { title: "🔒 24×7 Security", desc: "Trained staff and CCTV cameras ensure your safety." },
              { title: "🍽️ Healthy Food", desc: "Nutritious and hygienic meals prepared with care." },
              { title: "🌐 High-Speed Wi-Fi", desc: "Reliable hostel-wide connectivity for study and leisure." },
              { title: "🎓 Study Environment", desc: "Peaceful space that supports academic growth and discipline." },
              { title: "🌳 Calm Location", desc: "Located near college, surrounded by greenery and open air." },
            ].map((item, idx) => (
              <Col md={4} key={idx}>
                <div className="why-card">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


        <section className="cta-section">
        <Container>
          <h2>Ready to Experience Hostel Life?</h2>
          <p>
            Join the Shri Ram Hostel family and experience student life with comfort, security,
            and growth. Your ideal home-away-from-home is just one click away.
          </p>
          <Button as={Link} to="/contact" className="cta-btn">
            Apply for Hostel Admission
          </Button>
        </Container>
      </section>


    </MainLayout>
  );
};

export default Home;


