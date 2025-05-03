import { Routes, Route } from 'react-router-dom'
import LayoutComponent from './components/Layout.component/Layout.component'

import './App.css'
import HomePage from './pages/Home.page'
import NewsPage from './pages/News.page'
import PageNotFound from './pages/404.page'
import NewsDetailComponent from './components/NewsDetail.component/NewsDetail.component'


function App() {

  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />} >
        <Route index element={<HomePage />} />
        <Route path="aktualnosci/:slug" element={<NewsDetailComponent />} />
        <Route path="ogloszenia" element={<NewsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
