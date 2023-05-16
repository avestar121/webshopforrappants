import React, {useState} from 'react'
import Product from '../../components/Product'
import {client, urlFor} from '../../library/client'
import {useStateContext} from '../../context/StateContext'
import { Navbar } from '../../components'
import {AiOutlineMinus, AiOutlinePlus,AiFillStar,AiOutlineStar} from 'react-icons/ai'

const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product;
    const [index,setIndex] = useState(0)
    const { decQty, incrQty, qty, onAdd, setShowCart} = useStateContext();
    const [selectedSize, setSelectedSize] = useState('S'); // Added state for selected size

    const handleBuyNow = () => {
      onAdd(product, qty,selectedSize)
      setShowCart(true)
    }

    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };

  return (
    <div className='body1'>
        <div className='product-detail-container'>
            <div>
                <div className='product-detail-image'>
                    <img className='product-detail-image' src={urlFor(image && image[index])}></img>
                </div>
                <div className='small-images-container'>
                  {image?.map((item, i) => {
                      return <img
                        key={i}
                        src={urlFor(item && item)}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                      />
                  })}
                </div>
            </div>
            <div className='product-detail-desc'>
                  <h1>{name}</h1>
                  <div className='reviews'>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                    </div>
                    <p>(20)</p>
                  </div>
                  <h4>Details:</h4>
                  <p>{details}</p>
                  <p className='price'>${price}</p>
                  <div className='size'>
            <h3>Size:</h3>
            <div className='size-buttons'>
              <button
                className={selectedSize === 'S' ? 'size-option-selected' : 'size-option'}
                onClick={() => handleSizeChange('S')}
              >
                S
              </button>
              <button
                className={selectedSize === 'M' ? 'size-option-selected' : 'size-option'}
                onClick={() => handleSizeChange('M')}
              >
                M
              </button>
              <button
                className={selectedSize === 'L' ? 'size-option-selected' : 'size-option'}
                onClick={() => handleSizeChange('L')}
              >
                L
              </button>
              <button
                className={selectedSize === 'XL' ? 'size-option-selected' : 'size-option'}
                onClick={() => handleSizeChange('XL')}
              >
                XL
              </button>
            </div>
          </div>
          <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                      <span className='minus'>{qty}</span>
                      <span className='plus' onClick={incrQty}><AiOutlinePlus/></span>
                    </p>
                  </div>
                  <div className='buttons'>
                    <button type="button"
                    className='add-to-cart'
                    onClick={() => onAdd(product, qty,selectedSize)}
                    >Add to cart</button>
                    <button type="button"
                    className='add-to-cart'
                    onClick={() => {
                      handleBuyNow()
                    }}
                    >Buy now</button>
                  </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='markquee'>
            <div className='products-container'>
              {products.map((item) => {
                return (<Product key={item._id}
                product={item}/>)
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"][0...3]';
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails