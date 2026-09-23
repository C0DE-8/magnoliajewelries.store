import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiArrowUpRight } from 'react-icons/fi'
import { ShopContext } from '../context/ShopContext'
import { money } from '../data/products'
export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useContext(ShopContext)
  const saved = favorites.includes(product.id)
  return <article className="product-card"><div className="product-image"><Link to={'/product/' + product.slug}><img src={'/images/' + product.image + '.jpg'} alt={product.name} loading="lazy" /><span className="product-view">Discover this piece <FiArrowUpRight /></span></Link>{product.tag && <span className="product-tag">{product.tag}</span>}<button className={'favorite-button ' + (saved ? 'saved' : '')} aria-label={(saved ? 'Remove ' : 'Save ') + product.name + (saved ? ' from wishlist' : ' to wishlist')} aria-pressed={saved} onClick={() => toggleFavorite(product.id)}><FiHeart /></button></div><div className="product-title"><Link to={'/product/' + product.slug}>{product.name}</Link><span>{money(product.price)}</span></div><p>{product.material}</p><span className="gold-swatch" title="Gold finish" /></article>
}

