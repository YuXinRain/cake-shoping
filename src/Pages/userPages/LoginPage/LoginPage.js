import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, postRegister, setError } from '../../../Redux/reducers/userReducer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Center } from '../../../styledCss';

const Root = styled.div`
  margin-top: 150px;
  ${Center}
  margin-bottom: 50px;
` 
const LoginForm = styled.form`
  border-radius: 10px;
  display: block;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  width: 650px;
  height: 520px;
  position: relative;
  @media (max-width: 768px) {  
    width: 350px;
    height: auto;
  }
`
const Title = styled.ul`
  align-items: center;
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 550px;
  height: 60px;
  padding: 0px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`
const Nav = styled(Link)`
  color: black;
  font-size: 18px;
  text-decoration: none;
  :hover{
    color: #a28876;
  }
`
const Text = styled.div`
  input{
    width: 500px;
    height: 35px;
    margin-top: 30px;
  }
  @media (max-width: 768px) {  
    input{
      width: 250px;
      height: 30px;
      margin-top: 30px;
      }
  }
`
const Content = styled.div`
  ${Center}
`
const LoginName = styled.div``

const LoginButton = styled.button`
  border: 1.5px solid grey;
  background: none;
  width: 100px;
  height: 50px;
  ${Center}
  cursor: pointer;
  border-radius: 15px;
  position: absolute;
  bottom: 40px;
`

const LoginAll = styled.div`
  ${Center}
  margin: 50px 0px;
  @media (max-width: 768px) {  
    margin: 30px 0px;
  }
`
const ContentAll = styled.div`
`

const ErrorMessage = styled.div`
  color: #ff8587;
  text-align: right;
  padding-top: 10px;
`
const Lodding = styled.div`
  font-size: 50px;
  ${Center}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #faf1eb;
  color: #a28876;
  z-index: 222;
`
const FormAll = styled.div`
  ${Center}
`
function Register({ err,
  username,
  password,
  email,
  phone,
  realName,
  handleUserNameChange,
  handleNameChange,
  handlePasswordChange,
  handlePhoneChange,
  handleEmailChange,
  handleFocus,
  phoneError  }){  
  return(
    <ContentAll>
      <Content>
        <Text>
          <LoginName>
            <input type="text" placeholder="帳號" value={username} onChange={handleUserNameChange} onFocus={handleFocus}></input>
          </LoginName>
          <LoginName>
            <input type="password" placeholder="密碼" value={password} onChange={handlePasswordChange} onFocus={handleFocus}></input>
          </LoginName>
          <LoginName>
            <input type="text" placeholder="姓名" value={realName} onChange={handleNameChange} onFocus={handleFocus}></input>
          </LoginName>
          <LoginName>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} onFocus={handleFocus}></input>
            {phoneError && <div style={{position:'absolute', color:'red', fontSize:'12px'}}>{phoneError}</div>}
          </LoginName>
          <LoginName>
            <input type="text" placeholder="電話" value={phone} onChange={handlePhoneChange} onFocus={handleFocus}></input>
          </LoginName>
          {err && <ErrorMessage>{err.toString()}</ErrorMessage>}
        </Text>
      </Content>
      <LoginAll>
        <LoginButton>註冊</LoginButton>
      </LoginAll>
    </ContentAll>
  )
}
function Login({ err, username, password, handleUserNameChange, handlePasswordChange, handleFocus}){
  return(
    <ContentAll>
      <Content>
        <Text>
          <LoginName>
            <input type="text" placeholder="帳號" value={username} onChange={handleUserNameChange} onFocus={handleFocus}></input>
          </LoginName>
          <LoginName>
            <input type="password" placeholder="密碼" value={password} onChange={handlePasswordChange} onFocus={handleFocus}></input>
          </LoginName>
          {err && <ErrorMessage>{err.toString()}</ErrorMessage>}
        </Text>
      </Content>
      <LoginAll>
        <LoginButton>登入</LoginButton>
      </LoginAll>
    </ContentAll>
)}

export default function LoginPage() {
  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ realName, setName ] = useState('')
  const [ login, setLogin ] = useState(true)
  const emailError = useSelector((store) => store.users.emailError)
  const phoneError = useSelector((store) => store.users.phoneError)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.users.user)
  const err = useSelector((store) => store.users.err)
  const isLodding = useSelector((store) => store.users.isLodding)
  const location = useLocation();

  const handleLoginSubmit = (e) =>{
    e.preventDefault()
    if(location.pathname === "/login"){
      dispatch(getUser({
        username, password
      }))
      setUserName('')
      setPassword('')
    }
    if(location.pathname === "/register"){
      dispatch(postRegister({
        username, password, email, phone, realName
      }))
      setUserName('')
      setPassword('')
    }      
  }
  const handleLoginToggle = () => {
    setLogin(true)
    dispatch(setError(''))
  }
  const handleRegisterToggle = () => {
    setLogin(false)
    dispatch(setError(''))
  }
  const handleUserNameChange = (e) => {setUserName(e.target.value)}
  const handleNameChange = (e) => {setName(e.target.value)}
  const handlePhoneChange = (e) => {setPhone(e.target.value)}
  const handleEmailChange = (e) => {setEmail(e.target.value)}
  const handlePasswordChange = (e) => {setPassword(e.target.value)}
  const handleFocus = () => {dispatch(setError(''))}
  const loginProps = {
    err,
    username,
    password,
    handleUserNameChange,
    handlePasswordChange,
    handleFocus
  };
  const registerProps = {
    err,
    username,
    password,
    email,
    phone,
    realName,
    handleUserNameChange,
    handleNameChange,
    handlePasswordChange,
    handlePhoneChange,
    handleEmailChange,
    handleFocus  }

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user, navigate])
  
  return (
    <Root>
      {isLodding && <Lodding>Lodding...</Lodding>}
      <LoginForm onSubmit={(e) => handleLoginSubmit(e)}>
        <FormAll>
          <Title>
            <Nav onClick={handleLoginToggle} to={'/login'}>會員登入</Nav>
            <Nav onClick={handleRegisterToggle} to={'/register'}>註冊會員</Nav>
          </Title>
        </FormAll>
        {login ? (
        <Login {...loginProps} />
        ) : (
        <Register {...registerProps}/>
        )}
      </LoginForm>
    </Root>
  );
}
