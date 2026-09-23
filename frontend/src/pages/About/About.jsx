import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
export default function About() {
  return (
    <>
      <SEO title="Our story" />
      <div className="page-intro">
        <span className="eyebrow">ROOTED IN THE LITTLE THINGS</span>
        <h1>
          Beautifully, <em>unapologetically you.</em>
        </h1>
        <p>Welcome to our little world.</p>
      </div>
      <section className="story-section container about-story">
        <div className="story-image">
          <img src="/images/story.jpg" alt="A collection of golden treasures" />
        </div>
        <div className="story-copy">
          <span className="flower-mark">✳</span>
          <h2>
            Jewelry for the
            <br />
            stories you live.
          </h2>
          <p>
            Magnolia began with a simple idea: the pieces you love most are the
            ones that feel like a part of you.
          </p>
          <p>
            Inspired by the quiet beauty of a magnolia bloom, our collection
            celebrates softness, individuality, and the everyday moments worth
            remembering.
          </p>
          <p>
            From a first little gift to yourself to a keepsake for someone you
            love, we’re here to help you find something meaningful. Simple
            enough for every day. Special enough to stay.
          </p>
          <Link className="button" to="/shop">
            Find your Magnolia piece
          </Link>
        </div>
      </section>
    </>
  );
}
