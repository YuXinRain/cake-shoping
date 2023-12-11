import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Center } from '../../../styledCss';
import { getOrderId, PatchUser } from '../../../WebAPI';
import userEdit from '../../../image/userEdit.png';
import userEditIcon from '../../../image/userEditIcon.png';
import userLeft from '../../../image/user-left.png';
import userRight from '../../../image/user-right.png';
import { Link } from 'react-router-dom';
import { patchUserAll } from '../../../Redux/reducers/userReducer';

const Root = styled.div`
  margin: 100px 0px 30px 0px;
  ${Center}

`
const UserPage = styled.div`
  border: 1px solid black;
  width: 50%;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
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
  position: relative;
  @media (max-width: 768px) {
    padding: 20px;
  }
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
  width: auto;
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
  @media (max-width: 768px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
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
const UserNone = styled(Link)`
  letter-spacing: 2px;
  cursor: pointer;
  color: #775862;
  text-decoration: none;
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  padding: 10px;
  border-radius: 10px;
`
const Save = styled.div` 
  padding: 10px;
  border-radius: 10px;
  background: #e8ccb0;
  width: auto;
  text-align: center;
  position: absolute;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
`
const EditBtn = styled.div` 
  padding: 10px;
  border-radius: 10px;
  background: #e8ccb0;
  width: auto;
  text-align: center;
  position: absolute;
  right: 100px;
  bottom: 30px;
  cursor: pointer;
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


function MemberProfile({ editOpen, userAll, handleInputChange, handleSaveClick, handleSaveCloseClick }) {
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
          {editOpen ? (<input type='text' name="userName" value={userAll.userName} onChange={handleInputChange}/>) 
          : (
            <div>{userAll.userName}</div>
          )}
        </Sub>
        <Sub>Email:
          {editOpen ? (<input type='text' name="userEmail" value={userAll.userEmail} onChange={handleInputChange}/>) 
          : (
            <div>{userAll.userEmail}</div>
          )}
        </Sub>
        <Sub>電話號碼:
          {editOpen ? (<input type='text' name="userPhone" value={userAll.userPhone} onChange={handleInputChange}/>) 
          : (
            <div>{userAll.userPhone}</div>
          )}
        </Sub>
      </SubAll>
      <Save onClick={handleSaveClick}>儲存</Save>
      <EditBtn onClick={handleSaveCloseClick}>編輯</EditBtn>
    </ContentAll>
  )
}
export default function UserDataPage() {
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.users.user)
  const [ stateOpen, setStateOpen ] = useState(true)
  const [ editOpen, setEditOpen ] = useState(false)
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
        userName: userData[0].realName || '',
        userEmail: userData[0].email || '',
        userPhone: userData[0].phone || ''
      })
    )
  },[userData])
  useEffect(() => {
    userData && (
      getOrderId(userData[0].id.toString())
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
  const handleSaveClick = () => {
    dispatch(patchUserAll(userAll))
    setEditOpen(false)
  }
  const handleSaveCloseClick = () => {
    setEditOpen(true)
  }
  return (
    <Root>
      {userData && (
        <UserPage>
        <List>
          <Material onClick={handleOpenClick} stateOpen={stateOpen}>個人資料</Material>
          <OrderData onClick={handleCloseClick} stateOpen={stateOpen}>訂單</OrderData>
        </List>
        {stateOpen ? (<MemberProfile userAll={userAll} handleInputChange={handleInputChange} handleSaveClick={handleSaveClick} handleSaveCloseClick={handleSaveCloseClick} editOpen={editOpen}/>
        ) : (
          pagings && <Order 
            pagings={pagings}
            handleBtnLeftClick={handleBtnLeftClick}
            handleBtnRightClick={handleBtnRightClick}
            handleBtnClick={handleBtnClick}
            pages={pages}/>
        )}
      </UserPage>
      )}
      {userData === null && (
        <UserNone  to={'/login'}>
          尚未登入
        </UserNone>
      )}
    </Root>
  );
}
