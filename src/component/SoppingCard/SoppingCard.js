import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setClickSopping, setDelete } from '../../Redux/reducers/productReducer';
import dele from '../../image/delete.png'
import { Center } from '../../styledCss';
import { Link } from 'react-router-dom';

const Root = styled.div`

` 
const RootCard = styled.div`
  margin-top: 5px;
  & + & {
    margin-top: 20px;
  }
`
const SoppingAll = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`
const SoppingCards = styled.div`
  overflow-y:scroll;

  ::-webkit-scrollbar-thumb{
    background:  #ffc5dc;
  }
  ::-webkit-scrollbar{
    width: 3px;
  }
  width: 300px;
  background: #3b3b3b;
  height: 100%;
  color: white;
`
const SoppingRight = styled.div`
  width: 100%;
`
const ProductName = styled.div`
  color: white;
`
const CardLeft = styled.div``
const CardRight = styled.div`
  padding-left: 15px;
  position: relative;
  height: 100px;
`
const Image = styled.img`
  width: 100px;
  height: 100px;
`
const Price = styled.div`
  margin-top: 5px;
`
const Count = styled.div`
  position: absolute;
  bottom: 5px;

`
const CardTotal = styled.div`
  border-bottom: 1.5px solid white;
  width: 100%;
  height: 100px;
  display: flex;
  padding-bottom: 15px;
`
const Delete = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0px;
  bottom: 5px;
  background: none;
  cursor: pointer;
`
const NoMore = styled.div``
const CardTitle = styled.div`
  padding: 20px;
  font-size: 20px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.5);
`
const CardContent = styled.div`
  padding: 15px;
`
const Checkout = styled(Link)`
  margin-top: 20px;
  ${Center}
  cursor: pointer;
  border: 1px solid white;
  border-radius: 10px;
  margin: 15px;
  text-decoration: none;
`
const Order = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  margin:5px;
  color: white;
  cursor: pointer;
  border: none;
  
`
function SoppingTotal({ soppingCard, handleDeleteClick, handleBuyClick }){
  const id = soppingCard.card[0].id
  return (
    <RootCard key={id}>
      <CardTotal>
        <CardLeft>
          <Image src={soppingCard.cardUrl.url}></Image>
        </CardLeft>
        <CardRight>
          <ProductName>{soppingCard.card[0].productName}</ProductName>
          <Price>NT${soppingCard.card[0].price}</Price>
          <Count>x {soppingCard.count}</Count>
          <Delete src={dele} onClick={() => handleDeleteClick(id)}/> 
        </CardRight>
      </CardTotal>
    </RootCard>
    
  )
}

function SoppingModal({ handleBuyClick, soppingCard, handleDeleteClick }){
  return(
  <SoppingAll>
    <SoppingCards>
      <CardTitle>購物車</CardTitle>
      <CardContent>
        {soppingCard.length === 0 && <NoMore>請挑選商品</NoMore>}
        {soppingCard.map((card) => <SoppingTotal key={card.card[0].id} soppingCard={card} handleDeleteClick={handleDeleteClick} />)}
      </CardContent>
      {soppingCard.length !== 0 && 
      <Checkout to="/sopping" onClick={handleBuyClick}>
        <Order>
          訂單結帳
        </Order>
      </Checkout>}
    </SoppingCards>
    <SoppingRight onClick={handleBuyClick}/>
  </SoppingAll>
  )
}
export default function SoppingCard() {
  const clickSopping = useSelector((store) => store.products.clickSopping)
  const dispatch = useDispatch()
  const soppingCard = useSelector((store) => store.products.soppingCard)

  const handleDeleteClick = id => {
    dispatch(setDelete(id))
  }
  const handleBuyClick = () => {
    dispatch(setClickSopping(false))
  }

  return (
    <Root>
      { clickSopping && (
        <SoppingModal handleBuyClick={handleBuyClick}
        soppingCard={soppingCard}
        handleDeleteClick={handleDeleteClick} />)}
    </Root>
    
  )
}
