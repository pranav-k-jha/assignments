import React from 'react'
import Searchbar from './SearchBar'

const Appbar = () => {
  return (
    <div className='flex justify-between'> 
    <div className='pl-3'>Youtube</div>
    <div><Searchbar/></div>
    <div>Sign in</div>
    </div>
  )
}

export default Appbar