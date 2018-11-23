/**
 * Created by Administrator on 2017-01-13.
 */
var CanvasParticle = (function(){
    function getElementByTag(name){
        return document.getElementsByTagName(name);
    }
    function getELementById(id){
        return document.getElementById(id);
    }
    // 根据传入的config初始化画布
    function canvasInit(canvasConfig){
        canvasConfig = canvasConfig || {};
        var html = getElementByTag("html")[0];
        var body = getELementById("ui_choose_bg");
        var canvasDiv = getELementById("canvas-particle");
        var canvasObj = document.createElement("canvas");

        var canvas = {
            element: canvasObj,
            points : [],
            // 默认配置
            config: {
                vx: canvasConfig.vx || 4,
                vy:  canvasConfig.vy || 4,
                height: canvasConfig.height || 2,
                width: canvasConfig.width || 2,
                count: canvasConfig.count || 100,
                color: canvasConfig.color || "121, 162, 185",
                dist: canvasConfig.dist || 6000,
                e_dist: canvasConfig.e_dist || 20000,
                max_conn: 10
            }
        };

        // 获取context
        if(canvas.element.getContext("2d")){
            canvas.context = canvas.element.getContext("2d");
        }else{
            return null;
        }

        body.style.padding = "0";
        body.style.margin = "0";
        // body.replaceChild(canvas.element, canvasDiv);
        body.appendChild(canvas.element);

        canvas.element.style = "position: absolute; top: 0; left: 0; z-index: 0;";
        canvasSize(canvas.element);
        window.onresize = function(){
            canvasSize(canvas.element);
        }
        setInterval(function(){
            drawPoint(canvas);
        }, 30);
    }

    // 设置canvas大小
    function canvasSize(canvas){
        canvas.width =document.getElementById('ui_choose').offsetWidth;
        canvas.height =document.getElementById('ui_choose').offsetHeight;
    }

    // 画点
    function drawPoint(canvas){
        var context = canvas.context,
            point,
            dist;
        context.clearRect(0, 0, canvas.element.width, canvas.element.height);
        context.beginPath();
        context.fillStyle = "rgb("+ canvas.config.color +")";
        for(var i = 0, len = canvas.config.count; i < len; i++){
            if(canvas.points.length != canvas.config.count){
                // 初始化所有点
                point = {
                    x: Math.floor(Math.random() * canvas.element.width),
                    y: Math.floor(Math.random() * canvas.element.height),
                    vx: canvas.config.vx / 10 - Math.random() * canvas.config.vx/10,
                    vy: canvas.config.vy / 10 - Math.random() * canvas.config.vy/10
                }
            }else{
                // 处理球的速度和位置，并且做边界处理
                point =	borderPoint(canvas.points[i], canvas);
            }
            context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);

            canvas.points[i] = point;
        }
        context.closePath();
    }

    // 边界处理
    function borderPoint(point, canvas){
        var p = point;
        if(point.x <= 0 || point.x >= canvas.element.width){
            p.vx = -p.vx;
            p.x += p.vx;
        }else if(point.y <= 0 || point.y >= canvas.element.height){
            p.vy = -p.vy;
            p.y += p.vy;
        }else{
            p = {
                x: p.x + p.vx,
                y: p.y + p.vy,
                vx: p.vx,
                vy: p.vy
            }
        }
        return p;
    }
    return canvasInit;
})();