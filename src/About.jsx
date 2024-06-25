import { useCookies } from 'react-cookie'
import { COOKIE_NAME } from './constants'

const About = () => {
    const [, setCookie] = useCookies([COOKIE_NAME])

    setCookie(COOKIE_NAME, 'skip')

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3>
                How I’ll add value to your life:
            </h3>
            <div>
                Your score indicates you're not just ready for change; you're eager to make significant strides towards transformation. Let me guide you through your journey, leveraging my expertise to navigate the complexities of personal growth and strategic life changes….
            </div>
            <div>
                I specialize in catalyzing profound life changes, guiding you to strategically break up with the people, places, and patterns that no longer serve your purpose. Understanding who you are—your desires, why they matter, and creating a roadmap to make these dreams a reality—is at the heart of my method. With decades of personal growth, successful manifestations, and a robust background in project management and creative operations, I'm dedicated to transforming your ideal aspirations into your real life. This journey is not merely about change; it embodies the courage to push beyond your known limits, turning complex challenges into achievable milestones through clarity, actionable steps, and strategic prioritization.
            </div>
            <div>
                My expertise in simplifying the intricate, focusing on what genuinely aligns with you, and discarding what doesn’t, sets the foundation for a transformative process. By challenging you with tough love and leveraging your strengths to optimize results, I guide you toward efficiently realizing your dream life. This process combines practical, tactical planning with a deep connection to your personal growth, ensuring that every step is aligned with surpassing your current boundaries and achieving lasting happiness and fulfillment.
            </div>
        </div>

    )
}

export default About
