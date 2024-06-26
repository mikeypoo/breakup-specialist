const Clock = ({ isAnimating }) => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame 6">
            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="currentColor"/>
            <path id="Vector 4" d="M20 6.5V21" stroke="currentColor" className={`minute-hand${isAnimating ? ' is-animating' : ''}`} />
            <path id="Vector 5" d="M20 20L27 28" stroke="currentColor" className={`hour-hand${isAnimating ? ' is-animating' : ''}`} />
            </g>
        </svg>
    )
}

export default Clock;
