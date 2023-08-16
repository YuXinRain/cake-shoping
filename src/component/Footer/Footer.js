import styled from 'styled-components';
import { Center } from '../../styledCss';

const Footer = styled.footer`
  height: 150px;
  background: #d6d6d6;
  width: 100%;
  ${Center}

`
const FooterAll = styled.div`
  ${Center}
`
const Title = styled.div`
  font-size: 24px;
`
export default function Header() {
  return (
    <Footer>
      <FooterAll>
        <Title>
          Footer
        </Title>
      </FooterAll>
    </Footer>
  )
}
