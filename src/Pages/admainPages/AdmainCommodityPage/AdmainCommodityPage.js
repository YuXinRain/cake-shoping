import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Center } from '../../../styledCss';
import edit from '../../../image/edit.png';
import { Link } from 'react-router-dom';
import lodding from '../../../image/cat.png';
import { getProduct } from '../../../Redux/reducers/admainReducer';

const Root = styled.div`
  margin-top: 150px;
  ${Center}
  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-top: 100px;
  }
`
const Title = styled.div`
  padding: 20px 40px;
  font-size: 20px;
  background-color: #775862;
  color: white;
  letter-spacing:5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`
const Navber = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #775862;
  @media (max-width: 768px) {
    padding: 10px;
  }
`
const Nav = styled.div`
  letter-spacing:5px;
  width: 80px;
  text-align: center;
  @media (max-width: 768px) {
    width: auto;
  }
`
const NavButton = styled.div`
  text-align: center;
  width: 80px;

`
const PhotoNav = styled.div`
  width: 200px;
  text-align: center;
  letter-spacing:5px;
  @media (max-width: 768px) {
    width: auto;
  }
`
const List = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`
const ContentAll = styled.div`
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  width:80%;
  @media (max-width: 768px) {
    width: 90%;
  }
`
const TitleName = styled.div`
  font-size: 19px;
`
const NewButton = styled(Link)`
  text-decoration:none;
  width: 150px;
  letter-spacing:10px;
  border: none;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  color: #775862;
  font-size: 16px;
  text-align: center;
  @media (max-width: 768px) {
    width: 40%;
    font-size: 14px;
    padding: 5px;
  }
`
const PostAll = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  letter-spacing:2px;
  position: relative;
  @media (max-width: 768px) {
    height: 150px;
    border-bottom: 1px solid grey;
  }
`
const Content = styled.div`
  width: 80px;
  text-align: center;
  margin: 0px 22px;
  :first-child{
    width: 200px;
  }
  @media (max-width: 768px) {
    margin: 0px;
    padding-left: 20px;
    text-align: left;
    width: 100%;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    letter-spacing: 3px;
    color: #775862;
    :first-child{
      width: 95%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      color: grey;
      margin-right: 5px;
    }
  }
`
const AllContent = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
    width: 55%;
  }
`
const ContentButton = styled.div`
  width: 80px;
  height: 100px;
  text-align: center;
  ${Center}
  @media (max-width: 768px) {
    position: absolute;
    bottom: 25px;
    right: 0px;
    height: auto;
  }
`
const EditBttton = styled.img`
  width: 25px;
  cursor: pointer;
`

const PostPhoto = styled.img`
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    padding-left: 15px;
  }
`

const NavName = styled.div`
  letter-spacing:5px;
  width: 200px;
  text-align: center;
  @media (max-width: 768px) {
    width: auto;
  }
`

const LoginNone = styled(Link)`
  font-size: 20px;
  letter-spacing: 2px;
  cursor: pointer;
  color: #775862;
  text-decoration: none;
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  padding: 10px;
  border-radius: 10px;
`
const Lodding = styled.div`
  font-size: 42px;
  background: #faf1eb;
  ${Center}
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #a28876;
  z-index: 222;
`
const LoddingImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
  margin-right: 5px;
`
function Post({ post, rwdOpen }){
  const statusText = post.isShow === 1 ? '已上架' : '未上架';
  const check = post.photoUrl.length === 0 ? '' : post.photoUrl[0].url
  return(
    <PostAll key={post.id}>
      <PostPhoto alt="未上傳圖片" src={check}/>
      {rwdOpen ? (
      <AllContent>
        <Content><span>名稱:</span>{post.productName}</Content>
        <Content><span>價錢:</span>{post.price}</Content>
        <Content><span>上架:</span>{statusText}</Content>
        <Content><span>售出:</span>{post.sell}</Content>
        <Content><span>庫存:</span>{post.storage}</Content>
      </AllContent>
      ):(
      <AllContent>
        <Content>{post.productName}</Content>
        <Content>{post.price}</Content>
        <Content>{statusText}</Content>
        <Content>{post.sell}</Content>
        <Content>{post.storage}</Content>
      </AllContent>
      )}
      <ContentButton>
        <Link to={`/admain/commodity/${post.id}`}>
          <EditBttton src={edit} />
        </Link>
      </ContentButton>
      
    </PostAll>
  )
}

export default function AdmainCommodityPage() {
  const dispatch = useDispatch()
  const admainProduct = useSelector((store) => store.admains.ProductAll)
  const admainLogin = useSelector((store) => store.admains.admainLogin)
  const admainLodding = useSelector((store) => store.admains.isLodding)
  const [ rwdOpen, setRwdOpen ] = useState(true)
  window.onresize = () => {
    const currentWindowWidth = window.innerWidth;
      if (currentWindowWidth <= 768) {
        setRwdOpen(true)
      } else {
        setRwdOpen(false)
      }
  }

  useEffect(() => {
    if(admainProduct.length === 0){
      dispatch(getProduct())
    }
    window.scrollTo(0, 0);

  }, [dispatch, admainProduct.length])

return(
  <Root>
    {admainLodding && (
      <Lodding>
        <LoddingImg src={lodding} />
        Lodding
      </Lodding>)}
    {admainLogin ? (
      <ContentAll>
      <Title>
        <TitleName >商品上架管理</TitleName>
        <NewButton to={'/admain/commodity/NewPost'}>新增商品</NewButton>
      </Title>
      {rwdOpen ? (
      <Navber>
        <PhotoNav>圖片</PhotoNav>
        <Nav>商品資訊</Nav>
      </Navber>
      ) : (
        <Navber>
          <PhotoNav>圖片</PhotoNav>
          <NavName>名稱</NavName>
          <Nav>價格</Nav>
          <Nav>上架</Nav>
          <Nav>售出</Nav>
          <Nav>庫存</Nav>
          <NavButton>編輯</NavButton>
        </Navber>
        )}
      <List>
        {admainProduct && admainProduct.map(post => <Post key={post.id} post={post} rwdOpen={rwdOpen}/>)}
      </List>
    </ContentAll>
    ) : (
      <LoginNone to={'/admain'}>
        管理員登入
      </LoginNone>
    )}
  </Root>
 );
}
