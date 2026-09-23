import { Link, useParams } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { articles } from "../../data/editorial";
import SEO from "../../components/SEO";
import NotFound from "../NotFound/NotFound";
export default function Journal() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (slug && !article) return <NotFound />;
  if (article)
    return (
      <>
        <SEO
          title={article.title}
          description={article.excerpt}
          image={"/images/" + article.image + ".jpg"}
        />
        <article className="journal-article container">
          <Link to="/journal" className="text-link">
            Back to the journal
          </Link>
          <div className="page-intro">
            <span className="eyebrow">
              {article.category} · {article.readTime}
            </span>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
          </div>
          <img
            className="article-hero"
            src={"/images/" + article.image + ".jpg"}
            alt={article.title}
          />
          <div className="article-body">
            {article.paragraphs.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            <Link className="button" to="/shop">
              Find a piece of yourself <FiArrowUpRight />
            </Link>
          </div>
        </article>
      </>
    );
  return (
    <>
      <SEO title="The Magnolia journal" />
      <div className="page-intro">
        <span className="eyebrow">LITTLE STORIES, LASTING INSPIRATION</span>
        <h1>The Magnolia journal.</h1>
        <p>Style notes, thoughtful gifts, and care for the pieces you love.</p>
      </div>
      <section className="container section journal-grid">
        {articles.map((item) => (
          <Link
            className="journal-card"
            to={"/journal/" + item.slug}
            key={item.slug}
          >
            <div>
              <img src={"/images/" + item.image + ".jpg"} alt={item.title} />
            </div>
            <span className="eyebrow">
              {item.category} · {item.readTime}
            </span>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            <span className="text-link">
              Read the story <FiArrowUpRight />
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
