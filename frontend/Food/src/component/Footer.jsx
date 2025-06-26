import React from 'react'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">Food Blog</div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Food Blog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}