import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, setAuthToken } from '../../token';
import { setUser } from '../../Redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { setClickSopping } from '../../Redux/reducers/productReducer';
import { setAdmain, setIsLodding } from '../../Redux/reducers/admainReducer';
import { getMe } from '../../WebAPI';
import shoppingCart from '../../image/shopping-cart.png';
import loginPhoto from '../../image/login.png';
import logoutPhoto from '../../image/logout.png';
import home from '../../image/home.png';
import { Center } from '../../styledCss';

const Root = styled.div``

const Headers = styled.div.attrs(props => ({
  admainlogin: props.admainlogin
}))`
  border-bottom: 2px solid #d6d6d6;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px 0px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 888;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
  background: ${({ admainlogin }) => admainlogin ? '#775862' : 'white'};
`

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled(Link).attrs(props => ({
  admainlogin: props.admainlogin // 將 admainLogin 映射到元素上
}))`
  font-size: 28px;
  padding: 0px 10px;
  font-weight: bold;
  text-decoration: none;
  color: ${({ admainlogin }) => admainlogin ? 'white' : '#ffb8cf'};
`

const List = styled.div`
  display: flex;
`
const NavSopping  = styled.div`
  position: relative;
`
const Nav = styled(Link).attrs(props => ({
  admainlogin: props.admainlogin
}))`
  font-size: 16px;
  text-decoration: none;
  color: ${({ admainlogin }) => admainlogin ? 'white' : '#a28876'};
  padding: ${({ admainlogin }) => admainlogin ? '0px 30px' : '0px 20px;'};
  ${Center}
`
const NavbarRight = styled.div``
const State = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  right: 5px;
  top: -15px;
  background: #a90a0a;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
`
const HeaderAdmain = styled.div``
const HeaderUser = styled.div``
const ImgPhoto = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`
export default function Header() {
  const user = useSelector((store) => store.users.user)
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const soppingCard = useSelector((store) => store.products.soppingCard)
  const [ status, setStatus ] = useState(false)
  const admainLogin = useSelector((store) => store.admains.admainLogin)

  const handleLoginOut = () => {
    setAuthToken(" ")
    dispatch(setUser(null))
    dispatch(setAdmain(false))
    if(location.pathname !== "/commodity"){
      navigate("/commodity")        
    }

  }
  const handleModalOpen = () => {
    dispatch(setClickSopping(true))
  }

  useEffect(()=> {
    if(soppingCard.length > 0 ){
      setStatus(true)
    }else{
      setStatus(false)
    }
  }, [soppingCard])


  useEffect(() => {
    if(getAuthToken() !== ''){
      getMe().then(res => {
        if(res.ok === 1){
          dispatch(setUser(res.result))
        }
      })
      .catch(err => {
        dispatch(setIsLodding(true))
        dispatch(setAdmain(true))
        dispatch(setIsLodding(false))
      })
    }
  }, [dispatch])

  useEffect(() => {
    if(location.pathname === "/sopping"){
      dispatch(setClickSopping(false))
    }
  })

  return (
    <Root>
      {admainLogin ? (
        <HeaderAdmain>
          <Headers admainlogin={admainLogin.toString()}>
            <Title to="/admain/commodity" admainlogin={admainLogin.toString()}>米の輕手作 管理員</Title>
            <List>
              <Nav admainlogin={admainLogin.toString()} to="/admain/commodity">商品</Nav>
              <Nav admainlogin={admainLogin.toString()} to="/admain/order">訂單</Nav>
              { !admainLogin && <Nav >登入</Nav>}
              { admainLogin && <Nav admainlogin={admainLogin.toString()} onClick={handleLoginOut}>登出</Nav>}
            </List>
          </Headers>
        </HeaderAdmain>
      ) : (
        <HeaderUser>
          <Headers>
            <NavbarLeft>
              <Title to="/commodity">
                CakeShop
              </Title>
            </NavbarLeft>
            <NavbarRight>
              <List>
                <Nav to="/commodity">
                  <ImgPhoto src={home}/>
                  首頁
                </Nav>
                <NavSopping>
                  {status && <State>{soppingCard.length}</State>}
                  <Nav onClick={handleModalOpen} >
                    <ImgPhoto src={shoppingCart}/>
                    購物車
                  </Nav>
                </NavSopping>
                { !user && <Nav to='/login' $active={location.pathname === '/login'}>
                  <ImgPhoto src={loginPhoto}/>
                  登入
                  </Nav>}
                { user && <Nav onClick={handleLoginOut} >
                  <ImgPhoto src={logoutPhoto}/>
                  登出
                </Nav>}
              </List>
            </NavbarRight>
          </Headers>
        </HeaderUser>
      )}
    </Root>
    
  )
}
