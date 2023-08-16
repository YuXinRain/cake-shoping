import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { setDelete } from '../../../Redux/reducers/productReducer';
import { Between, Center } from '../../../styledCss';
import blackDelete from '../../../image/blackDelete.png'
import { useEffect, useState } from 'react';
import { postNewOrder } from '../../../WebAPI';

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
  box-shadow: 0px 1px 7px rgba(243, 171, 170, 0.5);
  width:80%;
`
const Content = styled.div`

`
const Title = styled.div`
  padding: 15px;
  padding-left: 30px;
  ${Between}
  background: #fdf2f2;
  border-bottom: 1px solid #f3abaa;
`
const TitleContext = styled.div`
  font-size: 24px;
  color: black;
`

const List = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  border-bottom: 1px solid #f3abaa;
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
  border-bottom: 1px solid #f3abaa;

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
  box-shadow: 0px 1px 7px rgba(243, 171, 170, 0.5);
`
const TextAll = styled.div`
  padding: 20px;
`
const Text = styled.div`
  margin-top: 20px;
  input {
    height: 40px;
    width: 100%;
    border: 1px  solid #f3abaa;
  }
`

const Total = styled.div`
  text-align: center;
  margin-left: 50px;
  width: 30%;
  box-shadow: 0px 1px 7px rgba(243, 171, 170, 0.5);
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
  background: #ffb8cf;
  padding: 5px;
  width: 80%;
`
const Li = styled.div``
const Err = styled.div`
  color: red;
`
export default function SoppingPage() {
  const soppingCard = useSelector((store) => store.products.soppingCard)
  const dispatch = useDispatch()
  const [ soppingprice, setSoppingprice ] = useState('')
  const fara = 60
  const user = useSelector((store) => store.users.user)
  const [ order, setOrder ] = useState('')
  const [ err, setError ] = useState('')
  console.log(err)
  const [productInfo, setProductInfo] = useState({
    userId: user && user.length > 0 ? user[0].id.toString() : '',
    userName: '',
    phone: '',
    address: '',
    email: '',
    totalPrice: 0,
    productList: [],
  });
  

  const handleDeleteClick = id => {
    dispatch(setDelete(id))
    const DataDele = productInfo.productList.filter(data => data.productId !== id)
    setProductInfo({
      ...productInfo,
      productList: DataDele
    })
    console.log('productInfo',productInfo.productList)
    if(productInfo.productList.length === 1){
      setProductInfo({
        ...productInfo,
        totalPrice: 0
      })
    }
  }
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
    if(productInfo){
      postNewOrder(productInfo).then(res => {
        if(res.ok === 0){
          if(res.message === 'token 驗證失敗'){
            setError('請先登入會員')
          }
        }
        if(res.ok === 1){
          setOrder(res)
        }
      })}}
  
  return (
    <Root>
      <SoppingPageAll>
        <Sopping>
          <Title>
            購物車
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
              結算
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
