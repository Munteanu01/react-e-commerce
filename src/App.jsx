import { GraphQLClient, gql } from 'graphql-request';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import New from './pages/New';
import Collection from './pages/Collection';
import Product from './pages/Product'
import Search from './pages/Search'
import Account from './pages/Account'
import menu from '/src/icons/menu-black.png'
import eye from '/src/icons/eye-black.png'
import account from '/src/icons/account-black.png'
import search from '/src/icons/search-black.png'
import cart from '/src/icons/cart-black.png'
import close from '/src/icons/close-black.png'
import arrow from '/src/icons/arrow-black.png'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'

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
          products { name }
        },
        products(first: 1000){
          id,
          slug,
          name,
          price,
          new,
          categories,
          colors,
          sizes,
          image{ url },
          collections { name }
        }
      }`
      setData(await hygraph.request(query))
    }
    fetchData()
  }, [])
  
  return (
    <>
      <Navbar collections={data.collections} menu={menu} eye={eye} close={close} account={account} search={search} cart={cart} arrow={arrow}/>
      <Routes>
        <Route path='*' element={<Home backgrounds={data.backgrounds} />} />
        <Route path='/new' element={<New products={data.products}/>} />
        <Route path='/:slug/:category?' element={<Collection collections={data.collections} products={data.products}/>} />
        <Route path='/product/:slug' element={<Product products={data.products}/>} />
        <Route path='/search/:query' element={<Search products={data.products}/>}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/checkout' element={<Checkout />}/>
      </Routes>
    </>
  )
}