import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { ArrowSvg } from "./ArrowSvg";

export const ReadyContents = () => {
  const { openCalendly, openLinkedIn, setTermsOpen, setPrivacyOpen, viewModel } = useContext(AppContext);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const onClickArrow = increment => {
    setFading(true)

    setTimeout(() => {
      setTestimonialIndex(
        (prev) =>
          (prev + increment + viewModel.testimonials.length) %
          viewModel.testimonials.length
      )
      setFading(false)
    }, 300)
  }

  const { content, name, key } = viewModel.testimonials[testimonialIndex];

  const currentTestimonialClass = fading ? "current-testimonial fading" : "current-testimonial"

  return (
    <>
      <div className="ready-container">
        <div className="ready-content">
          <img className="ready-img" src={viewModel.ready.img} alt="I'm ready"/>
          <div className="ready-body-container">
            <div className="editorial-font body-title" style={{ marginBottom: 0 }}>
              Let's Start
              <br/>
              Your Transformation
            </div>
            <div className="body-font body-subtitle hide-on-mobile">
              Sign up
            </div>
          </div>
          <button className="editorial-font body-cta" onClick={openCalendly}>
            I am ready
          </button>
        </div>
        <div className="testimonial-content">
          <div
            className="title-text editorial-font"
            style={{ cursor: "default" }}
          >
            Testimonials & Links
          </div>
          <div className="testimonials-and-links">
            <div>
              <div className="testimonial-counter hide-on-mobile">
                <ArrowSvg onClick={() => onClickArrow(-1)} />
                {key}/{viewModel.testimonials.length}
                <ArrowSvg isRight onClick={() => onClickArrow(1)} />
              </div>
              <div className={currentTestimonialClass}>
                <div className="current-testimonial-content">{content}</div>
                <div className="current-testimonial-name">-{name}</div>
              </div>
              <div className="testimonial-counter hide-on-desktop">
                <ArrowSvg onClick={() => onClickArrow(1)} />
                {key}/{viewModel.testimonials.length}
                <ArrowSvg isRight onClick={() => onClickArrow(1)} />
              </div>
            </div>
            <div className="links-container">
              <div onClick={openLinkedIn} className="social-link editorial-font body-title">
                LinkedIn
              </div>
              <a href="mailto:hello@breakupartist.coach" className="social-link editorial-font body-title">
                Email
              </a>
              <div className="policy-link body-font body-subtitle" onClick={() => setTermsOpen(true)}>
                Terms & Conditions
              </div>
              <div className="policy-link body-font body-subtitle" onClick={() => setPrivacyOpen(true)}>
                Privacy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
