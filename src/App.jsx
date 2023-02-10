import { GraphQLClient, gql } from 'graphql-request';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product'
import menu from '/src/icons/menu-white.png'
import eye from '/src/icons/eye-white.png'
import account from '/src/icons/account-white.png'
import search from '/src/icons/search-white.png'
import cart from '/src/icons/cart-white.png'
import close from '/src/icons/close-white.png'
import arrow from '/src/icons/arrow-white.png'

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