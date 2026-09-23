import { Link, useParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import NotFound from '../NotFound/NotFound'
const information = {
  delivery: { title: 'Delivery & returns', paragraphs: ['This storefront is a preview of Magnolia Jewelries. Orders and payments are not available yet.', 'The demo bag shows complimentary delivery for orders of £100 or more, and £5 delivery below £100. Final delivery locations, timelines, and return terms will be confirmed before the store opens.'] },
  care: { title: 'A little care goes a long way.', paragraphs: ['Put your jewelry on after applying perfume, lotion, and makeup. Remove it before swimming, showering, sleeping, or exercising.', 'Gently wipe your pieces with a soft, dry cloth. Avoid abrasive cleaners, and store each piece separately in a soft pouch to prevent scratches.', 'Keep pearls away from chemicals and prolonged heat. A slightly damp, soft cloth is all they need after wear.'] },
  sizing: { title: 'Find your perfect fit.', paragraphs: ['For rings, have your finger measured by a jeweler for the most reliable fit. Measure at room temperature and allow enough room to pass comfortably over your knuckle.', 'Our demo ring sizes use UK letters: J, L, N, P, and R. Necklace lengths are shown in inches; 16 inches is approximately 41 cm, 18 inches is 46 cm, and 20 inches is 51 cm.', 'Bracelet sizes are illustrative for this preview. Exact internal measurements will be published with the final collection.'] },
  contact: { title: 'A little hello.', paragraphs: ['We’re getting our little world ready for you. Customer support details will be published here when Magnolia opens.', 'For now, explore the collection, create a wish list, and get to know our story. This is a demonstration store, so no purchases or messages are processed.'] },
  privacy: { title: 'Your privacy matters.', paragraphs: ['This demo stores your saved pieces and shopping bag in your browser’s local storage. You can remove individual pieces or clear your browser’s site data to delete them.', 'The newsletter preview does not transmit or store your email address. No checkout or payment information is collected.', 'Fonts are loaded from Google Fonts, which receives standard connection information when your browser requests them. Product images are served from this site. A complete privacy policy will be published before commercial launch.'] },
  terms: { title: 'A few thoughtful details.', paragraphs: ['Magnolia Jewelries is currently a demonstration storefront. Product names, materials, prices, and availability are sample content. Images are illustrative and may not match final products.', 'No orders are accepted and no payments are collected. Delivery prices are displayed for demonstration only.', 'Full purchase terms, company details, and customer policies will be available before the store launches.'] },
}
export default function Information() {
  const { topic } = useParams()
  const content = information[topic]
  if (!content) return <NotFound />
  return <><SEO title={content.title} /><section className="information-page container"><span className="eyebrow">HERE FOR THE LITTLE DETAILS</span><h1>{content.title}</h1>{content.paragraphs.map(p => <p key={p}>{p}</p>)}<Link className="text-link" to="/shop">Back to the collection →</Link></section></>
}

