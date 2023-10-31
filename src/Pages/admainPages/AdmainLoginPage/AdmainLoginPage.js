
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAdmainLogin, setError } from '../../../Redux/reducers/admainReducer';
import { Button, Center } from '../../../styledCss';

const Root = styled.div`
  margin-top: 150px;
  ${Center}
  margin-bottom: 50px;
`
const Lodding = styled.div`
  font-size: 50px;
  ${Center}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`
const LoginForm = styled.form`
  border-radius: 10px;
  display: block;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  width: 650px;
  height: 600px;
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
  width: 100%;
  height: 60px;
  padding: 0px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-width: 80%;
`
const FormAll = styled.div`
  ${Center}
`

const Text = styled.div`
margin-top: 30px;
  input{
    width: 500px;
    height: 30px;
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
const Nav = styled.div``
const ErrorMessage = styled.div`
  color: #ff8587;
  text-align: right;
  padding-top: 10px;
  margin-top: 5px;
`
const  Btn = styled.button`
  width: 100px;
  height: 50px;
  ${Button}
  border: 1.5px solid grey;
  font-size: large;
`
const Login = styled.div`
  margin-top: 50px;
  ${Center}
  @media (max-width: 768px) {  
    margin: 30px 0px;
  }
`
export default function AdmainLoginPage() {
  const isLodding = useSelector((store) => store.users.isLodding)
  const err = useSelector((store) => store.admains.err)
  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const dispatch = useDispatch()
  const admain = useSelector((store) => store.admains.admainLogin)
  const navigate = useNavigate()

  const handleLoginSubmit = () => {
    dispatch(getAdmainLogin({ username, password }));
  };

  useEffect(() => {
    dispatch(setError(''))
    if(admain){
      navigate('/admain/commodity')
    }
  }, [admain, navigate])

  const handlePasswordChange = (e) => {setPassword(e.target.value)}
  const handleUserNameChange = (e) => {setUserName(e.target.value)}

 return(
  <Root>
    {isLodding && <Lodding>Lodding...</Lodding>}
    <LoginForm onSubmit={handleLoginSubmit}>
      <Title>
        管理者登入
      </Title>
      <FormAll>
        <Text>
          <Nav>
            <input type="text" placeholder="帳號" value={username} onChange={handleUserNameChange}></input>
          </Nav>
          <Nav>
            <input type="password" placeholder="密碼" value={password} onChange={handlePasswordChange}></input>
          </Nav>
          {err && <ErrorMessage>{err.toString()}</ErrorMessage>}
          <Login>
            <Btn type="submit">登入</Btn>
          </Login>
        </Text>        
      </FormAll>
    </LoginForm>
  </Root>
 )
}
