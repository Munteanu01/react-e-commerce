import { GraphQLClient, gql } from 'graphql-request';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product'
import menu from '../public/menu-white.png'
import eye from '../public/eye-white.png'
import account from '../public/account-white.png'
import search from '../public/search-white.png'
import cart from '../public/cart-white.png'
import close from '../public/close-white.png'
import arrow from '../public/arrow-white.png'

export default function App(){
  const [data, setData] = useState({ backgrounds: [], collections: [], products: [] })
  useEffect(() => {
    async function fetchData() {
      const hygraph = new GraphQLClient('https://api-eu-west-2.hygraph.com/v2/cldoeqd1s0zru01ul6jff82qz/master');
      const query = gql`{
        backgrounds{
          id,
          image{ url },
        },
        collections{
          id,
          slug,
          name,
          categories,
          products{
            id,
            slug,
            name,
            price,
            image{ url }
          }
        },
        products{
          id,
          slug,
          name,
          price,
          image{ url }
        }
      }`
      setData(await hygraph.request(query))
    }
    fetchData()
  }, [])
  
  return (
    <>
      <Navbar collections={data.collections} menu={menu} eye={eye} close={close}account={account} search={search} cart={cart} arrow={arrow}/>
      <Routes>
        <Route path='/' element={<Home background={data.backgrounds[0]} />} />
        <Route path='/collection/:slug' element={<Collection collections={data.collections}/>} />
        <Route path='/product/:slug' element={<Product products={data.products}/>} />
      </Routes>
    </>
  )
}