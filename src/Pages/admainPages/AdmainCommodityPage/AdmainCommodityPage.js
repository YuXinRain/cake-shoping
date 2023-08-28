import { useEffect } from 'react';
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
`
const Navber = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #775862;
`
const Nav = styled.div`
  letter-spacing:5px;
  width: 80px;
  text-align: center;
`
const NavButton = styled.div`
  text-align: center;
  width: 80px;

`
const PhotoNav = styled.div`
  width: 200px;
  text-align: center;
  letter-spacing:5px;

`
const List = styled.div`
  padding: 20px;
`
const ContentAll = styled.div`
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  width:80%;
`
const TitleName = styled.div``
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
`
const PostAll = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  letter-spacing:2px;
`
const Content = styled.div`
  width: 80px;
  text-align: center;
`
const ContentName = styled.div`
  width: 200px;
  text-align: center;
`
const ContentButton = styled.div`
  width: 80px;
  height: 100px;
  text-align: center;
  ${Center}
`
const EditBttton = styled.img`
  width: 25px;
  cursor: pointer;
`

const PostPhoto = styled.img`
  width: 200px;
  height: 200px;
`
const NavName = styled.div`
  letter-spacing:5px;
  width: 200px;
  text-align: center;
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
function Post({ post }){
  const statusText = post.isShow === 1 ? '已上架' : '未上架';
  return(
    <PostAll key={post.id}>
      <PostPhoto src={post.photoUrl[0].url}/>
      <ContentName>{post.productName}</ContentName>
      <Content>{post.price}</Content>
      <Content>{statusText}</Content>
      <Content>{post.sell}</Content>
      <Content>{post.storage}</Content>
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
  console.log('admainProduct', admainProduct)
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
        <TitleName>商品上架管理</TitleName>
        <NewButton to={'/admain/commodity/NewPost'}>新增商品</NewButton>
      </Title>
      <Navber>
        <PhotoNav>圖片</PhotoNav>
        <NavName>名稱</NavName>
        <Nav>價格</Nav>
        <Nav>上架</Nav>
        <Nav>售出</Nav>
        <Nav>庫存</Nav>
        <NavButton>編輯</NavButton>
      </Navber>
      <List>
        {admainProduct && admainProduct.map(post => <Post key={post.id} post={post}/>)}
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
