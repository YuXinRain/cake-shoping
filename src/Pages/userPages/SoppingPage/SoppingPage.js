import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { setDelete, setLodding } from '../../../Redux/reducers/productReducer';
import { Between, Center } from '../../../styledCss';
import blackDelete from '../../../image/blackDelete.png'
import { useEffect, useState } from 'react';
import { postNewOrder } from '../../../WebAPI';
import lodding from '../../../image/cat.png';
import { useNavigate } from 'react-router-dom';

const size = css`
  width: 100px;
  height: 100px;
`
const Root = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  display: block;

` 
const SoppingPageAll = styled.div`
  width: 100%;
  height: 100%;
  ${Center}

`
const Sopping = styled.div`
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
  width:80%;
`
const Content = styled.div`

`
const Title = styled.div`
  padding: 15px;
  padding-left: 30px;
  ${Between}
  background: #faf1eb;
  border-bottom: 1px solid #a28876;
`
const TitleContext = styled.div`
  font-size: 24px;
  color: black;
`

const List = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  border-bottom: 1px solid #a28876;
`
const Nav = styled.div`
  width: 100px;
  text-align: center;
`
const Tent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #a28876;

`
const Img = styled.img`
  width: 100px;
  height: 100px;
`
const Price = styled.div`
  ${size}
  ${Center}

`
const Amount = styled.div`
  ${size}
  ${Center}

`
const Subtotal = styled.div`
  ${size}
  ${Center}

`
const Delete = styled.div`
  ${size}
  ${Center}
`
const DeleteBut = styled.img`
  width:30px;
  height: 30px;
  cursor: pointer;
`
const OrderAll = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  width: 80%;
  height: 100%;
`
const Order = styled.div`
  width:80%;
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
`
const TextAll = styled.div`
  padding: 20px;
`
const Text = styled.div`
  margin-top: 20px;
  input {
    height: 40px;
    width: 100%;
    border: 1px  solid #a28876;
  }
`

const Total = styled.div`
  text-align: center;
  margin-left: 50px;
  width: 30%;
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
`
const SoppingBottom = styled.div`
  width:100%;
  height: 100%;
  ${Center}
`
const StyleTotal = styled.div`  
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
`

const PriceTotal = styled.div`
  text-align: left;
  border-top: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  margin-bottom: 10px;
`
const TextName = styled.div`
  margin: 15px;
`

const PriceButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 10px;
  background: #e8ccb0;
  padding: 5px;
  width: 80%;
`
const Li = styled.div``
const Err = styled.div`
  color: red;
`
const OrderOk = styled.div`
  margin-top: 64px;
  ${Center}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`
const OrderContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  text-align: center;
  background: #FAFAFA;
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
  border-radius: 10px;
  padding: 10px;
`
const OrderStatus = styled.div`
  margin-top: 10px;
  padding: 10px;
`
const OrderDelete = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`
const Lodding = styled.div`
  font-size: 42px;
  background: #faf1eb;
  ${Center};
  position: absolute;
  width: 100%;
  height: 100%;
  color: #a28876;
  z-index: 999;
  top: 0;
  left: 0;
  margin-top: 100px;
`
const LoddingImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
  margin-right: 5px;
`
const OrderContext = styled.div``
export default function SoppingPage() {
  const soppingCard = useSelector((store) => store.products.soppingCard)
  const dispatch = useDispatch()
  const [ soppingprice, setSoppingprice ] = useState('')
  const fara = 60
  const user = useSelector((store) => store.users.user)
  const [ order, setOrder ] = useState('')
  const [ err, setError ] = useState('')
  const [productInfo, setProductInfo] = useState({
    userId: user && user.length > 0 ? user[0].id.toString() : '',
    userName: '',
    phone: '',
    address: '',
    email: '',
    totalPrice: 0,
    productList: [],
  });
  const isLodding = useSelector((store) => store.products.isLodding)
  const navigate = useNavigate()

  const handleDeleteClick = id => {
    dispatch(setDelete(id))
    const DataDele = productInfo.productList.filter(data => data.productId !== id)
    setProductInfo({
      ...productInfo,
      productList: DataDele
    })
    if(productInfo.productList.length === 1){
      setProductInfo({
        ...productInfo,
        totalPrice: 0
      })
    }
  }
  useEffect(() => {
    if(order === ''){
      dispatch(setLodding(false))
    }
  },[order,dispatch])
  useEffect(() => {
    const foundItem = soppingCard.map((post) => {
      return {
        count: post.count,
        productId: post.cardUrl.productid,
        unitPrice: post.card[0].price,
      }
    });
    setProductInfo({
      ...productInfo,
      productList: foundItem || '',
    })
  }, [soppingCard])
  
  useEffect(()=> {
    const calculateSoppingprice = () => {
      let total = 0
      soppingCard.forEach((price) => {
        total += price.card[0].price * price.count
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          totalPrice: total,
        }));
      })
      const fareTotal = total + fara
      setSoppingprice(fareTotal)
    }

    calculateSoppingprice();
  }, [soppingCard, soppingprice, fara])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  const handlePriceClick = () => {
    dispatch(setLodding(true))
    if(productInfo){
      postNewOrder(productInfo).then(res => {
        if(res.ok === 0){
          if(res.message === 'token 驗證失敗'){
            setError('請先登入會員')
            dispatch(setLodding(false))
          }
        }
        if(res.ok === 1){
          setOrder(res)
          dispatch(setLodding(false))
        }
      })}
    if(order === ''){
      dispatch(setLodding(false))
    }
  }

  const handleOrderCloseClick = () => {
    setOrder('')
    navigate('/commodity')
  }
  return (
    <Root>
      {isLodding && (
        <Lodding>
          <LoddingImg src={lodding} />
          Lodding
        </Lodding>)}
      <SoppingPageAll>
      { order && (
      <OrderOk>
        <OrderContent>
          <OrderStatus>{order.ok === 1 ? "訂購成功" : "訂購失敗"}</OrderStatus>
          <OrderContext>訂單編號：{order.orderId}</OrderContext>
          <OrderDelete onClick={handleOrderCloseClick}>X</OrderDelete>
        </OrderContent>
      </OrderOk>)}
        <Sopping>
          <Title>
          <TitleContext>購物車</TitleContext>
          </Title>
          <List>
            <Nav>商品資訊</Nav>
            <Nav>價格</Nav>
            <Nav>數量</Nav>
            <Nav>小計</Nav>
            <Nav>刪除</Nav>
          </List>
          <Content>
            {soppingCard.map(data => 
            <Tent key={data.card[0].id}>
              <Img src={data.cardUrl.url}></Img>
              <Price>{data.card[0].price}</Price>
              <Amount>{data.count}</Amount>
              <Subtotal>{data.card[0].price * data.count}</Subtotal>
              <Delete>
                <DeleteBut onClick={() => handleDeleteClick(data.card[0].id)} src={blackDelete} />
              </Delete>
            </Tent>)}
          </Content>
        </Sopping>
      </SoppingPageAll>
      <SoppingBottom>
        <OrderAll>
          <Order>
            <Title>
              <TitleContext>訂購資訊</TitleContext>
              {err && (<Err>{err}</Err>)}
            </Title>
            <TextAll>
              <Text>
                <input type="text" placeholder="訂購者姓名" name="userName" value={productInfo.userName} onChange={handleInputChange}/>
              </Text>
              <Text>
                <input type="number" placeholder="電話" name="phone" value={productInfo.phone} onChange={handleInputChange}/>
              </Text>
              <Text>
                <input type="text" placeholder="地址" name="address" value={productInfo.address} onChange={handleInputChange}/>
              </Text>
              <Text>
                <input type="email" placeholder="Email" name="email" value={productInfo.email} onChange={handleInputChange}/>
              </Text>
            </TextAll>
          </Order>
          <Total>
            <Title>
              <TitleContext>結算</TitleContext>
            </Title>
            <TextName>
              <StyleTotal>
                <Li>小計</Li>
                <Li name="totalPrice" onChange={handleInputChange}>{productInfo.totalPrice}</Li>
              </StyleTotal>
              <StyleTotal>
                <Li>運費</Li>
                <Li>{fara}</Li>
              </StyleTotal>
              <PriceTotal >
                <Li>總計</Li>
                <Li onChange={handleInputChange} >{soppingprice}</Li>
              </PriceTotal>
              <PriceButton onClick={handlePriceClick}>結帳</PriceButton>
            </TextName> 
          </Total>
        </OrderAll>
      </SoppingBottom>
    </Root>
  );
}
