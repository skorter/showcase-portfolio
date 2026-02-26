"use client"

export default function Contact() {
    return (
        <main>
            <h1>Contact Me</h1>
            <p>You can reach me through the links below:</p>
            <ul>
                <li><a href="https://i546177.hera.fontysict.net" target="_blank" rel="noreferrer">Website</a></li>
                <li><a href="mailto:sylvio.makni@gmail.com">Email</a></li>
                <li><a href="https://git.fhict.nl/I546177" target="_blank" rel="noreferrer">GitLab</a></li>
                <li><a href="https://github.com/skorter" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/sylvio-makni/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com/sylvio_makni" target="_blank" rel="noreferrer">Twitter</a></li>
                <li><a href="https://www.instagram.com/_sylvx_/" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
        </main>
    )
}

export function ContactPage() {
    return (
        <Contact />
    )
}