import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { Button } from 'antd'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
    <Button type='primary'>Button</Button>
  </div>
)

export default HomeView
