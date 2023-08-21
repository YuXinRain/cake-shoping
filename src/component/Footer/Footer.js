import styled from 'styled-components';
import { Between, Center } from '../../styledCss';
import github from '../../image/github.png';
import { useState } from 'react';

const Footer = styled.footer`
  height: 150px;
  background: #d6d6d6;
  width: 100%;
  ${Center}

`
const FooterAll = styled.div`
`
const ContentAll = styled.div``
const GithubMessage = styled.a`
  margin-left: 45%;
`
const GithubPhoto = styled.img`
  width: 30px;
  height: 30px;
`
const List = styled.div`
  display: flex;
  margin-top: 10px;
`
const Nav = styled.div`
  margin-right: 10px;
`
const NavPrivacy = styled.div`
  margin-right: 10px;
  cursor: pointer;
`
const Open = styled.div`
  background: white;
  width: 50%;
  height: auto;
  padding: 20px;
  position: fixed;
  top: 100px;
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
  border-radius: 10px;
`
const Title = styled.div`
  font-size: 30px;
  ${Between}
  margin-bottom: 20px;
  border-bottom: 1.5px solid #a28876;
  padding-bottom: 10px;
`
const Text = styled.div``
const Close = styled.div`
  text-align: right;
  font-size: 20px;
  cursor: pointer;
`

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
    
  const handleCartClick = (e) => {
    setCartOpen(true)
    // document.body.style.overflow = 'hidden';
  }
  const handleCartCloseClick = (e) => {
    setCartOpen(false)
    document.body.style.overflow = 'auto';
  }

  return (
    <Footer>
      {cartOpen &&
        <Open>
          <Title>
            隱私政策
            <Close onClick={handleCartCloseClick}>X</Close>
          </Title>
          <Text>感謝您使用「CAKESHOP蛋糕訂購平台」，請詳閱本隱私權條款並於使用服務前確定了解本條款內容。
當您瀏覽或使用提供之服務，即表示您同意蒐集、使用與轉載您提供的個人資訊。</Text>
        </Open>}
      <FooterAll>
        <ContentAll>
          <GithubMessage href="https://github.com/YuXinRain/blog-entries">
            <GithubPhoto src={github}/>
          </GithubMessage>
          <List>
            <NavPrivacy onClick={handleCartClick}>隱私政策</NavPrivacy>
            <Nav>|</Nav>
            <Nav>2023 © CAKESHOP</Nav>
          </List>
        </ContentAll>
      </FooterAll>
    </Footer>
  )
}
