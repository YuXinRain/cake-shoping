import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteProductOne, EditPatch, getProduct, getProductOne, postPhotos, setAdmainPhoto, setAdmainProduct, setError, UploadPhotos } from '../../../Redux/reducers/admainReducer';
import { Center } from '../../../styledCss';
import lodding from '../../../image/cat.png';
import { deletePhoto, getPhotoId, postPhoto } from '../../../WebAPI';


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
    padding-left: 10px;
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
    padding-left: 10px;
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
  ${({ isShow }) => isShow === '1' && `
    background: #5f9ea0;
    // animation: scrollRight 5s linear infinite;  
  `}
`

const OpenButton = styled.div`
  width: 50%;
  height: 25px;
  border-radius: 3px;
  background: white;
  ${({ isShow }) => isShow === '1' && `
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
  border: none;
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
  bottom: 50px;
  color: red;
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
const EditAll = styled.div``
const DeleteButton = styled.div`
  ${Center}
  width: 80px;
  height: 40px;
  background: #775862;
  border-radius: 5px;
  color: white;
  letter-spacing:5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
`
const Error = styled.div`
  color: red;
  position: absolute;
  right: 0;
  margin-top: 5px;
`
function Photo({ index, photo, handleDeleClick }){
  return(
    <PhotoContent key={index}>
      <Photos src={photo.url}/>
      <PhotoDelete onClick={() => handleDeleClick(index)}>x</PhotoDelete>
    </PhotoContent>
  )
}
export default function AdmainEditPage() {
  const admainProduct = useSelector((store) => store.admains.admainProduct)
  const admainLogin = useSelector((store) => store.admains.admainLogin)
  const admainPhoto = useSelector((store) => store.admains.admainPhoto)
  const admainLodding = useSelector((store) => store.admains.isLodding)
  const ProductAll = useSelector((store) => store.admains.ProductAll)
  const error = useSelector((store) => store.admains.err)
  const { id } = useParams()
  const navigate = useNavigate()
  const [productInfo, setProductInfo] = useState({
    productName: '',
    price: '0',
    storage: '0',
    sell: '0',
    articlel: '',
    type: '',
    isShow: '0',
    id: ''
  });
  const dispatch = useDispatch()
  const [addingPhotos, setAddingPhotos] = useState(true);
  console.log('admainPhoto', admainPhoto)

  useEffect(() => {
    if(ProductAll.length === 0){
      dispatch(getProduct())
    }
    if(ProductAll){
      dispatch(getProductOne(id))
    }
  },[dispatch, id, ProductAll])

  useEffect(() => {
    if (admainProduct && admainProduct[0]) {
      setProductInfo({
        productName: admainProduct[0].productName.toString() || '',
        price: admainProduct[0].price.toString() || '0',
        storage: admainProduct[0].storage.toString() || '0',
        sell: admainProduct[0].sell.toString() || '0',
        articlel: admainProduct[0].articlel || '',
        type: admainProduct[0].type.toString() || '',
        isShow: admainProduct[0].isShow.toString() || '0',
        id: admainProduct[0].id.toString() || '0',
      });
    }
    window.scrollTo(0, 0);
  }, [ admainProduct]);

  const handleOpenClick = () => {
    const updatedIsShow = [{
      ...admainProduct[0], 
      isShow: admainProduct[0].isShow === 1 ? 0 : 1
    }]
    dispatch(setAdmainProduct(updatedIsShow));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  const handleFromSubmit = (e) => {
    e.preventDefault();
    dispatch(EditPatch({productInfo}))
    navigate('/admain/commodity')
  }

  const handleFileChange = async (e) => {
    let fromData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      fromData.append('avatar', e.target.files[i]);
    }
    fromData.append('productId', admainProduct[0].id.toString());
    dispatch(postPhotos(fromData, admainProduct[0].id))
  };

  const handleDeleClick = (id) => {
    const filesDelete = admainPhoto.filter((photo) => photo.id !== id)
    if(admainPhoto.length <= 5){
      setAddingPhotos(true)
    }else{
      setAddingPhotos(false)
    }
    deletePhoto(id).then(res => {
      if(res.ok === 1){
        dispatch(setAdmainPhoto(filesDelete))
      }
    })
  }

  const handleDeleteClick = (id) => {
    dispatch(deleteProductOne(id))
    navigate('/admain/commodity')
  }

 return(
  <Root>
    {admainLodding &&
      <Lodding>
        <LoddingImg src={lodding} />
        Lodding
      </Lodding>}
      {admainLogin ? (
      <ContentAll>
        <Title>
          編輯商品
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
              {admainPhoto && admainPhoto.map((photo, index) => <Photo index={index} photo={photo} handleDeleClick={() => handleDeleClick(photo.id)}/>)}
            </PhotoAll>
            {error !== '' && (<Error>{error.toString()}</Error>)}
            { admainProduct && (
            <EditAll>
              <NavName>名稱<input type="text" name="productName" value={productInfo.productName} onChange={handleInputChange}/></NavName>
                <SelectAll>
                  <NavType>種類
                    <Select value={productInfo.type} name="type" onChange={handleInputChange}>
                      <Option>請選擇</Option>  
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                      <Option value={3}>3</Option>
                      <Option value={4}>4</Option>
                    </Select>
                  </NavType>
                  <NavPrice>金額<input type='number' name="price" value={productInfo.price} onChange={handleInputChange} /></NavPrice>
                </SelectAll>
                <SelectAll>
                  <Nav>庫存<input type='number' name="storage" value={productInfo.storage} onChange={handleInputChange}/></Nav>
                  <Nav>售出<input type='number' name="sell" value={productInfo.sell} onChange={handleInputChange}/></Nav>
                </SelectAll>
                <Article>描述<textarea value={productInfo.articlel} name="articlel" onChange={handleInputChange}/></Article>            
                <IsShow>上架
                  <ButtonStyle isShow={productInfo.isShow} name="isShow" onClick={handleOpenClick}>
                    <OpenButton isShow={productInfo.isShow}/>
                  </ButtonStyle>
                </IsShow>
                <StoreAll>
                  <Store>
                    <DeleteButton onClick={() => handleDeleteClick(id)}>
                      刪除
                    </DeleteButton>
                    <StoreBtn type="submit">
                      儲存
                    </StoreBtn>
                    
                  </Store>
                </StoreAll>
              </EditAll>
              )}
            </FromAll>
          </Content>
      </ContentAll>
      ) : (
        <LoginNone to={'/admain'}>
        管理員登入
      </LoginNone>
      )}
      
  </Root>
 )
}
