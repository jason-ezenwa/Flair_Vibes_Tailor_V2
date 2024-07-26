import React from "react";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex gap-4 mt-2">
        <a href="https://twitter.com/turntupjason" target="_blank" rel="noreferrer" className="text-fvtLavender-200"><i class="fa-brands fa-twitter fa-lg"></i></a>
        <a href="https://www.linkedin.com/in/chukwuemelie-obumse" target="_blank" rel="noreferrer" className="text-fvtLavender-200"><i class="fa-brands fa-linkedin fa-lg"></i></a>
      </div>
      <p className>Copyright © 2022 - 2023 — <a href="https://jason-ezenwa.vercel.app/" className="text-fvtLavender-200">Chukwuemelie Obumse</a></p>
      <p className="footer-brand-name">Vibes Tailor</p>
      <p className="footer-text">Spotify is a trademark of Spotify AB Inc., registered in the U.S. and other countries.</p>
    </footer>
  )
}
