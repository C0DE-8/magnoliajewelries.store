import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiGift,
  FiFileText,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";
import { articles, faqs } from "../data/editorial";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function HomeExtras() {
  return (
    <>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">JUST ARRIVED IN OUR LITTLE WORLD</span>
            <h2>Something new to love.</h2>
          </div>
          <Link className="text-link" to="/shop?collection=new">
            Discover new arrivals <FiArrowUpRight />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.tag === "NEW")
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      <section className="gift-banner">
        <div className="gift-banner-image">
          <img
            src="/images/bracelet.jpg"
            alt="A delicate crystal bracelet chosen as a thoughtful gift"
            loading="lazy"
          />
        </div>
        <div className="gift-banner-copy">
          <FiGift />
          <span className="eyebrow">
            THE ART OF GIVING SOMETHING MEANINGFUL
          </span>
          <h2>
            For their moment.
            <br />
            <em>From your heart.</em>
          </h2>
          <p>
            A birthday. A new beginning. A little “thinking of you.” Choose a
            piece, add a personal message, and make the little things matter.
          </p>
          <div className="gift-budget-links">
            <Link to="/shop?max=75">
              Gifts £75 & under <FiArrowUpRight />
            </Link>
            <Link to="/shop?max=100">
              Gifts £100 & under <FiArrowUpRight />
            </Link>
            <Link to="/shop?collection=gifts">
              The full gift edit <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              A LITTLE MORE THAN A FINISHING TOUCH
            </span>
            <h2>Make it your everyday ritual.</h2>
          </div>
          <Link className="text-link" to="/information/care">
            Explore jewelry care <FiArrowUpRight />
          </Link>
        </div>
        <div className="ritual-grid">
          <article>
            <span>01 / CHOOSE YOUR FINISH</span>
            <h3>A little golden warmth.</h3>
            <p>
              Vermeil pairs a sterling silver base with a layer of gold.
              Gold-plated pieces use a gold finish over a base metal. Check each
              piece’s material before choosing.
            </p>
          </article>
          <article>
            <span>02 / FIND YOUR BALANCE</span>
            <h3>Layer with intention.</h3>
            <p>
              Mix a short chain with a longer pendant, or let a sculptural pair
              of earrings do the talking. Start with one favorite and build from
              there.
            </p>
          </article>
          <article>
            <span>03 / KEEP IT CLOSE</span>
            <h3>Small acts of care.</h3>
            <p>
              Last on in the morning, first off at night. A gentle wipe and a
              separate soft pouch help protect the pieces you love from
              scratches and moisture.
            </p>
          </article>
        </div>
      </section>
      <section className="journal-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM THE MAGNOLIA JOURNAL</span>
              <h2>A few notes on beautiful living.</h2>
            </div>
            <Link className="text-link" to="/journal">
              Read the journal <FiArrowUpRight />
            </Link>
          </div>
          <div className="journal-grid">
            {articles.map((article) => (
              <Link
                className="journal-card"
                to={"/journal/" + article.slug}
                key={article.slug}
              >
                <div>
                  <img
                    src={"/images/" + article.image + ".jpg"}
                    alt={article.title}
                    loading="lazy"
                  />
                </div>
                <span className="eyebrow">
                  {article.category} · {article.readTime}
                </span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="text-link">
                  A little inspiration <FiArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container shopping-steps">
        <div>
          <span className="eyebrow">EVERY DETAIL, BEFORE YOU PAY</span>
          <h2>
            A thoughtful journey.
            <br />
            <em>From bag to keepsake.</em>
          </h2>
          <p>
            Choose your favorites, review the details, and keep a clear record
            of your selections.
          </p>
          <Link className="text-link" to="/shop">
            Find your piece <FiArrowRight />
          </Link>
        </div>
        <ol>
          <li>
            <FiPackage />
            <div>
              <h3>Make it yours</h3>
              <p>
                Pick your size and collect your favorite pieces in your bag.
              </p>
            </div>
          </li>
          <li>
            <FiGift />
            <div>
              <h3>Add the personal details</h3>
              <p>
                Choose delivery, optional wrapping, and a message for someone
                special.
              </p>
            </div>
          </li>
          <li>
            <FiFileText />
            <div>
              <h3>Review your invoice</h3>
              <p>
                See each item, the full total, and payment instructions when
                available. Save a copy for your records.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <section className="faq-section container section">
        <div>
          <span className="eyebrow">THE LITTLE THINGS YOU MIGHT WONDER</span>
          <h2>Let’s make it simple.</h2>
          <p>A little clarity before you choose.</p>
          <Link className="text-link" to="/information/contact">
            Here to help <FiArrowUpRight />
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
