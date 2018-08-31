(function () {
    // Global functions declarations
    var context;
    var canvas;
    var canvas2;
    var width;
    var height;
    const A = [[ [1, 1, 1, 1]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0],], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0],], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0],]]; const B = [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]]]; const C = [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [1, 1, 1], [1, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]]; const D = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0],]]; const E = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]]; const F = [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]]]; const G = [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 0, 1], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]];

    var move = 0
    var downT

    var l = [A, B, C, D, E, F, G]
    var r
    var position = {
        x: 4,
        y: 0
    }

    // Load the function "init" Once everything loaded
    document.addEventListener('DOMContentLoaded', init, false);  // <------ MUST HAVE

    function init() {
        canvas = document.querySelector('#board');
        canvas2 = document.querySelector('#block');

        context = canvas.getContext('2d');
        context2 = canvas2.getContext('2d');

        width = canvas.width;
        height = canvas.height;
        createBoard()


    }


    function createBoard() {
        // 20 x 12   -- lista ma 20 pozycjii kazda pozycja ma 12 pozycji - kazda z tych jest 0 lub 1
        var b = 1
        var bHeight = 20, bWidth = 12

        var board = [];

        for (let i = 0; i < bHeight; i++) {
            board[i] = [];
            for (let j = 0; j < bWidth; j++) {


                board[i][j] = v;
            }
        }

        drawBoard(board)
    }

    function drawBoard(board) {

        var block = 25
        var x = 0, y = 0

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {

                if (board[i][j] == 0) {
                    context.fillStyle = "White"
                    context.fillRect(x, y, block, block)
                    context.strokeRect(x, y, block, block)
                }
                else {
                    context.fillStyle = "Black"
                    context.fillRect(x, y, block, block)
                    context.strokeRect(x, y, block, block)
                }

                x += block
            }
            x = 0
            y += block
        }
        randomBlock(board)
    }

function moveBlock(){
  document.addEventListener("keydown",function(){


      var keyCode = event.keyCode;
      var max = move + position.x

      if (keyCode == 39 || keyCode == 68 ){
          if (!(max >13)){
           move  += 1
          } else{
              move = 14-position.x
          }
      }
      if (keyCode == 37 || keyCode == 65 ){
          if (!(max <-3)){
              move  -= 1
              }else{
                  move = -4 -position.x
              }
}

    function randomBlock(board) {
        l = [A, B, C, D, E, F, G]
        r = rnum(0, l.length - 1)

        drawBlock()

        moveBlock()


           }


        })
      var a = setInterval(drawBlock,400);
    }

    function drawBlock() {
        context2.clearRect(0, 0, width, height)


        // gets the random block and gets the first position of it
        var block = l[r]
        var new_block = block[0]
        context.fillStyle = "black"


        // if a "keydown" event change the position with "move"
        position.x = 4 +move


        //drawing the block
        for (let i = 0; i < new_block.length; i++) {
            for (let j = 0; j < new_block[i].length; j++) {

                //draws a block if its 1
                if (new_block[i][j] == 1) {
                    context2.fillRect(position.x * 25, position.y * 25, 25, 25)
                }
                //updates the x each time regardless if its 0 or 1
                position.x += 1

            }

            // updates the Y position only if last sub-list had a 1
            // some blocks end in a whole empty sub-list
            if (new_block[i].includes(1)) {
                position.y += 1
            }
            // daw the position in the new y line with the updated "keydown" "move"
            position.x = 4 +move
        }


        // updates the y position  ( animation )
        if (new_block.length == 1){
            // same position if the block is a straight line - wasnt moving before
            position.y = position.y
        }else{
             position.y -= 1

        }

        console.log(move+position.x)

        // Temporary Makes the blocks reset

        if (position.y >19){
            context2.clearRect(0, 0, width, height)
            position = {
                x: 4,
                y: 0
            }
            clearInterval(interval_id)

            randomBlock()
        }


    }



    function checkHit(board, block, position) {

        clearInterval(interval_id);


    }
    function updateBoard(board, block, position) {


        drawBoard(board)
    }
    function checkboard() {

    }



    // Random nO function
    function rnum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})();


/*  - tworzymy liste list klockow,
    - klocki kolorujemy a nie rysujemy na nich (to pomoże w ustalaniu zderzeń na dole planszy)
    - pojedynczy klocek jest listą list 3 x 3
    - żeby zacząć rysowanie klocka potrzebna jest pozycja startowa, dlatego musimy utworzyć dwie zmienne (x,y) dotyczące
    aktualnej pozycji klock, tak żeby rysowanie mogło nastąpić po dodaniu do aktualnej pozycji kształtku klocka, <---- ważne, że ja wiem o co chodzi :D
    - trzeba opracować sposób na czyszczenie pól po przemieszczeniu lub obrocie klocka,
    - potrzebne jest również zagęszczenie ruchów, gdyż się z lekka opierdalam

    (Dawid)

    pozdro 600 3 900

    iks de hehe

     */

    // (function () {
    //     // Global functions declarations
    //     var context;
    //     var canvas;
    //     var width;
    //     var height;

    //     const A=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0],],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],],[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0],],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],]];const B=[[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]]];const C=[[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]];const D=[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0],]];const E=[[[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],[[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]]];const F=[[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]];const G=[[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],[[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]]];
    //     var block = width / 12

    //     // Load the function "init" Once everything loaded
    //     document.addEventListener('DOMContentLoaded', init, false);

    //     function init() {
    //         canvas = document.querySelector('canvas');
    //         context = canvas.getContext('2d');
    //         width = canvas.width;
    //         height = canvas.height;

    //         //Checking if the variables worked properly,
    //         // ctr + shift + j  and see the logs
    //         // console.log(canvas,context,width,height)


    //         //call a function at a certain interval   - eg 33 milliseconds
    //         // interval_id = window.setInterval(draw, 33);
    //         createBoard();
    //         // draw()
    //         //drawBoard();
    //     }
    //     function createBoard() {
    //         // 12 wide 20 high
    //         // array length 20, 12 items in each array of color white
    //         const boardH = 20;
    //         const boardW = 12;

    //         var board = []

    //         for (var i = 0; i < boardH; i++) {
    //             board[i] = []
    //             for (var x = 0; x < boardW; x++) {
    //                 board[i][x] = "white"
    //             }
    //         }
    //         console.log(board)
    //         drawBoard(board, boardW, boardH)
    //         colorBrick(board);

    //     }

    //     function drawBoard(board, W, H) {
    //         var block = width / W
    //         var y = 0
    //         var start = 0
    //         for (var i = 0; i < H; i++) {
    //             for (var x = 0; x < W; x++) {

    //                 context.fillStyle = board[i][x]
    //                 context.fillRect(start, y, block, block)
    //                 context.strokeRect(start, y, block, block)
    //                 start += block
    //             }
    //             y += block
    //             start = 0
    //         }
    //         randomBrick()
    //     }

    //     function randomBrick() {
    //         var bricks = [A, B, C, D, E, F, G]
    //         var ran = rnum(0, 6)
    //         return drawBrick(bricks[ran])
    //     }



    //     function drawBrick (brick){
    //         var bStart = 5
    //         y = 1
    //         block = width/ 12
    //         console.log(brick)
    //         for (var i = 0;i<brick.length;i++){
    //             for (var j = 0;j<brick[i].length;j++){
    //                 for (var k = 0;k<brick[i][j].length;k++){
    //                 if(brick[i][j][k] == 1){
    //                     context.fillStyle = "black"
    //                     context.fillRect(bStart*block, y*block, block, block)
    //                 }
    //                 bStart +=1
    //             }
    //             y +=1
    //             bStart = 6
    //         }

    //     }
    // }






    //     // Random number function
