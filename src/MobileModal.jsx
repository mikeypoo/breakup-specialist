import { useState, useEffect } from 'react'

import { TermsAndConditions } from "./TermsAndConditions"
import { PrivacyPolicy } from "./PrivacyPolicy"

import { useContext } from "react"
import { AppContext } from "./AppContext"

export const MobileModal = ({ modalKey }) => {
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

    const modalClass = isExiting ? "mobile-modal exiting" : "mobile-modal";

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
            <div className="mobile-modal-header">
                {header}
            </div>
            <div className="mobile-modal-content">
                <Contents />
            </div>
            <div className="mobile-modal-button" onClick={closeThings}>
                Close
            </div>
        </div>
    )
}