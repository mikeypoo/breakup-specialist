import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { ArrowSvg } from "./ArrowSvg";
import { useSwipe } from './useSwipe';

export const ReadyContents = () => {
  const { openCalendly, openLinkedIn, setTermsOpen, setPrivacyOpen, viewModel, isMobileView } = useContext(AppContext);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialMinHeight, setTestimonialMinHeight] = useState('');
  const [fading, setFading] = useState(false);
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe();

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

  const handleSwipe = (direction) => {
    if (!isMobileView) return null;

    if (direction === 'right') {
      onClickArrow(-1)
    } else if (direction === 'left') {
      onClickArrow(1)
    }
  };

  useEffect(() => {
    const bigBoy = document.getElementById('biggest-testimonial')
    const pixelHeight = bigBoy.clientHeight
    setTestimonialMinHeight(`${pixelHeight}px`)
  }, [])

  const biggestTestimonial = viewModel.testimonials[0];

  const { content, name, key } = viewModel.testimonials[testimonialIndex];

  const currentTestimonialClass = fading ? "current-testimonial fading" : "current-testimonial"

  return (
    <>
      <div id="biggest-testimonial">
        <div className="current-testimonial-content">{biggestTestimonial.content}</div>
        <div className="current-testimonial-name">-{biggestTestimonial.name}</div>
      </div>
      <div className="ready-container">
        <div className="ready-content">
          <img className="ready-img" src={viewModel.ready.img} alt="I'm ready"/>
          <div className="ready-body-container">
            <div className="editorial-font ready-body-title" style={{ marginBottom: 0 }}>
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
            <div className="testimonials">
              {!isMobileView && (
                <div className="testimonial-counter">
                  <ArrowSvg onClick={() => onClickArrow(-1)} />
                  {key}/{viewModel.testimonials.length}
                  <ArrowSvg isRight onClick={() => onClickArrow(1)} />
                </div>
              )}
              <div
                className={currentTestimonialClass} 
                style={{ minHeight: testimonialMinHeight }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => {
                  const direction = onTouchEnd()
                  handleSwipe(direction)
                }}
              >
                <div className="current-testimonial-content">{content}</div>
                <div className="current-testimonial-name">-{name}</div>
              </div>
              {isMobileView && (
                <div className="testimonial-counter">
                  <ArrowSvg onClick={() => onClickArrow(-1)} />
                  {key}/{viewModel.testimonials.length}
                  <ArrowSvg isRight onClick={() => onClickArrow(1)} />
                </div>
              )}
            </div>
            <div className="links-container">
              <div onClick={openLinkedIn} className="social-link editorial-font ready-body-title">
                LinkedIn
              </div>
              <a href="mailto:hello@breakupartist.coach" className="social-link editorial-font ready-body-title">
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
