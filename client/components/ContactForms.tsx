"use client";

import { FormEvent, useState } from "react";

export default function ContactForms() {
  const [contactError, setContactError] = useState("");
  const [contactOk, setContactOk] = useState("");
  const [applyError, setApplyError] = useState("");
  const [applyOk, setApplyOk] = useState("");

  function onContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.name || !data.email || !data.message) {
      setContactOk("");
      setContactError("Please fill in your name, email, and message.");
      return;
    }
    event.currentTarget.reset();
    setContactError("");
    setContactOk("Thanks. Our support team will reply within 24 hours.");
  }

  function onApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.subject || !data.area) {
      setApplyOk("");
      setApplyError("Choose a subject and area so we can match you faster.");
      return;
    }
    setApplyError("");
    setApplyOk("Requirement posted. Verified tutors will start applying shortly.");
  }

  return (
    <div className="container contact-wrap">
      <form className="form-card auth-card" onSubmit={onContact}>
        <h3>Send a message</h3>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@email.com" />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} placeholder="How can we help?" />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <p className={`form-error${contactError ? " is-visible" : ""}`}>{contactError}</p>
        <p className={`form-ok${contactOk ? " is-visible" : ""}`}>{contactOk}</p>
      </form>
      <aside>
        <article className="info-card">
          <h3>Office</h3>
          <p>Gulshan, Dhaka, Bangladesh</p>
          <p className="tiny">Sunday to Thursday, 10:00 AM - 6:00 PM</p>
        </article>
        <article className="info-card" style={{ marginTop: 16 }}>
          <h3>Post a requirement</h3>
          <form onSubmit={onApply}>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" defaultValue="">
                <option value="">Choose a subject</option>
                <option>English</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>ICT</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <input id="area" name="area" type="text" placeholder="Dhanmondi" />
            </div>
            <button className="btn btn-dark" type="submit">
              Post Requirement
            </button>
            <p className={`form-error${applyError ? " is-visible" : ""}`}>{applyError}</p>
            <p className={`form-ok${applyOk ? " is-visible" : ""}`}>{applyOk}</p>
          </form>
        </article>
      </aside>
    </div>
  );
}
