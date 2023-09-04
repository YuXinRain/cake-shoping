import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Center } from '../../../styledCss';
import { getOrderId } from '../../../WebAPI';
import userEdit from '../../../image/userEdit.png';
import userEditIcon from '../../../image/userEditIcon.png';
import userLeft from '../../../image/user-left.png';
import userRight from '../../../image/user-right.png';

const Root = styled.div`
  margin: 100px 0px 30px 0px;
  ${Center}

`
const UserPage = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 800px;
  border-radius: 10px;
`
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;
`
const Material = styled.div`
  cursor: pointer;
  ${({ stateOpen }) => stateOpen  === false && 'border-bottom: 1px solid grey'};
  width: 50%;
  ${Center}
  border-right: 1px solid black;
  height: 100%;
`
const OrderData = styled.div`
  cursor: pointer;
  ${({ stateOpen }) => stateOpen && 'border-bottom: 1px solid grey'};
  width: 50%;
  ${Center}
  height: 100%;

`
const ContentAll = styled.div`
  padding: 50px 100px;
  letter-spacing: 2px;

`
const TitleName = styled.div`
  margin: 20px 0px;
  font-size: 24px;
  display: flex;
  align-items: center;
`
const Grade = styled.div`
  padding: 5px;
  border-radius: 20px;
  background: #e8ccb0;
  width: 70px;
  font-size: 14px;
  margin-left: 10px;
  ${Center}
`
const Edit = styled.div`
  margin-top: 50px;
  color: grey;
`
const Sub = styled.div`
  margin-top: 50px;
  width: 100px;
  input{
    height: 30px;
    font-size: 16px;
    width: 200px;
    margin-top: 10px;
  }
`
const SubAll = styled.div`
  margin-left: 30px;
  color: grey;
`
const ImgPhoto = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`
const OrderAll = styled.div`
  ${Center}
`
const OrderCenter = styled.div`
  margin-top: 30px;
  width: 90%;
`
const OrderBorder = styled.div`
  border: 1px solid black;
  border-bottom: none;
`
const OrderTitle = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`
const ConAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid black;
`
const Con = styled.div`
  width: 30%;
  text-align: center;
  margin: 10px;
`
const Text = styled.div`
  width: 30%;
  text-align: center;
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
  padding: 5px;
`
const BtnLeft = styled.img`
  width: 25px;
  height: 25px;
  padding: 7px;
  cursor: pointer;
`
const BtnRight = styled.img`
  width: 25px;
  height: 25px;
  padding: 7px;
  cursor: pointer;
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
function Order({ pagings, handleBtnRightClick, handleBtnLeftClick, handleBtnClick, pages }) {
  return(
    <OrderAll key={pagings.userId}>
      <OrderCenter>
        <OrderBorder>
          <OrderTitle>
            <Text>訂單編號</Text>
            <Text>合計</Text>
            <Text>訂單狀態</Text>
          </OrderTitle>
          {pagings.map(page => 
          <ConAll>
            <Con>{page.orderid}</Con>
            <Con>{page.totalPrice}</Con>
            <Con>{page.status === 0 ? '未完成' : '已完成'}</Con>
          </ConAll>)}
        </OrderBorder>
        <PageBottom>
          <LimitPage>
            <BtnLeft src={userLeft} onClick={handleBtnLeftClick}/>
            {pages && pages.map(page => 
              <BtnSum 
                key={page.num}
                onClick={() => handleBtnClick(page.num)}
                wire={page.wire}>
                  {page.num}
              </BtnSum>
            )}
            <BtnRight src={userRight} onClick={handleBtnRightClick}/>
          </LimitPage>
        </PageBottom>
      </OrderCenter>
    </OrderAll>
  )
}


function MemberProfile({ userAll, handleInputChange }) {
  return(
    <ContentAll>
      <TitleName>
        <ImgPhoto src={userEdit} />
        {userAll.userName}
        <Grade>一般會員</Grade>
      </TitleName>
      <Edit>
        <ImgPhoto src={userEditIcon} />
        編輯會員資料
      </Edit>
      <SubAll>
        <Sub>姓名:
          <input type='text' name="userName" value={userAll.userName} onChange={handleInputChange}/>
        </Sub>
        <Sub>Email:
          <input type='email' name="userEmail" value={userAll.userEmail} onChange={handleInputChange}/>
        </Sub>
        <Sub>電話號碼:
          <input type='text' name="userPhone" value={userAll.userPhone} onChange={handleInputChange}/>
        </Sub>
      </SubAll>
    </ContentAll>
  )
}
export default function UserDataPage() {
  // const dispatch = useDispatch()
  const userData = useSelector((store) => store.users.user[0])
  const [ stateOpen, setStateOpen ] = useState(true)
  const [ userAll, setUserAll ] = useState({
    userName: " ",
    userEmail: " ",
    userPhone: " "
  })
  const [ userOrder, setUserOrder ] = useState('')
  const [ pagings, setPagings ] = useState('')
  const [ pages, setPages ] = useState('')
  const totalOrder = Math.ceil(userOrder.length / 10);
  const userOrderAll = Array.from({ length: totalOrder }, (_, index) => ({ num: index + 1, wire: 1 }));
  console.log('stateOpen', stateOpen)
  const paging = (sum, page) => {
    const startIndex = (page - 1) * sum;
    const endIndex = startIndex + sum;
    if(userOrder){
      const paginatedData = userOrder.slice(startIndex, endIndex);
      setPagings(paginatedData)
    }
  }

  const handleOpenClick = () => {userData && setStateOpen(true)}
  const handleCloseClick = () => {setStateOpen(false)}

  useEffect(() => {
    userData && (
      setUserAll({
        userName: userData.realName || '',
        userEmail: userData.email || '',
        userPhone: userData.phone || ''
      })
    )
  },[userData])
  useEffect(() => {
    userData && (
      getOrderId(userData.id.toString())
        .then(res => setUserOrder(res.result)))
  },[userData])
  
  useEffect(() => {
    if(userOrder){
      const updatedPages = userOrderAll.map(data => {
        if (data.num === 1) {
          return { ...data, wire: 0 };
        } else {
          return { ...data, wire: 1 };
        }
      });
      setPages(updatedPages)
      console.log(pages)
      paging(9, 1) 
    }
  },[userOrder])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAll((user) => ({
      ...user,
      [name]: value,
    }));
  }


  const handleBtnLeftClick = () => {
    const clickLeft = pages.filter(btn => btn.wire === 0)
    if(clickLeft[0].num === 1){
      return paging(9, 1)
    }else{
      const updatedData = pages.map(page => {
        if (page.num === clickLeft[0].num - 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(9, clickLeft[0].num - 1)
    }
    window.scrollTo(0, 0);
  }

  const handleBtnRightClick = () => {
    const clickLeft = pages.filter(btn => btn.wire === 0)
    if(userOrder){
      if(clickLeft[0].num === totalOrder){
        return paging(9, clickLeft[0].num)
      }else{
        const updatedData = pages.map(page => {
        if (page.num === clickLeft[0].num + 1) {
          return { ...page, wire: 0 };
        } else {
          return { ...page, wire: 1 };
        }
      })
      setPages(updatedData)
      paging(9, clickLeft[0].num + 1)
    }
    }
    window.scrollTo(0, 0);
  }

  const handleBtnClick = (id) => {
    if(userOrder){
      const updatedPages = userOrderAll.map((pageInfo, index) => {
        if (index === id - 1) { 
          return { ...pageInfo, wire: 0 };
        } else {
          return pageInfo;
        }
      });
      setPages(updatedPages)
      paging(9, id)
    }
  }
  return (
    <Root>
      <UserPage>
        <List>
          <Material onClick={handleOpenClick} stateOpen={stateOpen}>個人資料</Material>
          <OrderData onClick={handleCloseClick} stateOpen={stateOpen}>訂單</OrderData>
        </List>
        {stateOpen ? (<MemberProfile userAll={userAll} handleInputChange={handleInputChange}/>
        ) : (
          pagings && <Order 
            pagings={pagings}
            handleBtnLeftClick={handleBtnLeftClick}
            handleBtnRightClick={handleBtnRightClick}
            handleBtnClick={handleBtnClick}
            pages={pages}/>
        )}
      </UserPage>
    </Root>
  );
}
