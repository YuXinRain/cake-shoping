
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Center, Between } from '../../../styledCss';
import { getOrderAll } from '../../../WebAPI';
import left from '../../../image/left.png';
import right from '../../../image/right.png';
import Search from '../../../image/search.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Root = styled.div`
  margin-top: 150px;
  ${Center}
  margin-bottom: 50px;
`
const PageTop = styled.div`
  width: 100%;
  height: 100%;
  ${Center}
`
const Title = styled.div`
  padding: 20px 40px;
  font-size: 20px;
  background-color: #775862;
  color: white;
  letter-spacing:5px;
  ${Between}
`
const ContentTitle = styled.div``

const Navber = styled.div`
  padding: 20px;
  display: flex;
  text-align: center;
  justify-content: space-around;
  border-bottom: 1px solid #775862;
  align-items: center;
`
const Nav = styled.div`
  letter-spacing:2px;
  width: 150px;
`
const List = styled.div``
const ContentAll = styled.div`
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  width:100%;
`
const LimitPage = styled.div`
  width: 100px;
  height: 30px;
  width:80%;
  ${Center}
  color: white;
`
const PageBottom = styled.div`
  width: 100%;
  height: 100%;
  ${Center}
  margin-top: 20px;
`
const BtnLeft = styled.img`
  background: #775862;
  width: 15px;
  height: 15px;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`
const BtnRight = styled.img`
  background: #775862;
  width: 15px;
  height: 15px;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;

`
const OrderAll = styled.div`
`

const NavName = styled.div`
  letter-spacing:2px;
  width: 250px;
`
const BtnSum = styled.div`
  text-align: center;
  margin: 10px;
  width: 15px;
  cursor: pointer;
  color: #775862;
  ${({ wire }) => wire === 0 && 'border-bottom: 2px solid black'};
  ${({ wire }) => wire === 1 && 'border-bottom: none'};
`
const SearchImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`
const SearchEngine = styled.div`
  ${Center}
`
const SearchInput = styled.div`
  ${Center}
  input{
    border-radius: 15px;
    border: none;
    height: 20px;
    padding: 5px;
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
const PageContent = styled.div`
  width: 80%;
`
export default function AdmainOrderPage() {
  const [ pages, setPages ] = useState('')
  const [ currents, setCurrents ] = useState('')
  const [ orderAll, setOrderAll ] = useState('')
  const [ resOk, setResok ] = useState('')
  const totalPages = Math.ceil(orderAll.length / 10);
  const totalSearchs = Math.ceil(resOk.length / 10);
  const pageAll = Array.from({ length: totalPages }, (_, index) => ({ num: index + 1, wire: 1 }));
  const resOkAll = Array.from({ length: totalSearchs }, (_, index) => ({ num: index + 1, wire: 1 }));
  const admainLogin = useSelector((store) => store.admains.admainLogin)

  const paging = (sum, page) => {
    const startIndex = (page - 1) * sum;
    const endIndex = startIndex + sum;
    if(resOk){
      const paginatedData = resOk.slice(startIndex, endIndex);
      console.log('resOk',paginatedData)
      setCurrents(paginatedData)
    }else{
      const paginatedData = orderAll.slice(startIndex, endIndex);
      console.log('orderAll',paginatedData)
      setCurrents(paginatedData)
    }
  }
  const handleBtnClick = (id) => {
    if(resOk){
      const updatedPages = resOkAll.map((pageInfo, index) => {
        if (index === id - 1) { 
          return { ...pageInfo, wire: 0 };
        } else {
          return pageInfo;
        }
      });
      setPages(updatedPages)
      paging(10, id)
    }else{
      const updatedPages = pageAll.map((pageInfo, index) => {
        if (index === id - 1) { 
          return { ...pageInfo, wire: 0 };
        } else {
          return pageInfo;
        }
      });
      setPages(updatedPages)
      paging(10, id)
    }
    window.scrollTo(0, 0);
  }

  const handleSearchChange = (e) => {
    const valueAsFloat = parseFloat(e.target.value);
    const updatedSearch = orderAll.filter(data => data.userId === valueAsFloat)
    setResok(updatedSearch)
    if(isNaN(valueAsFloat)){
      setResok('')
    }
  }

  const handleBtnLeftClick = () => {
    const clickLeft = pages.filter(btn => btn.wire === 0)
    if(clickLeft[0].num === 1){
      return paging(10, 1)
    }else{
      const updatedData = pages.map(page => {
        if (page.num === clickLeft[0].num - 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(10, clickLeft[0].num - 1)
    }
    window.scrollTo(0, 0);
  }

  const handleBtnRightClick = () => {
    const clickLeft = pages.filter(btn => btn.wire === 0)
    if(resOk){
      if(clickLeft[0].num === totalSearchs){
        return paging(10, clickLeft[0].num)
      }else{
        const updatedData = pages.map(page => {
        if (page.num === clickLeft[0].num + 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(10, clickLeft[0].num + 1)
    }
    }else{
      if(clickLeft[0].num === totalPages){
        return paging(10, clickLeft[0].num)
      }else{
        const updatedData = pages.map(page => {
        if (page.num === clickLeft[0].num + 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(10, clickLeft[0].num + 1)
    }}
    window.scrollTo(0, 0);

    }

  useEffect(() => {
    getOrderAll().then(res => setOrderAll(res.result))
  }, [])

  useEffect(() => {
    if(resOk){
      const updatedPages = resOkAll.map(data => {
        if (data.num === 1) {
          return { ...data, wire: 0 };
        } else {
          return { ...data, wire: 1 };
        }
      });
      setPages(updatedPages)
      paging(10, 1)
    }else{
      const updatedData = pageAll.map(page => {
        if (page.num === 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(10, 1)
  }
  },[orderAll.length, resOk])
 return(
  <Root>
    {admainLogin ? (
      <PageContent>
        <PageTop>
          <ContentAll>
            <Title>
              <ContentTitle>訂單管理</ContentTitle>
              <SearchEngine>
                <SearchImg src={Search}/>
                <SearchInput>
                  <input type="text" placeholder="會員ID" onChange={handleSearchChange}/>
                </SearchInput>
              </SearchEngine>
            </Title>
            <Navber>
              <NavName>訂單編號</NavName>
              <Nav>會員ID</Nav>
              <Nav>總價</Nav>
              <Nav>狀態</Nav>
            </Navber>
            <List>
              {currents && currents.map(current => 
              <OrderAll key={current.id}>
                <Navber>
                  <NavName>{current.orderid}</NavName>
                  <Nav>{current.userId}</Nav>
                  <Nav>{current.totalPrice}</Nav>
                  <Nav>{current.status}</Nav>
                </Navber>
              </OrderAll> )}
            </List>
          </ContentAll>
        </PageTop>
        <PageBottom>
          <LimitPage>
            <BtnLeft src={left} onClick={handleBtnLeftClick}/>
            {pages && pages.map(page => 
              <BtnSum 
                key={page.num}
                onClick={() => handleBtnClick(page.num)}
                wire={page.wire}>
                  {page.num}
              </BtnSum>
            )}
            <BtnRight src={right} onClick={handleBtnRightClick}/>
        </LimitPage>
      </PageBottom>
    </PageContent>
    ) : (
      <LoginNone to={'/admain'}>
        管理員登入
      </LoginNone>
    )}
   
  </Root>
 )
}
