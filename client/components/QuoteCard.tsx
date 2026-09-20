type QuoteCardProps = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

function Stars() {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <img key={index} src="/assets/icons/star.svg" alt="" />
      ))}
    </div>
  );
}

export default function QuoteCard({ quote, name, role, avatar }: QuoteCardProps) {
  return (
    <article className="quote-card">
      <Stars />
      <p>{quote}</p>
      <div className="person">
        <img src={avatar} alt="" />
        <div>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </article>
  );
}
