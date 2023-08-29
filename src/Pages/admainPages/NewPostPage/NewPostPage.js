import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProduct, newProduct, setError, setNewPost, setNewProduct } from '../../../Redux/reducers/admainReducer';
import { Center } from '../../../styledCss';
import { getPosts } from '../../../WebAPI';

const Root = styled.div`
  margin-top: 150px;
  ${Center}
  margin-bottom: 50px;
`
const Article = styled.div`
  margin-top: 30px;
  font-size: 18px;
  display: flex;
  textarea{
    width: 90%;
    height: 100px;
    margin-left: 10px;
    border: none;
    background: rgb(231, 225, 227);
    border-radius: 5px;
  }
`
const NavName = styled.div`
  font-size: 18px;
  width: 100%;
  margin-top: 30px;
  input{
    height: 30px;
    margin-left: 10px;
    width: 90%;
    border: none;
    background: #e7e1e3;
    border-radius: 5px;
  }
`
const IsShow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 30px;
  font-size: 18px;

`
const Title = styled.div`
  padding: 20px;
  font-size: 20px;
  background-color: #775862;
  color: white;
  letter-spacing:5px;
`
const Content = styled.div`
  padding: 20px;
  ${Center}

`
const ContentAll = styled.div`
  box-shadow: 0px 1px 7px rgba(119, 88, 98, 0.5);
  width:50%;
`
const Nav = styled.div`
  font-size: 18px;
  width: 100%;
  input{
    text-align: center;
    height: 30px;
    margin-left: 10px;
    width: 80%;
    border: none;
    background: #e7e1e3;
    border-radius: 5px;
  }
`
const ButtonStyle = styled.div`
  width: 55px;
  height: 25px;
  padding: 3px;
  display: flex;
  background: #d0c4c8;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  ${({ isShow }) => isShow === 1 && `
    background: #5f9ea0;
    // animation: scrollRight 5s linear infinite;  
  `}
`

const OpenButton = styled.div`
  width: 50%;
  height: 25px;
  border-radius: 3px;
  background: white;
  ${({ isShow }) => isShow === 1 && `
    transform: translateX(100%);
  `}
`
const StoreAll = styled.div`
  ${Center}
`
const Store = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  border: none;
  background: none;
`
const StoreBtn = styled.button`
  ${Center}
  width: 80px;
  height: 40px;
  background: #775862;
  border-radius: 5px;
  color: white;
  letter-spacing:5px;
  font-size: 16px;
  cursor: pointer;
`
const Select = styled.select`
  margin-left: 10px;
  width: 80%;
  height: 30px;
  border: none;
  background: #e7e1e3;
  border-radius: 5px;
  text-align: center;

`
const Option = styled.option``
const SelectAll = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const NavType = styled.div`
  font-size: 18px;
  width: 100%;
`
const NavPrice = styled.div`
  font-size: 18px;
  width: 100%;
  input{
    text-align: center;
    height: 30px;
    margin-left: 10px;
    width: 80%;
    border: none;
    background: #e7e1e3;
    border-radius: 5px;
  }
`
const FromAll = styled.form`
  width: 90%;
  position: relative;
`
const PhotoAll = styled.div`
  box-shadow: 0px 0px 5px rgba(119, 88, 98, 0.5);
  height: 120px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
`
const NewPhoto = styled.div`
  height: 100px;
  width: 100px;
  border: 1px dashed #e7e1e3;
  margin-left: 15px;
  ${Center}
  color: #775862;
  position: relative;
  overflow: hidden;
  input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
const PhotoContent = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
  margin-left: 15px;
`

const Photos = styled.img`
  height: 100px;
  width: 100px;
  border: 1px dashed #e7e1e3;
  ${Center}
`

const PhotoDelete = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background: gray;
  border-radius: 100%;
  color: white;
  ${Center};
  cursor: pointer;
`
const StopNew = styled.div`
  ${Center};
  position: absolute;
  color: red;
  top: 125px;
  right: 5px;
`
const Err = styled.div`
  color: red;
`
function Photo({ index, photo, handleDeleClick }){
  return(
    <PhotoContent key={index}>
      <Photos src={URL.createObjectURL(photo)}/>
      <PhotoDelete onClick={() => handleDeleClick(index)}>x</PhotoDelete>
    </PhotoContent>
  )
}
export default function NewPostPage() {
  const [ isShow, setIsShow ] = useState(0)
  const [ productName, setProductName ] = useState('')
  const [ price, setprice ] = useState('')
  const [ storage, setStorage ] = useState('')
  const [ sell, setSell ] = useState('')
  const [ articlel, setArticlel ] = useState('')
  const [ productType, setProductType ] = useState('')
  const dispatch = useDispatch()
  const [files, setFile] = useState([]);
  const [addingPhotos, setAddingPhotos] = useState(true);
  const navigate = useNavigate()
  const err = useSelector((store) => store.admains.err)
  const newPost = useSelector((store) => store.admains.newPost)
  const ProductAll = useSelector((store) => store.admains.ProductAll)

  const handleOpenClick = () => {
    if(isShow === 0){
      setIsShow(1)
    }else(
      setIsShow(0)
    )
  }
  const handleNameChange = (e) => {setProductName(e.target.value)}
  const hadlePriceChange = (e) => {setprice(e.target.value)}
  const hadleInventoryChange = (e) => {setStorage(e.target.value)}
  const hadleSellChange = (e) => {setSell(e.target.value)}
  const hadleArticleChange = (e) => {setArticlel(e.target.value)}
  const handleTypeChange = (e) => {setProductType(e.target.value)}

  const handleFromSubmit = () => {
    // dispatch(setNewProduct({
    //   productName, 
    //   productType,
    //   price,
    //   articlel,
    //   isShow,
    //   storage,
    //   sell,
    // }))
    dispatch(newProduct(files, {
      productName, 
      productType,
      price,
      articlel,
      isShow,
      storage,
      sell,
    }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      if (files.length + selectedFiles.length > 5) {
        setAddingPhotos(false);
      } else {
        setFile(prevFiles => [...prevFiles, ...selectedFiles]);
      }
    }
   }

  const handleDeleClick = (index) => {
    const filesDelete = files.filter((photo, i) => i !== index)
    setFile(filesDelete);
    if(files.length <= 5){
      setAddingPhotos(true)
    }
  }

  useEffect(() => {
    dispatch(setError(''))
    dispatch(setNewPost(false))
    if(newPost){
      navigate('/admain/commodity')
    }
    window.scrollTo(0, 0);

  },[dispatch, newPost, navigate])

 return(
  <Root>
    <ContentAll>
      <Title>
        新增商品
      </Title>
      <Content>
        <FromAll onSubmit={handleFromSubmit}>
          <PhotoAll>
            {addingPhotos ? (
              <NewPhoto> ＋加入照片
                <input type="file" onChange={handleFileChange} multiple/>
              </NewPhoto>
            ) : (
              <StopNew>已上傳最大限度</StopNew>
            )}
            {files && files.map((photo, index) => <Photo index={index} photo={photo} handleDeleClick={handleDeleClick}/>)}
          </PhotoAll>
          <NavName>名稱<input type="text" value={productName} onChange={handleNameChange}/></NavName>
          <SelectAll>
            <NavType>種類
              <Select value={productType} onChange={handleTypeChange}>
                <Option>請選擇</Option>  
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
              </Select>
            </NavType>
            <NavPrice>金額<input type='number' value={price} onChange={hadlePriceChange} /></NavPrice>
          </SelectAll>
          <SelectAll>
            <Nav>庫存<input type='number' value={storage} onChange={hadleInventoryChange}/></Nav>
            <Nav>售出<input type='number' value={sell} onChange={hadleSellChange}/></Nav>
          </SelectAll>
          <Article>描述<textarea value={articlel} onChange={hadleArticleChange}/></Article>            
          <IsShow>上架
            <ButtonStyle isShow={isShow} onClick={handleOpenClick}>
              <OpenButton isShow={isShow}/>
            </ButtonStyle>
          </IsShow>
          <StoreAll>
            <Store>
              <StoreBtn>
                儲存
              </StoreBtn>
            </Store>
          </StoreAll>
          {err && (<Err>{err}</Err>)}
        </FromAll>
      </Content>
    </ContentAll>
  </Root>
 )
}
