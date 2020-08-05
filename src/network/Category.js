import{request} from "./request"

export function getCategory() {
    return request({
      url:'/category'
    }).catch(err=>err)
}

export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params:{
      maitKey
    }
  }).then(res =>{
    console.log(res);
  })
    .catch(err =>err)
}
