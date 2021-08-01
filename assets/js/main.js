// alert("Js connected");
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let boardBound=board.getBoundingClientRect();
let x=true;
let y=true;
let leftPlayer=3;
let rightPlayer=3;
//user-input listen
document.addEventListener("keydown", function(e)
{
    if(e.key=="w")
    {
        movePaddle(leftPaddle,-window.innerHeight*0.1);
    }
    else if(e.key=="s")
    {
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }
    else if(e.key=="ArrowUp")
    {
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }
    else if(e.key=="ArrowDown")
    {
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
})
function movePaddle(currPaddle,change)
{
    let currPaddleBound=currPaddle.getBoundingClientRect();
    if(currPaddleBound.top+change>=boardBound.top && currPaddleBound.bottom+change<=boardBound.bottom)
    {
    currPaddle.style.top=currPaddleBound.top+change+"px";
    currPaddle.style.bottom=currPaddleBound.bottom+change+"px";
    }
}
function resetGame()
    {
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveball);
    }
function setColor(idx)
    {
      let allicons = document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color="#FF5733";
    }
function moveball()
{
    let ballcordinates=ball.getBoundingClientRect();
    let ballTop=ballcordinates.top;
    let ballLeft=ballcordinates.left;
    let ballBottom=ballcordinates.bottom;
    let ballRight=ballcordinates.right;

    //check if collided with boundary
    let hasTouchedLeft=ballLeft<boardBound.left;
    let hasTouchedRight=ballRight>boardBound.right;
    if(hasTouchedLeft||hasTouchedRight)
    {
        if(hasTouchedLeft)
        {
            leftPlayer--;
            setColor(leftPlayer);
        if(leftPlayer==0)
        {
        alert("Game Over  player Right 🔥🔥 Wins");
        document.location.reload();
        }
        else
        {
            return resetGame()
        }
    }
        else{
            rightPlayer--;
            setColor(3+rightPlayer);
            if(rightPlayer==0)
            {
                alert("Game Over Player Left 🔥🔥 Wins ");
                document.location.reload();
            }
            else
            {
                return resetGame()
            }
        }
    }
    //is ball in bound
    //handle vertical bound
    if(ballTop<=boardBound.top || ballBottom>=boardBound.bottom)
    {
            //vertically Outside
            y=!y;
    }

    //handle horizontal bound
    // if(ballLeft<=boardBound.left || ballRight>=boardBound.right)
    // {
    //     //horizontally outside
    //     x=!x;
    // }

    //Collison
    let leftPaddleBounds=leftPaddle.getBoundingClientRect();
    let rightPaddleBounds=rightPaddle.getBoundingClientRect();
    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30>=leftPaddleBounds.top && ballBottom-30<=leftPaddleBounds.bottom)
    {
        x=!x;
    }
    if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30>=rightPaddleBounds.top && ballBottom-30<=rightPaddleBounds.bottom)
    {
        x=!x;
    }

    ball.style.top= y==true?ballTop+6+"px":ballTop-6+"px";
    ball.style.left= x==true?ballLeft+6+"px":ballLeft-6+"px";
    requestAnimationFrame(moveball);

}
requestAnimationFrame(moveball);
