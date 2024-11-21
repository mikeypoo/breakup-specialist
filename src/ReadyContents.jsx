import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { ArrowSvg } from "./ArrowSvg";

export const ReadyContents = () => {
  const { openCalendly, viewModel } = useContext(AppContext);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { content, name, key } = viewModel.testimonials[testimonialIndex];

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
          <ArrowSvg
            onClick={() =>
              setTestimonialIndex(
                (prev) =>
                  (prev - 1 + viewModel.testimonials.length) %
                  viewModel.testimonials.length
              )
            }
          />
          {key}/{viewModel.testimonials.length}
          <ArrowSvg
            isRight
            onClick={() =>
              setTestimonialIndex(
                (prev) => (prev + 1) % viewModel.testimonials.length
              )
            }
          />
        </div>
        <div className="current-testimonial">
          <div className="current-testimonial-content">{content}</div>
          <div className="current-testimonial-name">-{name}</div>
        </div>
      </div>
    </div>
  );
};
