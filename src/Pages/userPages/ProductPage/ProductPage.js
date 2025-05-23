import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCard, getCensorCard, getSoppingCard, setCards, setLodding } from '../../../Redux/reducers/productReducer';
import { Button, Center } from '../../../styledCss';
import lodding from '../../../image/cat.png';

const Root = styled.div`
  position: relative;
  margin-top: 140px;
  ${Center}
  margin-bottom: 50px;
` 

const CardAll = styled.div`
  width: 1000px;
  padding: 20px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: left;
  @media (max-width: 768px) {
    display: block;
    margin-top: 10px;
    height: auto;
  }
`
const Title = styled.div`
  font-family: serif;
  font-size: 36px;
`
const CardContextLeft = styled.div`
  width: auto;
  padding: 20px;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`
const CardImage = styled.img`
  border-radius: 10px;
  width:100%;
  height: 100%;
  
`
const CardContextRight = styled.div`
  width: auto;
  height: 100%;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const CardDescription = styled.pre`
  color: #8a8a8a;
  margin: 5px;
`
const CardPrice = styled.div`
  margin-top: 30px;
  font-size: 20px;
  color: #ff6698;
  position: absolute;
  bottom: 110px;
  @media (max-width: 768px) {
    position: initial;
    margin-top: 20px;
  }
`
const CardSell = styled.div`
  font-size: 14px;
  margin-left: 10px;
  width: max-content;
  color: #8a8a8a;
`
const Sopping = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: end;
  @media (max-width: 768px) {
    position: initial;
  }
`
const SoppingButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  background:  #e8ccb0;
  border-radius: 10px;
  letter-spacing:3px;
  font-size: 18px;
  :hover{
    color: white;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`
const MarkAll = styled.div`

`

const Amount = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: space-evenly;
  border-radius: 10px; 
  position: absolute;
  bottom: 70px;
  width: 230px;
  @media (max-width: 768px) {
    position: initial;
    width: 200px;
  }
`

const AmountAdd = styled.button`
  ${Button}
`
const AmountReduce = styled.button`
  padding: 0px 10px;
  ${Button}
`
const AmountCount = styled.div`
  input{
    font-size: 16px;
    width: 100%;
    height: 100%;
    border: none;
    border-left: 1.5px solid #383838;
    border-right: 1.5px solid #383838;
    padding-left: 10px;
  }
`
const Lodding = styled.div`
  font-size: 42px;
  background: #faf1eb;
  ${Center};
  position: fixed;
  width: 100%;
  height: 100%;
  color: #a28876;
  z-index: 777;
  top: 0;
  left: 0;
`
const LoddingImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
  margin-right: 5px;
`
export default function ProductPage() {
  const { id } = useParams();
  const card = useSelector((store) => store.products.card.result)
  const cardUrl = useSelector((store) => store.products.card.photoUrl)
  const dispatch = useDispatch()
  const [ count, setCount ] = useState(1)
  const soppingCard = useSelector((store) => store.products.soppingCard)
  const navigate = useNavigate()
  const isLodding = useSelector((store) => store.products.isLodding)

  const handleIncrement = () => {
    setCount(prevValue => {
      const newValue = parseInt(prevValue, 10) + 1;
    return newValue.toString()
  });
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    } 
  };

  const handleInputChange = (event) => {
    setCount(event.target.value);
  };

  const handleJoinClick = () => {
    dispatch(setLodding(true))
    const newData = {count, card, cardUrl}
    const data = [...soppingCard, newData]
    const previous = [...soppingCard]
    if(soppingCard.length === 0){
      dispatch(getSoppingCard(data, newData))
    }
    if(soppingCard.length !== 0){
      dispatch(getCensorCard(previous, newData, data))
    }
    setCount(1)
    dispatch(setCards(''))
    navigate('/commodity')
    dispatch(setLodding(false))
  }
  useEffect(()=> {
    dispatch(getCard(id))
    window.scrollTo(0, 0);
  },[dispatch, id]) 

  useEffect(() => {
    if(card === undefined){
      dispatch(setLodding(true))
    }else{
      dispatch(setLodding(false))
    }
  },[dispatch, card])
  return (
    <Root>
      {isLodding && (
        <Lodding>
          <LoddingImg src={lodding} />
          Lodding
        </Lodding>)}
      <CardAll>
        <CardContextLeft>
          <CardImage src={cardUrl && cardUrl.url} />
        </CardContextLeft>
        <CardContextRight>
          <Title>{card && card[0].productName}</Title>
          <CardDescription>{card && card[0].articlel}</CardDescription>
          <MarkAll>
            <CardPrice>NT$ {card && card[0].price}</CardPrice>
            <Amount>
              <AmountReduce onClick={handleDecrement}> - </AmountReduce> 
              <AmountCount>
                <input type="text" value={count} onChange={handleInputChange}/>
              </AmountCount>
              <AmountAdd onClick={handleIncrement}> + </AmountAdd>
            </Amount>
            <Sopping>
              <SoppingButton onClick={handleJoinClick}>加入購物車</SoppingButton>
              <CardSell>已賣出：{card && card[0].sell}</CardSell>
            </Sopping>
          </MarkAll>
          
        </CardContextRight>
      </CardAll>
      
    </Root>
  );
}