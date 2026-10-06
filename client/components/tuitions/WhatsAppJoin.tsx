import { site } from "@/lib/site";

export function WhatsAppJoin() {
  return (
    <section className="wa-join">
      <div className="wa-join-copy">
        <span className="wa-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
            <path
              d="M12 3.5A8.2 8.2 0 0 0 4.7 16.2L4 20.2l4.1-.7A8.2 8.2 0 1 0 12 3.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M9.2 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.2 0 .3-.1.5l-.3.4c-.1.1-.2.3 0 .5.3.5.8 1.1 1.6 1.5.6.3 1 .4 1.2.2l.5-.5c.2-.2.3-.1.5-.1.2.1 1.3.6 1.5.7.2.1.3.2.4.3.1.2.1.9-.2 1.6-.3.7-1.5 1.2-2.1 1.2-.5 0-1.1-.1-2.5-.8-1.6-.8-2.7-2.2-3.1-2.6-.4-.4-1.3-1.7-1.3-3.2 0-1.5.8-2.2 1.1-2.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <div>
          <p className="wa-kicker">For tutors looking for work</p>
          <h2>Join the tuition WhatsApp group</h2>
          <p>New jobs are shared here first. Open a listing, then apply in the same group.</p>
        </div>
      </div>
      <a className="btn btn-primary btn-lg" href={site.whatsappGroup} target="_blank" rel="noreferrer">
        Join WhatsApp group
      </a>
    </section>
  );
}
