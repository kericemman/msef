const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateContact(body = {}) {
  const { name, email, phone = "", subject, message, consent } = body;
  if (
    ![name, email, subject, message].every(
      (value) => typeof value === "string" && value.trim(),
    )
  )
    return "Name, email, subject, and message are required.";
  if (!emailPattern.test(email.trim()) || email.length > 254)
    return "Enter a valid email address.";
  if (typeof phone !== "string" || phone.length > 30)
    return "Enter a valid phone number.";
  if (
    name.trim().length < 2 ||
    name.length > 120 ||
    subject.length > 160 ||
    message.trim().length < 10 ||
    message.length > 5000
  )
    return "Check the length of your name, subject, or message.";
  if (consent !== true)
    return "Please agree that MSEF may use your details to respond.";
  return null;
}
export function validateNewsletter(body = {}) {
  const email = body.email;
  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !emailPattern.test(email.trim())
  )
    return "Enter a valid email address.";
  if (body.consent !== true)
    return "Please agree to receive insight updates by email.";
  return null;
}
