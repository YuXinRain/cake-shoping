import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '../../Redux/store';
import Header from '../Header';
import Footer from '../Footer';
import SoppingCard from '../SoppingCard';
import HomePage from '../../Pages/userPages/HomePage'
import LoginPage from '../../Pages/userPages/LoginPage'
import SoppingPage from '../../Pages/userPages/SoppingPage';
import CommodityPage from '../../Pages/userPages/CommodityPage';
import ProductPage from '../../Pages/userPages/ProductPage';
import AdmainLoginPage from '../../Pages/admainPages/AdmainLoginPage';
import AdmainCommodityPage from '../../Pages/admainPages/AdmainCommodityPage';
import AdmainOrderPage from '../../Pages/admainPages/AdmainOrderPage';
import NewPostPage from '../../Pages/admainPages/NewPostPage/NewPostPage';
import AdmainEditPage from '../../Pages/admainPages/AdmainEditPage';

const Root = styled.div`
` 

export default function App() {
  return (
    <Provider store={store} >
      <Root>
        <Router>
          <SoppingCard />
          <Header />
          <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route exact path="/login" element={<LoginPage/>} /> 
              <Route exact path="/sopping" element={<SoppingPage/>} />
              <Route exact path="/commodity" element={<CommodityPage/>} />
              <Route exact path="/register" element={<LoginPage/>} />
              <Route exact path="/product/:id" element={<ProductPage/>} />
              <Route exact path="/admain" element={<AdmainLoginPage/>} /> 
              <Route exact path="/admain/commodity" element={<AdmainCommodityPage/>} /> 
              <Route exact path="/admain/order" element={<AdmainOrderPage/>} /> 
              <Route exact path="/admain/commodity/NewPost" element={<NewPostPage/>} /> 
              <Route exact path="/admain/commodity/:id" element={<AdmainEditPage/>} /> 
          </Routes>
          <Footer />
        </Router>
      </Root>
    </Provider>
  );
}