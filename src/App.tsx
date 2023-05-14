import './App.css';
// eslint-disable-next-line no-unused-vars
import {QueryClient, QueryClientProvider} from "react-query"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Navbar from './layout/Navbar';
import './index.css'
import { CategoryProvider } from './context/categoryContext';
import Categories from './pages/Categories';
import Publishers from './pages/Publishers';

const queryClient = new QueryClient();
const App = () => {
  return(
    <CategoryProvider>
      <QueryClientProvider client={queryClient}>
        
          <Router>
          <Navbar />
            <Routes>
              <Route path="/:category" element={<Home/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/publishers" element={<Publishers/>}/>
            </Routes>
          </Router>
        
      </QueryClientProvider>
    </CategoryProvider>
  ) 
}
export default App;
