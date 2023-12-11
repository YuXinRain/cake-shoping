import { createSlice } from '@reduxjs/toolkit'
import { setAuthToken } from '../../token'
import { deleteProduct, getAdmain, getPhotoId, getPhotos, getPosts, PatchProduct, postPhoto, setNewPosts } from '../../WebAPI'

const initialState = {
  admainLogin: false,
  err: '',
  admainProduct: '',
  admainPhoto: '',
  isLodding: false,
  ProductAll: '',
  newPost: false
}

export const admainReducer = createSlice({
  name: 'admain',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.err = action.payload
    },
    setAdmain: (state, action) => {
        state.admainLogin = action.payload
    },
    setAdmainProduct: (state, action) => {
      state.admainProduct = action.payload
    },
    setAdmainPhoto: (state, action) => {
      state.admainPhoto = action.payload
    },
    setIsLodding: (state, action) => {
      state.isLodding = action.payload
    },
    setProductAll: (state, action) => {
      state.ProductAll = action.payload
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload
    },
  },
})

export const { setError, setAdmain, setAdmainProduct, setAdmainPhoto, setAdmainIsShow, setIsLodding, setProductAll, setNewPost } = admainReducer.actions

export const getProduct = () => async (dispatch) => {
  dispatch(setIsLodding(true))
  document.body.style.overflow = 'hidden'
  const updatedContents = [];
  const postsData = await getPosts();
    const photosData = await getPhotos();
    for (let i = 0; i < postsData.result.length; i++) {
      const filteredPhotos = photosData.result.filter(photo => photo.productid === postsData.result[i].id);
      updatedContents.push({ ...postsData.result[i], photoUrl: filteredPhotos, isHover: false });
    }
  await Promise.all(updatedContents)
    .then(results => {
      const updetresulet = results.filter(res => res.isDeleted !== 1)
      dispatch(setProductAll(updetresulet))
      document.body.style.overflow = 'visible'
      dispatch(setIsLodding(false))
    })
    .catch(error => {
      console.error('其中一個 Promise 失敗:', error);
    });
}

export const getProductOne = (id) => (dispatch, getState) => {
  const { admains } = getState();
  const { ProductAll } = admains;
  const updatedAdmainProduct = ProductAll.filter(product => 
    product.id === parseFloat(id),
  )
  dispatch(setAdmainProduct(updatedAdmainProduct))
  const photoUrl = updatedAdmainProduct[0].photoUrl
  dispatch(setAdmainPhoto(photoUrl))
}

export const getAdmainLogin = (data) => async (dispatch) => {
  dispatch(setIsLodding(true))
  await getAdmain(data).then(res => {
    if(res.ok === 0){
      dispatch(setError(res.message))
    }
    if(res.ok === 1){
      setAuthToken(res.token)
      dispatch(setAdmain(true))
      dispatch(setIsLodding(false))
    }
  })
  .catch(err => dispatch(setError(err)))
}

export const setNewProduct = (data) => (dispatch) => {
  dispatch(setIsLodding(true))
  setNewPosts(data).then(res => {
    if(res.ok === 1){
      dispatch(getProduct())
      dispatch(setNewPost(true))
      dispatch(setIsLodding(false))
    }
    if(res.ok === 0){
      dispatch(setError(res.message))
      dispatch(setIsLodding(false))
    }
  }
  ).catch(err => dispatch(setError(err)))
}
export const EditPatch = (data) => (dispatch) => {
  PatchProduct(data).then(res => {
    dispatch(setAdmainProduct(data))
    if(res.ok === 1){
      dispatch(getProduct())
      dispatch(setIsLodding(false))
    }  
  })
}
export const deleteProductOne = (id) => (dispatch) => {
  dispatch(setIsLodding(true))
  deleteProduct(id).then(res => {
    if(res.ok === 1){
      dispatch(getProduct())
    }  
  })
}

export const postPhotos = (fromData, id) => (dispatch) => {
  postPhoto(fromData).then(res => {
    if(res.ok === 1){
      getPhotoId(id).then(data => {
        dispatch(setAdmainPhoto(data.result))
        dispatch(setError(''))
      })
    }
    if(res.ok === 0){
      dispatch(setError(res.message))
    }
  }).catch(err => dispatch(setError(err.message)))
}

export const newProduct = (files, data) => async (dispatch) => {
  const response = await setNewPosts(data); //新增資料進去

  if (response.ok === 1) {
    dispatch(setIsLodding(false));
    const productResponse = await getPosts(); //為了抓新的一筆資料的id
    if(productResponse.ok === 1){
      const upProduct = productResponse.result[productResponse.result.length - 1].id;
      
      let fromData = new FormData();
      for (let i = 0; i < files.length; i++) {
        fromData.append('avatar', files[i]);
      }
      fromData.append('productId', upProduct.toString());
      const photoResponse = await postPhoto(fromData);
      if(photoResponse.ok === 1){
        dispatch(getProduct());
        dispatch(setNewPost(true));
      }else {
        dispatch(setError(photoResponse.message));
      }
      }else {
        dispatch(setError(productResponse.message));
        dispatch(setIsLodding(false));
      }
    } else {
      dispatch(setError(response.message));
      dispatch(setIsLodding(false));
    }

};
export default admainReducer.reducer