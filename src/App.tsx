import { Routes, Route } from 'react-router-dom'
import LayoutComponent from './components/Layout.component'

import './App.css'
import HomePage from './pages/Home.page'
import ActualsPage from './pages/Actuals.page'
import NewsPage from './pages/News.page'
import PageNotFound from './pages/404.page'


function App() {

  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />} >
        <Route index element={<HomePage />} />
        <Route path="aktualnosci" element={<ActualsPage />} />
        <Route path="ogloszenia" element={<NewsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
