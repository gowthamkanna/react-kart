import React from 'react'

const WishlistProducts = ({item}) => {
  return (
    <>
        <div className='col-sm-12 col-md-6 col-lg-6'>
            <div className="list-group">
            {
                    <div className="list-group-item" key={item._id}>
                        <>
                        <div className="image-parent">
                            <img src={process.env.REACT_APP_PRODUCT_IMAGE_URL+'/'+item.ProductImages[0]['filename']} className="img-small" alt="quixote" />
                         </div>
                        <div className='list-text'>
                            <h4>{item.Name}</h4>
                            <p><i className="fa-solid fa-indian-rupee-sign"></i> {item.SalePrice}</p>
                            <p>{item.Description}</p>
                            <button className='btn btn-danger'><i className="fa-solid fa-trash"></i> Remove</button>
                        </div>
                        </>
                    </div>
            }
            </div>
            </div>
    </>
  )
}

export default WishlistProducts