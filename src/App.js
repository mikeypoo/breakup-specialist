import { useState, useEffect } from 'react'
import FaintGrid from './FaintGrid';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import './App.css';
import NewTabIcon from './NewTabIcon';
import Clock from './Clock';
import MobileContent from './MobileContent';

const MOBILE_THRESH = 1060

const App = () => {
  const [theme, setTheme] = useState('dark')
  const [isAnimatingClock, setIsAnimatingClock] = useState(false)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < MOBILE_THRESH)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateSize = () => {
      setIsMobileView(window.innerWidth < MOBILE_THRESH)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  const toggleTheme = () => {
    setIsAnimatingClock(true)
    setTimeout(() => {
      setIsAnimatingClock(false)
    }, 2000)
    window.toggleDayAndNight?.()
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  const openCalendly = () => {
    window.open('https://calendly.com/elizaldana/clarity-session', '_blank').focus();
  }

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/witheaa/', '_blank').focus();
  }

  if (isMobileView) {
    return (
      <div>
        <div className="vertical-container">
          <MobileContent />
          <div className="footer-toggle" onClick={toggleTheme}>
            <Clock isAnimating={isAnimatingClock}/>
            <div className="footer-toggle-container">
              <div className={`transition-text footer-toggle-label${theme === 'dark' ? ' active' : ''}`}>Lunar</div>
              <div className={`transition-text footer-toggle-label${theme === 'dark' ? '' : ' active'}`}>Solar</div>
            </div>
          </div>
        </div>
        <div className="mobile-footer">
          <div className="footer-right-row">
            <div>
              <div className="footer-right-label transition-text">
                Meet Elizabeth
              </div>
              <div className="footer-right-link transition-text" onClick={openCalendly}>
                <span>
                  Calendly
                </span>
                <NewTabIcon />
              </div>
            </div>
            <div className="footer-right-linkedin">
              <div className="footer-right-label transition-text">
                LinkedIn
              </div>
              <div className="footer-right-link transition-text" onClick={openLinkedIn}>
                <span>
                  @witheaa
                </span>
                <NewTabIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <FaintGrid />
      <div className="container">
        <LeftSide />
        <RightSide />
      </div>
      <div className="footer no-bg">
        <div className="footer-left">
          <div className="footer-toggle" onClick={toggleTheme}>
            <Clock isAnimating={isAnimatingClock}/>
            <div className="footer-toggle-container">
              <div className={`transition-text footer-toggle-label${theme === 'dark' ? ' active' : ''}`}>Lunar</div>
              <div className={`transition-text footer-toggle-label${theme === 'dark' ? '' : ' active'}`}>Solar</div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-row">
            <div>
              <div className="footer-right-label transition-text">
                Meet Elizabeth
              </div>
              <div className="footer-right-link transition-text" onClick={openCalendly}>
                <span>
                  Calendly
                </span>
                <NewTabIcon />
              </div>
            </div>
            <div className="footer-right-linkedin">
              <div className="footer-right-label transition-text">
                LinkedIn
              </div>
              <div className="footer-right-link transition-text" onClick={openLinkedIn}>
                <span>
                  @witheaa
                </span>
                <NewTabIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
