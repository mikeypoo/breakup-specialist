import { useContext, useState } from "react"
import { AppContext } from "./AppContext"

export const ReadyContents = () => {
    const { openCalendly, viewModel } = useContext(AppContext)
    const [testimonialIndex, setTestimonialIndex] = useState(0)

    const { content, name } = viewModel.testimonials[testimonialIndex]

    const handleClick = (newIdx) => {
        setTestimonialIndex(newIdx)
    }

    return (
        <div className="ready-container">
            <div className="ready-content">
                <img src={viewModel.ready.imgSrc} className="ready-img" alt="I am ready" style={{ marginBottom: '40px' }}/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="editorial-font body-title" style={{ marginBottom: '8px', maxWidth: '250px', lineHeight: '2.2rem' }}>{viewModel.ready.bodyTitle}</div>
                    <div className="body-font body-subtitle">{viewModel.ready.bodySubtitle}</div>
                </div>
                <button className="editorial-font body-cta" onClick={openCalendly}>
                    I am ready
                </button>
            </div>
            <div className="testimonial-content">
                <div className="title-text editorial-font" style={{ cursor: 'default' }}>Testimonials</div>
                <div className="current-testimonial">
                    <div className="current-testimonial-content">
                        "{content}"
                    </div>
                    <div className="current-testimonial-name">
                        {name}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {viewModel.testimonials.map(testimonial => {
                        const background = testimonial.key === testimonialIndex + 1 ? 'var(--eerie-black)' : 'var(--cotton-seed)'
                        return (
                            <div style={{ background, borderRadius: '50%', width: '12px', height: '12px', cursor: 'pointer' }} key={testimonial.key} onClick={() => handleClick(testimonial.key - 1)} />
                        )
                    })}
                </div>
            </div>
        </div>
    )

}
