import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/navigation/navigation.component'
import Home from './pages/home/home.component'
import Authentication from './pages/authentication/authentication.component'
import Shop from './pages/shop/shop.component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App
