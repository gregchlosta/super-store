import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/navigation/navigation.component'
import Home from './pages/home/home.component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
