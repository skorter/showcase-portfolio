import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { firstName, lastName, companyName, email, subject, message } =
      await request.json();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sylvio.makni@gmail.com",
      subject: "New Contact Form Submission",
      react: EmailTemplate({
        firstName,
        lastName,
        companyName,
        email,
        subject,
        message,
      }),
    });
    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
