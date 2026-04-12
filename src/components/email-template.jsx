import * as React from "react";

export default function EmailTemplate({
  firstName,
  lastName,
  companyName,
  email,
  message,
}) {
  return (
    <div>
      <h1>New Contact Form Submission</h1>
      <p>You have received a new message from your contact form:</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <strong>Name:</strong> {firstName} {lastName}
        </li>
        {companyName && (
          <li>
            <strong>Company:</strong> {companyName}
          </li>
        )}
        <li>
          <strong>Email:</strong> {email}
        </li>
      </ul>
      <h2>Message:</h2>
      <p>{message}</p>
      <hr />
      <p>This email was generated from the contact form on your website.</p>
    </div>
  );
}
