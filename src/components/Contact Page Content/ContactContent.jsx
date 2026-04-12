"use client";

import styles from "./ContactContent.module.css";
import contactData from "../../data/contact.json";
import { SocialIcon } from "react-social-icons";
import { useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, InfoIcon } from "lucide-react";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      <Alert>
        <CheckCircle2Icon className={styles.alertIcon} />
        <AlertTitle>Message Successfully Sent!</AlertTitle>
      </Alert>;
    } else {
      <Alert variant="destructive">
        <InfoIcon className={styles.alertIcon} />
        <AlertTitle>Failed to Send Message</AlertTitle>
      </Alert>;
    }
  }

  return (
    <main className={styles.contactPageContent}>
      <section className={styles.contactForm}>
        <h1>Get In Touch</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="company-name">Company Name: (optional)</label>
          <input
            type="text"
            id="company-name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send</button>
        </form>
      </section>

      <section className={styles.contactInfoBoxes}>
        <article></article>
        <article></article>
        <article></article>
        <article>
          <h2>Find me on:</h2>
          <ul>
            {contactData.map((contact) => (
              <li key={contact.id || ""} className={styles.contactItem}>
                <SocialIcon
                  url={contact.url || "#"}
                  network={contact.label.toLowerCase() || "portfolio"}
                />
              </li>
            ))}
          </ul>
          <SocialIcon
            url="https://www.facebook.com/profile.php?id=100008420058240&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E5YyxttPM%2F#"
            network="facebook"
          />
          <SocialIcon
            url="https://www.instagram.com/_.sylyx._"
            network="instagram"
          />
          <SocialIcon
            url="https://www.threads.com/@_.sylyx._"
            network="threads"
          />
          <SocialIcon
            url="https://www.youtube.com/channel/UCxHYhJ7bEDULGSKfy-b2Aug"
            network="youtube"
          />
          <SocialIcon
            url="https://www.linkedin.com/in/sylvio-makni/"
            network="linkedin"
          />
          <SocialIcon url="https://github.com/skorter" network="github" />
          <SocialIcon url="https://linktr.ee/sylvio.makni" network="linktree" />
        </article>
        <article>
          {" "}
          <ul className={styles.contactList}>
            {contactData.map((contact) => (
              <li key={contact.id || ""} className={styles.contactItem}>
                <a
                  href={contact.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  {contact.label || "Contact Type Unavailable"}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.contactMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629203.0146662965!2d4.476169483674225!3d51.30216329992965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6d8e2c0710f73%3A0x29a1bea1fa3a2428!2sCentrum%2C%20Eindhoven!5e0!3m2!1sen!2snl!4v1776002533034!5m2!1sen!2snl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className={styles.faq}>
        <h2>Quick Answers</h2>
      </section>
    </main>
  );
}
