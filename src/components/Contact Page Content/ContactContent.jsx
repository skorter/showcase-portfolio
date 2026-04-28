"use client";

import styles from "./ContactContent.module.css";
import contactData from "../../data/contact.json";
import { SocialIcon } from "react-social-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import MyMap from "../Map/Map";

export default function ContactContent() {
  // const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        subject: "",
        message: "",
      });
      await Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonText: "Cool",
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          content: styles.swalContent,
          confirmButton: styles.swalButton,
        },
      });
    } else {
      // setStatus("error");
      await Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          content: styles.swalContent,
          confirmButton: styles.swalButton,
        },
      });
    }
  }

  return (
    <main className={styles.contactPageContent}>
      <section className={styles.contactForm}>
        <h2>Get In Touch</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <article className={styles.firstNameField}>
            <input
              type="text"
              id="first-name"
              name="firstName"
              placeholder=" "
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="first-name">
              <span>First Name:</span>
            </label>
          </article>

          <article className={styles.lastNameField}>
            <input
              type="text"
              id="last-name"
              name="lastName"
              placeholder=" "
              required
              value={formData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="last-name">
              <span>Last Name:</span>
            </label>
          </article>

          <article className={styles.companyNameField}>
            <input
              type="text"
              id="company-name"
              name="companyName"
              placeholder=" "
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="company-name">
              <span>Company Name: (optional)</span>
            </label>
          </article>

          <article className={styles.emailField}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">
              <span>Email:</span>
            </label>
          </article>

          <article className={styles.subjectField}>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className={formData.subject ? styles.hasValue : ""}
            >
              <option value=""></option>
              <option value="freelance">Freelance Project</option>
              <option value="job">Job Opportunity</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="subject">
              <span>Subject:</span>
            </label>
          </article>

          <article className={styles.messageField}>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="message">
              <span>Message:</span>
            </label>
          </article>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </section>

      <div className={styles.contactRight}>
        <section className={styles.contactInfoDetails}>
          <h2>Contact Information</h2>
          <div className={styles.contactDetailsGrid}>
            {contactData.contactDetails.map((contact) => (
              <article key={contact.id || ""}>
                <h3>{contact.label}:</h3>
                <p>{contact.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contactInfoBoxes}>
          <h2>Find me on:</h2>
          <ul>
            {contactData.socials.map((social) => (
              <li key={social.id || ""} className={styles.contactItem}>
                <SocialIcon
                  url={social.url || "#"}
                  target="_blank"
                  network={social.label.toLowerCase() || ""}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contactMap}>
          <h2>Find me here:</h2>
          <MyMap />
        </section>
      </div>
      <section className={styles.faq}>
        <h2>Quick Answers</h2>
        <div className={styles.faqGrid}>
          {contactData["questions&answers"].map((qa) => (
            <article key={qa.id || ""}>
              <h3>{qa.question}</h3>
              <p>{qa.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
