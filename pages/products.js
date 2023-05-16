import React from 'react';
import { client } from '../library/client';
import {
  Product,
  Footer,
  Cart,
  Layout,
  Navbar
} from '../components/index';

const Products = ({ products }) => {
  return (
    <div className='body1'>
      <div className='products-heading'>
        <h2>Featured Products</h2>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: {
      products
    }
  };
}

export default Products;
