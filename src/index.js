module.exports = function solveSudoku(matrix) {
    /*function solveSudoku(matrix) {
        /*
        zeroCell (ключ - массив с координатами [row, collumn]: значние - массив [] кандидатов)
         */
    let result = matrix;
    let zeroCell = {};
    const ROOTS = [1,2,3,4,5,6,7,8,9];
    const MATRIXLENGTH = result.length;


    /*
		у ячейки с "0" будем брать координаты, записывать их в zeroCell как ключ
		для каждой нулевой ячейки будет свой posibleSolve, который изначально равен ROOTS
		 */

    for( let r = 0; r < MATRIXLENGTH; r++ ){
        for(let c = 0; c < MATRIXLENGTH; c++){
            if (result[r][c] === 0) {
                zeroCell[ `${r},${c}` ] = ROOTS.slice();
            }
        }
    }

    function singleton (zeroData, firstMatrix ) {
        const firstMatrixLength = firstMatrix.length;
        let zd = zeroData;

        for(let key in zd){
            let row = key[0]; // 0
            let collumn = key[2]; // 7
            //console.log( zd[ key ].indexOf(9) );

            for( let c = 0; c < firstMatrixLength; c++ ){
                //console.log(firstMatrix[row][c]);
                if( zd[ key ].indexOf( firstMatrix[row][c]) !== -1 ){


//                    console.log( `В массиве ${zd[ key ]} есть ${firstMatrix[row][c]}
//                     на позиции ${zd[ key ].indexOf( firstMatrix[row][c])}`);
                    zd[ key ].splice( zd[ key ].indexOf( firstMatrix[row][c] ), 1 );
                }
            }
            for( let r = 0; r < firstMatrixLength; r++ ){
                if( zd[ key ].indexOf( firstMatrix[r][collumn]) !== -1 ){
                    zd[ key ].splice( zd[ key ].indexOf( firstMatrix[r][collumn]), 1);
                }
            }
        }
        return zd;
    }

    zeroCell = singleton (zeroCell, result);

    for(let key in zeroCell) {
        let row = key[0]; // 0
        let collumn = key[2]; // 7

        let squareRowIDStart = Math.floor(row / 3) * 3;
        let squareRowIDSFinish = squareRowIDStart + 3;
        let squareCollIDStart = Math.floor(collumn / 3) * 3;
        let squareCollIDSFinish = squareCollIDStart + 3;
        let partZeroCell = {};
        partZeroCell[ `${row},${collumn}` ] = zeroCell[key];

        let newMatrix = [];

        for(let i = 0; i < 3; i++){
            newMatrix[i] = new Array();
            for( let j = 0; j < 3; j++)
            {
                newMatrix[i][j] = result[squareRowIDStart + i][squareCollIDStart + j];
            }
        }

        let preResult = singleton (partZeroCell, newMatrix);
        zeroCell[ key ] = preResult[ key ];
    }

//          console.log(squareRowIDStart +`, `+ squareRowIDSFinish);
//          console.log(squareCollIDStart +`, `+ squareCollIDSFinish);



    for(let key in zeroCell) {
        let row = key[0]; // 0
        let collumn = key[2]; // 7
        if (zeroCell[key].length === 1) {
            result[row][collumn] = +zeroCell[key];
        }
    }





//        for(let key in zeroCell){
//        console.log(key); // 0,7
//        console.log(key[0]); //0
//        console.log(key[2]); //7
//        }

    return result;


}
