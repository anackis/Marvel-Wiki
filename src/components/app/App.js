
import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'));

const App = () => { 
    
  return (
    <Suspense fallback={<Spinner/>}>
      <Router>
        <div className="app">
          <AppHeader/>
          <main>
            <Routes>
              <Route path="/" element={<MainPage/>}></Route>
              <Route path="/comics" element={<ComicsPage/>}></Route> 
              <Route path="/comics/:comicId" element={<SingleComicPage/>}></Route>
              <Route path="/characters/:charId" element={<SingleCharPage/>}></Route>
              <Route path="*" element={<Page404/>}></Route>
            </Routes>
          </main>
        </div>
      </Router>
    </Suspense>
  )
}

export default App;