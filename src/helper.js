var axios = require('axios');

hostURL = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';

//// check given parameters, 
////    if it is null or empty string,      return an empty string
////    else, return an URL to retrieve data
module.exports.getDataURL =  function( nextPage = '/api/products/1' ){
    if( nextPage === null ) {
        return '';
    }
    else {
        if( typeof nextPage !== 'string' || nextPage.length === 0  ) {
            return '';
        }
        else {
            return hostURL + nextPage ;
        }
    }
}

//// use axios library to get JSON data from given API link
//// if no valid data found, return null.
module.exports.getJsonDataFromApi = async function( apiLink ){
    try {
        const rsp = await axios({
            method: 'get',
            url: apiLink
          });

          if( 'data' in rsp ) {
            return rsp.data;
          }
          else {
              return null;
          }

    } catch (err) {
        console.error('Error: ', err);
        return null;
    }
}

//// size object is expected to has following format:
// {
//     "width": 5.8, 
//     "length": 19.0, 
//     "height": 0.3
// }
///    All dimensions are provided in centimetres
///
//// then this function will calculate its cubit weight 
const WEIGHT_FACTOR = 250;
module.exports.getCubicWeight = function( sizeObject ){
    if(
        sizeObject === null ||
        !( 'width' in sizeObject ) ||
        !( 'length' in sizeObject ) ||
        !( 'height' in sizeObject ) 
    )
    {
        return 0;
    }
    else {
        return ( Number(sizeObject.width) * Number(sizeObject.length)  * Number(sizeObject.height)  / Math.pow( 100, 3 ) *   WEIGHT_FACTOR   ) 
    }
}
