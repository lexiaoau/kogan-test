var helper = require('./helper');

let nextPageUrlPart = '/api/products/1';

const TARGET_CATEGORY =  'Air Conditioners';

cubicWeightArray = [];

//// This is the main function, it will run by loop to get every page JSON data and find the 
////  target category data. 
////  When no page to retrieve, it will calculate avarage cubic weight of found data.
////
(async () => {
    try {
        while( nextPageUrlPart !== null && nextPageUrlPart.length > 0)
        {
            const dataUrl = helper.getDataURL( nextPageUrlPart );
            if( dataUrl.length > 0 ) {
                const jsonData = await helper.getJsonDataFromApi( dataUrl );

                if( jsonData ) {
                    const dataObjs = jsonData.objects;

                    for (let index = 0; index < dataObjs.length; index++) {
                        const element = dataObjs[index];
    
                        const category = element.category ;
                        if( category === TARGET_CATEGORY ) {
                            const this_cubic_weight = helper.getCubicWeight( element.size );
                            cubicWeightArray.push( this_cubic_weight );    
                        }
                    }
                    nextPageUrlPart = jsonData.next ;

                }
                else {
                    throw new Error('Cannot get json data for link:' + dataUrl);
                }
            }
        }

        let sum = 0;
        for (let index = 0; index < cubicWeightArray.length; index++) {
            const element = cubicWeightArray[index];
            sum += element ;            
        }
        if(  cubicWeightArray.length < 1 ) {
            throw new Error('No valid data found.');
        }
        let average = sum /  cubicWeightArray.length ;
        average = Math.round(  average  * 100 ) / 100   + '';
        console.log('Average cubic weight for all products in the "Air Conditioners" category is: ', average, 'KG.' );

    } catch (err) {
        console.error('Error: ' , err , '. Program exit due to error.');
    }
    
})();



