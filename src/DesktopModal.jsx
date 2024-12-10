import { useState, useEffect } from 'react'

import { TermsAndConditions } from "./TermsAndConditions"
import { PrivacyPolicy } from "./PrivacyPolicy"
import { useContext } from "react"
import { AppContext } from "./AppContext"

export const DesktopModal = ({ modalKey }) => {
    const { setTermsOpen, setPrivacyOpen } = useContext(AppContext)

    const [isExiting, setIsExiting] = useState(false)

    const header = modalKey === 'terms' ? 'Terms and Conditions' : 'Privacy'
    const Contents = modalKey === 'terms' ? TermsAndConditions : PrivacyPolicy

    const closeThings = () => {
        setIsExiting(true)

        setTimeout(() => {
            setIsExiting(false)
            setTermsOpen(false)
            setPrivacyOpen(false)
        }, 600)
    }

    const modalClass = isExiting ? "desktop-modal exiting" : "desktop-modal";

    useEffect(() => {
        const onKeydown = (keyEvent) => {
            if (keyEvent.key === 'Escape') {
                closeThings()
            }
        }

        window.addEventListener('keydown', onKeydown)

        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    })

    return (
        <div className={modalClass}>
            <div className="desktop-modal-header">
                {header}
            </div>
            <div className="desktop-modal-wrapper">
                <div className="desktop-modal-content">
                    <Contents />
                </div>
                <div className="desktop-modal-button" onClick={closeThings}>
                    Close
                </div>
            </div>
        </div>
    )
}
