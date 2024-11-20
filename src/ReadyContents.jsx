import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const fadeyTime = 500;
const showyTime = 7500;

export const ReadyContents = () => {
  const { openCalendly, viewModel } = useContext(AppContext);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const { content, name, key } = viewModel.testimonials[testimonialIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setTestimonialIndex(
          (prevIndex) => (prevIndex + 1) % viewModel.testimonials.length
        );
      }, fadeyTime);
      setTimeout(() => setFadeOut(false), fadeyTime);
    }, showyTime);

    return () => clearInterval(intervalId);
  }, [viewModel.testimonials.length]);

  return (
    <div className="ready-container">
      <div className="ready-content">
        <img
          src={viewModel.ready.imgSrc}
          className="ready-img"
          alt="I am ready"
        />
        <div className="ready-body-container">
          <div className="editorial-font body-title">
            {viewModel.ready.bodyTitle}
          </div>
          <div className="body-font body-subtitle">
            {viewModel.ready.bodySubtitle}
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
          Testimonials
        </div>
        <div className="testimonial-counter">
          {key}/{viewModel.testimonials.length}
        </div>
        <div
          className="current-testimonial"
          style={{ opacity: fadeOut ? 0 : 1 }}
        >
          <div className="current-testimonial-content">{content}</div>
          <div className="current-testimonial-name">-{name}</div>
        </div>
      </div>
    </div>
  );
};
