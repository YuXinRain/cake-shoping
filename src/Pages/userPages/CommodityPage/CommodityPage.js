import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LeaveHover, setProduct, EnterHover, getCount, getSoppingCard, getCensorCard, getCard, setCards } from '../../../Redux/reducers/productReducer';
import { Button, Center } from '../../../styledCss';
import lodding from '../../../image/cat.png';
import cakePhoto from '../../../image/cakePhoto.jpeg';
import sweets from '../../../image/sweets.png';

const Root = styled.div`
  text-align: center;
  margin-bottom: 50px;

`
const PostCenter = styled.div`
  display: inline-block;
  height: 100%;
`

const Product = styled.div`
  width: 300px;
  height: 300px;
  margin: 70px 50px 0;;
  ${Center}
  position: relative;
`

const ProductName = styled.div`
  text-align: center;
  margin-top: 10px;
`
const ProductPrice = styled.div`
  text-align: center;
`

const PhotoUrl = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`
const HoverAll = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  border: 1px solid black;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const HoverText = styled.button`
  letter-spacing:3px;
  background-color: transparent;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
`

const SoppingCardAll = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {  
    margin-top: 40px;
  }
  @media (max-width: 380px) {  
    margin-top: 35px;
  }
`
const TurnOff = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  background: #e8ccb0;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  `
const CardAll = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 600px;
  background: white;
  padding: 30px;
  position: relative;
  @media (max-width: 768px) {
    width: auto;
    display: block;
    margin: 0px;
    padding: 60px 30px 30px;
  }
  @media (max-width: 380px) {  
    padding: 50px 30px 0px;
    height: 80%;
  }
`
const CarImage = styled.img`
  width: 300px;
  height: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const CarConext = styled.div`
  margin-top: 10px;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  color: #383838;
`
const CarText = styled.div``
const CarPrice = styled.div`
  margin-top: 20px;
  text-align: left;
  @media (max-width: 380px) {
    margin-top: 5px;
  }
`
const AmountAll = styled.div`
  margin-top: 60px;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
  @media (max-width: 380px) {
    margin-top: 10px;
  }
`
const Amount = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: space-evenly;
  border-radius: 10px; 
  margin-top: 10px;
`
const AmountButton = styled.div`
  text-align: left;
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
    width: 90%;
    height: 30px;
    border: none;
    border-left: 1.5px solid #383838;
    border-right: 1.5px solid #383838;
    padding-left: 10px;
  }
`
const AmountJoin =  styled.button`
  margin-top: 20px;
  font-size: 24px;
  width: 240px;
  height: 60px;
  background: #e8ccb0;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  border-radius: 10px;
  :hover{
    color: #383838;
  }
  @media (max-width: 768px) {  
    width: 100%;
  }
  @media (max-width: 380px) {  
    margin-top: 10px;
    width: 100%;
    height: 50px;
    font-size: 22px;
  }  
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
const ProductWrapper = styled.div``
const CoverPhoto = styled.img`
  width: 1100px;
  height: 300px;
  margin-top: 100px;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 1px 7px rgba(162, 132, 118, 0.7);
  @media (max-width: 768px) {
    width: auto;
  }
`
const CoverPhotoAll = styled.div`
  ${Center};
  width: auto;
  object-fit: cover;
`
const ProductAll = styled.div`
`
const AllProducts = styled.div`
  text-align: left;
  font-size: 20px;
  border-bottom: 1.5px solid #a28876;
  margin: 30px 160px 0px;
  padding-bottom: 10px;
  letter-spacing: 2px;
  color: #a28876;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: max-content;
    margin: 30px auto 0px;
  }
`
const ImgPhoto = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`
const Text = styled.div``
function SoppingCard({ handleCloseModal, cards, cardUrl, count, handleIncrement, handleDecrement, handleInputChange, handleJoinClick }){
  const id = cards[0].id
  return(
    <SoppingCardAll key={id}> 
      <CardAll>
        <CarImage src={cardUrl.url}></CarImage>
        <CarConext>
          <Title>{cards[0].productName}</Title>
          <CarText>
            <CarPrice>NT${cards[0].price}</CarPrice>
            <AmountAll>
              <AmountButton>
              數量：
                <Amount>
                  <AmountReduce onClick={handleDecrement}> - </AmountReduce> 
                  <AmountCount>
                    <input type="text" value={count} onChange={handleInputChange}/>
                  </AmountCount>
                  <AmountAdd onClick={handleIncrement}> + </AmountAdd>
                </Amount>
                <AmountJoin onClick={handleJoinClick}>加入購物車</AmountJoin>
              </AmountButton>  
            </AmountAll>
          </CarText>
        </CarConext>
        <TurnOff onClick={handleCloseModal}>
          X
        </TurnOff>
      </CardAll>
    </SoppingCardAll>
  )
}
function Hover({ handleOpenModal, id }){
  return(
    <HoverAll onClick={()=>handleOpenModal(id)}>
      <HoverText>
        加入購物車
      </HoverText>
    </HoverAll>
  )
}
export default function CommodityPage() {
  const { id } = useParams();
  const posts = useSelector((store) => store.products.posts)
  const [ count, setCount ] = useState(1)
  const dispatch = useDispatch()
  const card = useSelector((store) => store.products.card.result)
  const cardUrl = useSelector((store) => store.products.card.photoUrl)
  const soppingCard = useSelector((store) => store.products.soppingCard)
  const navigate = useNavigate()
  const isLodding = useSelector((store) => store.products.isLodding)

  useEffect(()=> {
    dispatch(setProduct())
    window.scrollTo(0, 0);
  }, [dispatch, id])


  useEffect(()=> {
    dispatch(setCards(''))
  },[dispatch])

  const handleIncrement = () => {
    setCount(prevValue => {
      const newValue = parseInt(prevValue, 10) + 1;
    return newValue.toString()
  })
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    } 
  };

  const handleMouseEnter = (id) => {
    dispatch(EnterHover(id))
};

  const handleMouseLeave = (id) => {
    dispatch(LeaveHover(id))

};

  const handleInputChange = (event) => {
    setCount(event.target.value);
  };

  const handleOpenModal = (id) => {
    dispatch(getCard(id))
  };

  const handleCloseModal = () => {
    dispatch(setCards(''))
  };

  const handleJoinClick = () => {
    dispatch(setCards(''))
    setCount(1)
    dispatch(getCount(count))
    const newData = {count, card, cardUrl}
    const data = [...soppingCard, newData]
    const previous = [...soppingCard]
    if(soppingCard.length === 0){
      dispatch(getSoppingCard(data, newData))
    }
    if(soppingCard.length !== 0){
      dispatch(getCensorCard(previous, newData, data))
    }
    navigate('/commodity')
  }


  return (
    <Root>
      {isLodding && (
        <Lodding>
          <LoddingImg src={lodding} />
          Lodding
        </Lodding>)}
        <CoverPhotoAll>
          <CoverPhoto src={cakePhoto}/>
        </CoverPhotoAll>
        <AllProducts>
          <ImgPhoto src={sweets} />
          <Text>全部商品</Text>
        </AllProducts>
        <ProductAll>
          {posts.map((post) => 
      <PostCenter key={post.id} >
        <ProductWrapper>
          <Product onMouseEnter={()=>handleMouseEnter(post.id)}
            onMouseLeave={()=>handleMouseLeave(post.id)}>
            { post.isHover && <Hover handleOpenModal={handleOpenModal} id={post.id}/>}
            <Link to={`/product/${post.id}`}>
              <PhotoUrl src={post.photoUrl} />
            </Link>
          </Product>
        </ProductWrapper>
        <ProductName>{post.productName}</ProductName>
        <ProductPrice>${post.price}</ProductPrice>
      </PostCenter>
      )}
        </ProductAll>
      
      { card && (<SoppingCard 
        handleCloseModal={handleCloseModal}
        cards={card}
        cardUrl={cardUrl}
        count={count}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement} 
        handleInputChange={handleInputChange} 
        handleJoinClick={handleJoinClick}/>)}
    </Root>
  );
}
