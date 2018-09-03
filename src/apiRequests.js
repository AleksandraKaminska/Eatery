import { ZOMATO_API_KEY } from './const';

export const searchRestaurants = async params => {
//https://developers.zomato.com/api/v2.1/search?lat=52.2254604&lon=21.018241099999997&radius=2000&sort=real_distance
  let url = `https://developers.zomato.com/api/v2.1/search`
  Object.keys(params).forEach(el => url += `&${el}=${params[el]}`)
  url = url.replace(/&/, '?')
  const obj = { headers: { 'user-key': ZOMATO_API_KEY } }

  let response = await fetch(url, obj)
  let data = await response.json()
  return data
}

export const restaurantDetails = async id => {
  const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`
  const obj = { headers: { 'user-key': ZOMATO_API_KEY } }
  let response = await fetch(url, obj)
  let data = await response.json()
  return data
}
