import { getAuthToken } from "./token"

// const BASE_URL = process.env.backend_url
const BASE_URL = "https://secure-mountain-41419.herokuapp.com"

export const getPhotos = () => {
  return fetch(`${BASE_URL}/photo`)
  .then((res) => res.json())
  .then(console.log('getPhotos'))
}

export const getPosts = () => {
  return fetch(`${BASE_URL}/product`)
  .then((res) => res.json())
  .then(console.log('getPosts'))
}

export const setNewPosts = (data) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/product`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
    "productName": data.productName,
    "type": data.productType,
    "price": data.price,
    "articlel": data.articlel,
    "isShow": data.isShow,
    "storage": data.storage,
    "sell": data.sell,
  })
  })
  .then((res) => res.json())
  .then(console.log('setNewPosts'))

}

export const getLogin = (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "username": data.username,
      "password": data.password
    })
  })
  .then((res) => res.json())
  .then(console.log('getLogin'))

}

export const getMe = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/user`, {
  headers: {
    'authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(console.log('getMe'))
  .catch(data => console.log(data))
}

export const getRegister = (data) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "username": data.username,
      "password": data.password,
      "realName": data.realName,
      "email": data.email,
      "phone": data.phone
    })
  })
  .then((res) => res.json())
  .then(console.log('getRegister'))

}

export const getProductId = (id) => {
  return fetch(`${BASE_URL}/product/${id}`)
  .then((res) => res.json())
  .then(console.log('getProductId'))
}

export const getPhotoId = (id) => {
  return fetch(`${BASE_URL}/photo/${id}`)
  .then((res) => res.json())
  .then(console.log('getPhotoId'))
}
export const deleteProduct = (id) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/product/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
  })
  .then((res) => res.json())
  .then(console.log('deleteProduct'))
}
export const getAdmain = (data) => {
  return fetch(`${BASE_URL}/admain`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "username": data.username,
      "password": data.password
    })
  })
  .then((res) => res.json())
  .then(console.log('getAdmain'))
}

export const getOrderId = (id) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/orderUser`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "userId": id
    })
  })
  .then(res => res.json())
  .then(console.log('getOrderId'))
  .catch(err => console.log(err))
}

export const getOrderAll = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/order`, {
    headers: {
      'authorization': `Bearer ${token}`
    },
  })
  .then(res => res.json())
  .then(console.log('getOrderAll'))
  .catch(err => console.log(err))
}
export const postNewOrder = (data) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "userId": data.userId,
      "name": data.name,
      "phone": data.phone,
      "address": data.address,
      "email": data.email,
      "totalPrice": data.totalPrice,
      "productList": data.productList
    })
  })
  .then(res => res.json())
  .then(console.log('postNewOrder'))
  .then(console.log('data', data))
}

export const postPhoto = (fromData) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/photo`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`
    },
    body: fromData
  })
  .then(res => res.json())
  .then(console.log('postPhoto'))
}

export const deletePhoto = (id) => {
  console.log('id', id)
  const token = getAuthToken()
  return fetch(`${BASE_URL}/photo/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${token}`
    },
  })
  .then(res => res.json())
  .then(console.log('deletePhoto'))
}
export const PatchProduct = (data) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/product`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "productName": data.productInfo.productName,
      "type": data.productInfo.type,
      "id": data.productInfo.id,
      "price": data.productInfo.price,
      "articlel": data.productInfo.articlel,
      "isShow": data.productInfo.isShow,
      "sell": data.productInfo.sell,
      "storage": data.productInfo.storage
    })
  })
  .then(res => res.json())
  .then(console.log('PatchProduct'))
}

export const PatchUser = (data) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/user`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "email": data.userEmail,
      "realName": data.userName,
      "phone": data.userPhone,
    })
  })
  .then(res => res.json())
  .then(console.log('PatchUser'))
}
export const PatchOrder = (data) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/order`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "orderId": data.orderid,
      "status": data.status,
    })
  })
  .then(res => res.json())
  .then(console.log('data',data))
  .then(console.log('PatchOrder'))
}