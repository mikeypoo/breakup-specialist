export const ArrowSvg = ({ isRight = false, onClick }) => {
  const transform = !isRight ? "rotate(180deg)" : "";

  const tapTargetClass = isRight ? 'testimonial-arrow-taptarget target-right' : 'testimonial-arrow-taptarget'

  return (
    <div className={tapTargetClass} onClick={onClick}>
      <svg 
        className="testimonial-arrow"
        style={{ transform }}
        width="800px" 
        height="800px" 
        viewBox="0 0 16 16" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon points="4.586,3.414 9.172,8 4.586,12.586 6,14 12,8 6,2" />
      </svg>
    </div>
  );
};
