import { createSlice } from '@reduxjs/toolkit'
import { getPosts, getPhotos, getProductId } from '../../WebAPI'

const initialState = {
    posts: [],
    isHover: false,
    isLodding: true,
    card: '',
    count: 1,
    soppingCard: [],
    clickSopping: false
    }

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
  },
    setIsHover: (state, action) => {
      state.isHover = action.payload
    },
    setCards: (state, action) => {
        state.card = action.payload
    },
    setLodding: (state, action) => {
        state.isLodding = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    setSoppingCard: (state, action) => {
      state.soppingCard = action.payload
    },
    setClickSopping: (state, action) => {
      state.clickSopping = action.payload
    },
  },
})

export const { setClickSopping, setPosts, setIsHover, setCards, setLodding, setCount, setSoppingCard } = productReducer.actions

export const setProduct = () => async (dispatch) => {
  dispatch(setLodding(true))
  const updatedContents = [];
  const postsData = await getPosts();
    const photosData = await getPhotos();
    for (let i = 0; i < postsData.result.length; i++) {
      const filteredPhotos = photosData.result.filter(photo => photo.productid === postsData.result[i].id);
      if (filteredPhotos.length > 0) {
        const selectedPhoto = filteredPhotos[0]; // 選擇第一張符合條件的照片
        updatedContents.push({ ...postsData.result[i], photoUrl: selectedPhoto.url, isHover: false });
      }
    }
  await Promise.all(updatedContents)
    .then(results => {
      const updetresulet = results.filter(res => res.isDeleted !== 1)
      dispatch(setPosts(updetresulet))
      dispatch(setLodding(false))
    })
    .catch(error => {
      console.error('其中一個 Promise 失敗:', error);
    });
}

export const EnterHover = (id) => (dispatch, getState) => {
  const { products } = getState();
  const { posts } = products;
  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      return { ...post, isHover: true };
    } else {
      return { ...post, isHover: false };
    }
  });
  dispatch(setPosts(updatedPosts));
}

export const LeaveHover = (id) => (dispatch, getState) => {
  const { products } = getState();
  const { posts } = products;
  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      return { ...post, isHover: false };
    }else {
      return { ...post, isHover: false };
    }
  }); 
  dispatch(setPosts(updatedPosts));
}

export const getCard = (id) => async(dispatch) => {
  const res = await getProductId(id);
  const photos = await getPhotos()
  const photoUrl = photos.result.filter((photo) => photo.productid === res.result[0].id)
    if(photoUrl.length > 0){
      const postUrl = {...res, photoUrl: photoUrl[0]}
      dispatch(setCards(postUrl))
    }
  }
export const getCount = (count) => (dispatch) => {
  dispatch(setCount(count))
}
export const getSoppingCard = (soppingCard, data) => async (dispatch) => {
  const fetchData = async () => { //data是存取新的一筆資料，soppingCard是存取前幾筆存的資料，在要dispatch的地方使用展開的方式存入
    return new Promise((resolve, reject) => {
      const res = data;
      resolve(res)
  })}
  await fetchData().then(post => {
    const newSoppingCard = soppingCard; //不需要加[]，這樣會多一層
    dispatch(setSoppingCard(newSoppingCard))
  })
}
export const setDelete = (id) => (dispatch, getState) => {
  const { products } = getState();
  const { soppingCard } = products;
  const CardDelete = soppingCard.filter(card => card.card[0].id !== id)
  dispatch(setSoppingCard(CardDelete))
}
export const getCensorCard = (previous, newData, data) => (dispatch) => {
  if(previous.length !== 0){
    const censor = previous.find(res => newData.card[0].id === res.card[0].id)
    if(censor){
      const censorPlus = [{...censor, 
        count: parseInt(censor.count, 10) + parseInt(newData.count, 10)}]
        const dele = data.filter(dele => newData.card[0].id !== dele.card[0].id)
      if(dele.length === 0){
        dispatch(setSoppingCard(censorPlus))
      }else{
        const updatedData = [...dele, censorPlus[0]]
        dispatch(setSoppingCard(updatedData))
      }
    }
    if(censor === undefined){
      const a = [...previous, newData]
      dispatch(setSoppingCard(a))
    }
  }
}
export const clearShoppingCard = () => (dispatch) => {
  dispatch(setSoppingCard([]))
}

export default productReducer.reducer