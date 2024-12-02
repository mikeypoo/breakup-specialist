import { useContext } from 'react'
import { AppContext } from "./AppContext"

export const ApproachContents = () => {
    const { viewModel } = useContext(AppContext);

    return (
        <div className="approach-contents">
          <div className="body-content-row">
            <div className="body-content-column">
              <div className="body-content-container">
                <div className="body-content-section">
                  <div className="approach-header">
                    <img alt="Why Elizabeth?" className="approach-img" src={viewModel.approach.imgSrc} />
                    <div className="approach-header-text">
                    You don’t just need a coach—you need someone who can look at your successes, struggles, and story and see two things: The common thread of authenticity that’s been buried, and the common thread of INauthenticity that’s got you stuck.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-content-row">
            <div className="body-content-column">
              <div className="body-content-container">
                <div className="body-content-section">
                </div>
                <div className="body-content-section">
                    With over 12 years in corporate leadership and extensive experience helping high-performing individuals, I have both lived and witnessed the rapid success-to-burnout pipeline–and I can promise you: It’s NOT inevitable. What’s more, I know how to bring clarity and lightness to those who’ve lost their spark.
                </div>
                <div className="body-content-section">
                    As a Breakup Artist, I help you change your relationship with people, places, and patterns that no longer serve you. But the real magic happens in the chemistry we create—because transformation requires more than strategy. It thrives on trust and connection. I have a gift for helping people feel at ease from the outset, which means we can dive deep quickly and get to the heart of what’s holding you back.
                </div>
              </div>
            </div>
            <div className="body-content-column">
              <div className="body-content-container">
                <div className="body-content-section">
                    I’m more than your coach; I’m your guide through the challenging but essential work of breaking up. And I do it all with compassion, empathy, and love–even the tough kind. My clients leave our sessions feeling lighter, more energized, and clear on what’s next.
                </div>
                <div className="body-content-section">
                    If you’re ready to bring the same discipline that’s driven your success into reclaiming your passion and vitality, I can help you get there.
                </div>
                <div className="body-content-section">
                    Because your brilliance isn’t lost. It’s waiting on the other side of your breakup.
                </div>
              </div>
            </div>
          </div>
        </div>
    )

}
