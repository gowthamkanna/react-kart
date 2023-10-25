const probe = require('probe-image-size');
const resizer = require('./ImageResizer');
const sizeOf = require('image-size')
const Jimp = require('jimp');

class ImageDetails {
async shapeFinder(req, path) {
        let finalResult;
        try {
            console.log(path);
            const dimensions = sizeOf(path);
            let image_width = dimensions.width, image_height = dimensions.height;
            let diff = Math.sign(image_width - image_height);
            switch (diff) {
                case 0: {
                    finalResult = this.squareUnits(req.body.price);
                    break;

 }
                case -1: {
                    finalResult = this.potraitUnits(req.body.price);
                    break;
                }
                case 1: {
                    finalResult = this.landScapeunits(req.body.price);
                    break;
                }
            }
            if (finalResult) {
                let x = image_width % finalResult.level1.columns;
                let y = image_height % finalResult.level1.rows; 
                  console.table({x, y});
                if (x !== 0 || y !== 0) {
                    while (true) {
                        if (x !== 0) {
                            image_width -= 1;
                            x = image_width % finalResult.level1.columns;
                        }
                        if (y !== 0) {
                            image_height -= 1;
                            y = image_height % finalResult.level1.rows;
                        }
                        if (x === 0 && y === 0) {
                            Jimp.read(path)
                                .then(image => {
                                    return image.resize(image_width, image_height) // resize
                                        .quality(90) // set JPEG quality
                                        .write(path); // save
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                            // await resizer("./" + path, image_width, image_height, 90)
                            break;
                        }
                    }
                }

            }
        } catch (e) {
            console.log(e.message);
        }
        return finalResult;
    }

 imageResponse(shape, levels, totalUnits, level1, level2) {
        let info = {
            shape: shape,
            levels: levels,
            totalUnits: totalUnits,
            level1: level1,
            level2: level2
        }
        console.info(info);
        return info;
    }



    landScapeunits(price) {
        
        let colLevel1 = 0, rowLevel1 = 0, colLevel2 = 0, rowLevel2 = 0, level = 0, check = 0;
        var obj; // Note : need to remove. 
        price = Number(price);
        let pricePerUnit = 0;
        if (price === 4125) {
            level = 1
            colLevel1 = 25
            rowLevel1 = 15
            pricePerUnit = price / (colLevel1 * rowLevel1);
           
        } else if (price < 4125) {
            level = 1
            colLevel1 = 25
            rowLevel1 = 15

            for (let count = 16; count>=1; count--) {
                let result = parseFloat(price) / (parseFloat(count * count) * 1.66);
                if (result >= 9) {
                    colLevel1 = parseInt(parseFloat(count) * 1.66)
                    rowLevel1 = count;
                    check = result;
                    break
                }
            }
            pricePerUnit = price / (colLevel1 * rowLevel1);
            
        } else if (price > 4125 && price <= 17015625) {
            /*let testPrice = 0
            if (price !== 17015625) {
                testPrice = price % 4125
            } else {
                testPrice = 4125
            }

            level = 2
            colLevel1 = 25
            rowLevel1 = 15
            colLevel2 = 25
            rowLevel2 = 15

            let divby11 = testPrice / 11

            for (let count = 1; count < 16; count++) {
                let result = parseFloat(testPrice) / (parseFloat(count * count) * 1.66)
                console.log(result);
                if (result <= 12) {
                    colLevel2 = parseInt(parseFloat(count) * 1.66)
                    rowLevel2 = count;
                    check = result*11;
                    break
                }
            }

        }

        check = check.toFixed(2)*/
            let testPrice = price/375;

            level = 2
            colLevel1 = 25
            rowLevel1 = 15
            colLevel2 = 2
            rowLevel2 = 2

            for (let count = 2; count < 26; count++) {
                let result = parseFloat(testPrice) / parseFloat(count * count)
                if (result <= 12.0) {
                    colLevel2 = count
                    rowLevel2 = count
                    check = result
                    break;
                }
            }

            if(check <= 9){
                // Note: Changed count 16 to 15 
                for(let count=15; count>=1; count--){
                    let result = parseFloat(price)/parseFloat((count*count*colLevel2*rowLevel2)*1.66)

                    if(result >= 9){
                       // debugger;
                        colLevel1 = parseInt(parseFloat(count)*1.66);
                        rowLevel1 = count;
                        check = result;
                        break;
                    }
                }
            }
            pricePerUnit = price / (colLevel1 * rowLevel1 * colLevel2 * rowLevel2);
           
        }


        // let level1 = {
        //     rows: rowLevel1,
        //     columns: colLevel1,
        //     grids: rowLevel1 * colLevel1,
        //     pricePerUnit: parseFloat(pricePerUnit).toFixed(2)
        // };
        // let level2 = {
        //     rows: rowLevel2,
        //     columns: colLevel2,
        //     grids: rowLevel2 * colLevel2,
        //     pricePerUnit: rowLevel2 * colLevel2 !== 0 ? parseFloat(pricePerUnit).toFixed(2) : 0
        // }
         
        let newColLevel1=colLevel1;
        let newRowLevel1=rowLevel1;
        let newColLevel2=colLevel2;
        let newRowLevel2=rowLevel2;

        //  if(price > 4125 && price <= 17015625)
        //  {
        //   newColLevel1=rowLevel1;
        //   newRowLevel1=colLevel1;

        //   newColLevel2=rowLevel2;
        //   newRowLevel2=colLevel2;
        //  }else{
        //   newColLevel1=colLevel1;
        //   newRowLevel1=rowLevel1;

        //   newColLevel2=colLevel2;
        //   newRowLevel2=rowLevel2;
        //  }


         let level1 = {
            rows:newRowLevel1,
            columns:newColLevel1 ,
            grids: rowLevel1 * colLevel1,
            pricePerUnit: parseFloat(pricePerUnit).toFixed(2)
        };
        let level2 = {
            rows: newRowLevel2,
            columns:newColLevel2,
            grids: rowLevel2 * colLevel2,
            pricePerUnit: rowLevel2 * colLevel2 !== 0 ? parseFloat(pricePerUnit).toFixed(2) : 0
        }


        let isLevel2 = !(rowLevel2 === 0 && colLevel2 === 0);
        let totalUnits = !isLevel2 ? rowLevel1 * colLevel1 : rowLevel1 * colLevel1 * rowLevel2 * colLevel2;
        let levels = !isLevel2 ? 1 : 2;

        return this.imageResponse('Landscape', levels, totalUnits, level1, level2);
    }

    squareUnits(price) {
        let colLevel1 = 0, rowLevel1 = 0, colLevel2 = 0, rowLevel2 = 0, level = 0, check = 0;
        let obj;
        let pricePerUnit = 0;
        price = Number(price);
        if (price <= 6875) {
            level = 1
            colLevel1 = 25
            rowLevel1 = 25

            for (let count = 25; count >= 1; count--) {
                let result = parseFloat(price) / parseFloat(count * count)
                if (result >= 9) {
                    colLevel1 = count
                    rowLevel1 = count
                    check = result
                    break;
                }
            }
            pricePerUnit = price / (colLevel1 * rowLevel1)
            
        } else if (price > 6875 && price <= 4296875) {
            let testPrice = 0
            if (price !== 4296875) {
                testPrice = price / 625
            } else {
                testPrice = 6875
            }

            level = 2
            colLevel1 = 25
            rowLevel1 = 25
            colLevel2 = 2
            rowLevel2 = 2

            for (let count = 2; count < 26; count++) {
                let result = parseFloat(testPrice) / parseFloat(count * count)
                if (result <= 12.0) {
                    colLevel2 = count
                    rowLevel2 = count
                    check = result
                    break;
                }
            }

            if(check <= 9){
                for(let count=25; count>=1; count--){
                    let result = parseFloat(price) / parseFloat(count*count*colLevel2*rowLevel2)
                    if(result >= 9){
                        colLevel1 = count;
                        rowLevel1 = count;
                        check = result;
                        break;
                    }
                }
            }
            pricePerUnit = price / (colLevel1 * rowLevel1 * colLevel2 * rowLevel2)
           
        }

        let level1 = {
            rows: rowLevel1,
            columns: colLevel1,
            grids: rowLevel1 * colLevel1,
            pricePerUnit: parseFloat(pricePerUnit).toFixed(2)
        };

        let level2 = {
            rows: rowLevel2,
            columns: colLevel2,
            grids: rowLevel2 * colLevel2,
            pricePerUnit: rowLevel2 * colLevel2 !== 0 ? parseFloat(pricePerUnit).toFixed(2) : 0
        }

        let totalUnits = rowLevel2 === 0 && colLevel2 === 0 ? rowLevel1 * colLevel1 : rowLevel1 * colLevel1 * rowLevel2 * colLevel2;
        let levels = rowLevel2 === 0 && colLevel2 === 0 ? 1 : 2;
       
        return this.imageResponse('Square', levels, totalUnits, level1, level2);
    }

    potraitUnits(price) 
    {
        let colLevel1 = 0, rowLevel1 = 0, colLevel2 = 0, rowLevel2 = 0, level = 0, check = 0;
        
        var obj;
        price = Number(price);
        let pricePerUnit = 0;
        if (price === 11000) {
            level = 1
            colLevel1 = 25
            rowLevel1 = 40
            pricePerUnit = price / (colLevel1 * rowLevel1)
            
        } else if (price < 12001) {
            if(!(price>=1153 && price <= 1166) )
            {
            level = 1
            colLevel1 = 25
            rowLevel1 = 40

            for (let count = 25; count >= 1; count--) {
                let result = parseFloat(price) / (parseFloat(count * count) * 1.6)
                if (result >= 9) {
                    colLevel1 = count
                    rowLevel1 = parseInt(parseFloat(count) * 1.6)
                    check = result
                    break
                }
            }
            pricePerUnit = price / (colLevel1 * rowLevel1);
            
            }
            else if((price>=1153 && price <= 1166) )
                {
                    colLevel1 = 25;
                    rowLevel1 = 40;
                    colLevel2 = 1;
                    rowLevel2 = 1;
                    let result = 0
                    //let ColumnPerPrice = Number(price)/1000 ; 
        
                    for (let countLevel1 = 25; countLevel1 >= 1; countLevel1--) 
                    {
                        // Rectangular golden ratio 1.6 
                         result = parseFloat(price) / parseFloat(countLevel1 * (countLevel1 * 1.6));
        
                        // PricePerUnit inbetween range (9 - 12 )
                        if (result >= 9 && result <= 12.0  )
                         {
                            colLevel1 = countLevel1;
                            rowLevel1 = countLevel1 * 1.6;
        
                            colLevel2 = 1;
                            rowLevel2 = 1;
                            check = result;
                            break;
                        }
                        else if(result > 12)
                        {
                                for (let count = 2; count <= 25; count++) 
                                {
                                    let result = parseFloat(price) / parseFloat(countLevel1 * (countLevel1 * 1.6 ) * count * count)
                                    if (result >= 9 && result <= 12.0  ) 
                                    {
                                        colLevel1 = countLevel1;
                                        rowLevel1 = countLevel1 * 1.6;
                                        colLevel2 = count
                                        rowLevel2 = count
                                        check = result
                                        break;
                                    }
                                    else if(result < 9)
                                    {
                                        break;
                                    }
                                }
                        }
                    
                    }
                    pricePerUnit = result;
                    
                }
            
        } else if (price > 12000 && price <= 121000000) {
            if(!((price>=1153 && price <= 1166) || (price >= 12001 && price <= 440999)))
            {
                            /* let testPrice = 0
                            if (price !== 121000000) {
                                testPrice = price % 11000
                            } else {
                                testPrice = 11000
                            }

                            level = 2
                            colLevel1 = 25
                            rowLevel1 = 40
                            colLevel2 = 25
                            rowLevel2 = 40

                            let divby11 = testPrice / 11

                            for (let count = 1; count < 26; count++) {
                                let result = parseFloat(price) / (parseFloat(count * count) * 1.6)
                                if (result <= 12) {
                                    colLevel2 = count
                                    rowLevel2 = parseInt(parseFloat(count) * 1.6)
                                    check = result
                                    break
                                }
                            }
                        }

                        check = check.toFixed(2)
                */
                let testPrice = Number(price)/1000
                level = 2
                colLevel1 = 25
                rowLevel1 = 40
                colLevel2 = 2
                rowLevel2 = 2

                for (let count = 2; count < 26; count++) {
                    let result = parseFloat(testPrice) / parseFloat(count * count)
                    if (result <= 12.0) {
                        colLevel2 = count
                        rowLevel2 = count
                        check = result
                        break;
                    }
                }

                if(check <= 9){
                    for(let count = 25; count >= 1; count--){
                        let result = parseFloat(testPrice) / parseFloat((count*count*colLevel2*rowLevel2)*1.6)
                        if(result >= 9){
                            colLevel1 = count;
                            rowLevel1 = parseInt(parseFloat(count)*1.6)
                            check = result;
                            break;
                        }
                    }
                }

                pricePerUnit = price / (colLevel1 * rowLevel1 * colLevel2 * rowLevel2);
                
            }
            else if( price >= 12001 && price <= 440999)
            {
                colLevel1 = 25;
                rowLevel1 = 40;
                colLevel2 = 1;
                rowLevel2 = 1;
                let result =0;
                let level2Count = 2;
                
    
                //let ColumnPerPrice = Number(price)/1000 ; 
    
                for (let countLevel1 = 25; countLevel1 >= 1; countLevel1--) 
                {
                    // Rectangular golden ratio 1.6 
                     result = parseFloat(price) / parseFloat(countLevel1 * Math.round((countLevel1 * 1.6)));
    
                    // PricePerUnit inbetween range (9 - 12 )
                    if (result >= 9 && result <= 12.0  )
                     {
                        colLevel1 = countLevel1;
                        rowLevel1 = Math.round(countLevel1 * 1.6);
    
                        colLevel2 = 1;
                        rowLevel2 = 1;
                        check = result;
                        countLevel1 = -1; // break outerforloop
                        break;
                    }
                    else if(result > 12)
                    {
                            for (let count = 2; count <= 25; count++) 
                            {
                                let result = parseFloat(price) / parseFloat(countLevel1 * Math.round((countLevel1 * 1.6 )) * count * count)
                                if (result >= 9 && result <= 12.0  ) 
                                {
                                    colLevel1 = countLevel1;
                                    rowLevel1 = Math.round(countLevel1 * 1.6);
                                    colLevel2 = count
                                    rowLevel2 = count
                                    check = result
                                    countLevel1 = -1; // break outer countlevel1
                                    break;
                                }
                                else if(result < 9)
                                {
                                    level2Count = ++count
                                    break;
                                }
                            }
                    }
                }
                pricePerUnit = check;
                
            }
        }
       
		
	
        let level1 = {
            rows: rowLevel1,
            columns: colLevel1,
            grids: rowLevel1 * colLevel1,
            pricePerUnit: parseFloat(pricePerUnit).toFixed(2)
        };
        rowLevel2== 1 ? 0: rowLevel2;
        colLevel2 == 1 ? 0: colLevel2;

        let level2 = {
            rows: rowLevel2,
            columns: colLevel2,
            grids: rowLevel2 * colLevel2,
            pricePerUnit: rowLevel2 * colLevel2 !== 0 ? parseFloat(pricePerUnit).toFixed(2) : 0
        }
        let isLevel2 = !(rowLevel2 === 0 && colLevel2 === 0);
        let totalUnits = !isLevel2 ? rowLevel1 * colLevel1 : rowLevel1 * colLevel1 * rowLevel2 * colLevel2;
        let levels = !isLevel2 ? 1 : 2;
        
        return this.imageResponse('Portrait', levels, totalUnits, level1, level2);
        
    }
}
module.exports = ImageDetails;
