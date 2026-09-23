import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from "react-icons/fi";

const slides = [
  {
    image: "hero",
    eyebrow: "NOT JUST JEWELRY. A LITTLE PIECE OF YOU.",
    line: "For your everyday.",
    ending: "And your",
    italic: "forever.",
    description:
      "Meaningful pieces. Effortless beauty. Meet the jewelry that becomes part of your story.",
    cta: "Find your forever piece",
    to: "/shop",
    label: "THE EVERYDAY EDIT",
    alt: "Sculptural gold hoops on sunlit stone",
  },
  {
    image: "necklace",
    eyebrow: "A NEW CHAPTER, A LITTLE MORE YOU.",
    line: "Meet your next",
    ending: "little",
    italic: "obsession.",
    description:
      "A touch of color. A new favorite. Discover fresh pieces to make your everyday feel different.",
    cta: "Discover new arrivals",
    to: "/shop?collection=new",
    label: "THE NEW CHAPTER",
    alt: "A deep green pendant on a warm golden chain",
  },
  {
    image: "bracelet",
    eyebrow: "FOR THE ONES WHO MEAN EVERYTHING.",
    line: "A little gift.",
    ending: "A lot of",
    italic: "meaning.",
    description:
      "For a milestone, a thank you, or just because. Find a thoughtful piece and make it personal.",
    cta: "Explore the gift edit",
    to: "/shop?collection=gifts",
    label: "THE GIFT EDIT",
    alt: "A sparkling gold bracelet on a soft blush background",
  },
];
export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (paused || hovered || focused) return;
    const timer = window.setInterval(
      () => setActive((previous) => (previous + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused]);
  const select = (index) => {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  };
  const slide = slides[active];
  return (
    <section
      className={"hero hero-carousel slide-" + active}
      aria-roledescription="carousel"
      aria-label="Magnolia collection highlights"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          select(active - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          select(active + 1);
        }
      }}
    >
      <div
        key={active}
        className="slide-content"
        role="group"
        aria-roledescription="slide"
        aria-label={active + 1 + " of " + slides.length}
      >
        <img
          className="hero-image"
          src={"/images/" + slide.image + ".jpg"}
          alt={slide.alt}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content container">
          <span className="eyebrow">{slide.eyebrow}</span>
          <h1>
            {slide.line}
            <br />
            {slide.ending} <em>{slide.italic}</em>
          </h1>
          <p>{slide.description}</p>
          <Link className="button button-cream" to={slide.to}>
            {slide.cta}
            <FiArrowRight />
          </Link>
          <div className="hero-caption">
            <span className="small-flower">✳</span>A little luxury. A lot of
            you.
          </div>
        </div>
      </div>
      <div className="slider-controls container">
        <div className="slider-dots" aria-label="Choose a slide">
          {slides.map((item, index) => (
            <button
              key={item.label}
              className={active === index ? "active" : ""}
              aria-label={"Go to slide " + (index + 1)}
              aria-current={active === index ? "true" : undefined}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <span className="slider-label" aria-live={paused ? "polite" : "off"}>
          {String(active + 1).padStart(2, "0")} / 03 <i />
          {slide.label}
        </span>
        <div className="slider-buttons">
          <button
            aria-label="Previous slide"
            onClick={() => select(active - 1)}
          >
            <FiArrowLeft />
          </button>
          <button
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <FiPlay /> : <FiPause />}
          </button>
          <button aria-label="Next slide" onClick={() => select(active + 1)}>
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
