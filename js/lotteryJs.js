/**
 * Created by Administrator on 2015/8/21.
 */
/*
 网页效果，刮刮乐。
 */
module("Lottery",(function() {
        var LotteryImp={};
        var M={};
        function createCanvas(parent, width, height) {
            var canvas = {};
            canvas.node = document.createElement("canvas");
            canvas.context = canvas.node.getContext("2d");
            canvas.node.width = width || 100;
            canvas.node.height = height || 100;
            parent.appendChild(canvas.node);
            return canvas;
        }
        /*
         调用参数说明：containerID 刮刮乐容器的ID
         width & height 刮刮乐区域的宽高，要跟最后显示出来的图片的宽高一致，或者比他大
         fillColor 刮刮乐表面的颜色，可以为空（null），默认为灰色，
         pictureURL 刮刮乐最后显示出来的图片的路径,可以为空,默认为黑色底
         */
        LotteryImp.createLottery= function (containerID, width, height, fillColor,pictureURL) {
            var container = document.getElementById(containerID);
            LotteryImp.container = container;
            LotteryImp.container.style.width = width+"px";
            LotteryImp.container.style.height = height+"px";
            if (pictureURL ==null){
                LotteryImp.container.style.backgroundColor="#000000";
            }
            else
            {
                LotteryImp.container.style.backgroundImage="url("+pictureURL+")";
            }
            var canvas = createCanvas(LotteryImp.container, width, height)
            var context = canvas.context;
            context.fillCircle = function (x, y, radius, fillColor) {
                this.fillStyle = fillColor;
                this.beginPath();
                this.moveTo(x, y);
                this.arc(x, y, radius, 0, Math.PI * 2, false);
                this.fill();
            }
            context.clearTo = function (fillColor) {
                context.fillStyle = fillColor;
                context.fillRect(0, 0, width, height);
            }
            context.clearTo(fillColor || "#ddd");
            function eventMove(event){
                console.log("a");
                if (!canvas.isDrawing) {
                    return;
                }
                var x = event.pageX - this.offsetLeft;
                var y = event.pageY - this.offsetTop;
                var radius = 10;
                var fillColor = "#FF0000";
                context.globalCompositeOperation = "destination-out";
                context.fillCircle(x, y, radius, fillColor);

            };
            function eventStart(event){
                console.log("b");
                canvas.isDrawing = true;
            };
            function eventEnd(event){
                console.log("c");
                canvas.isDrawing = false;
            }
            canvas.node.addEventListener('touchstart',eventStart);
            canvas.node.addEventListener('touchend',eventEnd);
            canvas.node.addEventListener('touchmove', eventMove);
            canvas.node.addEventListener('mousedown',eventStart);
            canvas.node.addEventListener('mouseup',eventEnd);
            canvas.node.addEventListener('mousemove', eventMove);
            // canvas.node.onmousemove = function (event) {
            //     if (!canvas.isDrawing) {
            //         return;
            //     }
            //     var x = event.pageX - this.offsetLeft;
            //     var y = event.pageY - this.offsetTop;
            //     var radius = 10;
            //     var fillColor = "#FF0000";
            //     context.globalCompositeOperation = "destination-out";
            //     context.fillCircle(x, y, radius, fillColor);
            // }

            // canvas.node.onmousedown = function (event) {
            //     canvas.isDrawing = true;
            // }
            // canvas.node.onmouseup = function (event) {
            //     canvas.isDrawing = false;
            // }
        }
        /*
         替换刮刮乐最后显示出来图片的函数。
         pictureURL 想要替换图片的路径
         */
        LotteryImp.setLotteryPicture=function(pictureURL){
            LotteryImp.container.style.backgroundImage="url("+pictureURL+")";
        }
        var create = function(){
            var self={};
            subclass(self,LotteryImp)
            return self;
        }
        M.create = create;
        return M.create();
    })()
)
