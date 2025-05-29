import { Routes, Route } from 'react-router-dom'
import LayoutComponent from './components/Layout.component/Layout.component'

import './App.css'
import HomePage from './pages/Home/Home.page'
import PageNotFound from './pages/404.page'
import NewsDetailComponent from './components/NewsDetail.component/NewsDetail.component'
import ContactPage from './pages/Contact/Contact.page'
import ParishOffice from './pages/Office/ParishOffice.page'
import PatronPage from './pages/Parish/Patron/PatronPage'
import HistoryPage from './pages/Parish/Parish-History/HistoryPage'
import { PriestsPage } from './pages/Parish/Priests/PriestsPage'


function App() {

  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />} >
        <Route index element={<HomePage />} />
        <Route path="aktualnosci/:slug" element={<NewsDetailComponent />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="kancelaria" element={<ParishOffice />} />
        <Route path="patron" element={<PatronPage />} />
        <Route path="historia" element={<HistoryPage />} />
        <Route path="duszpasterze" element={<PriestsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
