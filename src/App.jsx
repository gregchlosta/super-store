import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/navigation/navigation.component'
import Home from './pages/home/home.component'
import SignIn from './pages/signin/signin.component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Home />} />
        <Route path='signin' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
