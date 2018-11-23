/**
 * Created by novice on 2017-01-05 copy from http://www.qdfuns.com/notes/15800/552b6a805cb97074e6501938096f57bc.html.
 * thanks
 * touchEvent.tap(aDiv[0],function(){
			alert("单次触摸");
		})
 */
var touchEvent={

    /*单次触摸事件*/
    tap:function(element,fn){
        var startTx, startTy;
        element.addEventListener('touchstart',function(e){
            var touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
        }, false );

        element.addEventListener('touchend',function(e){
            var touches = e.changedTouches[0],
                endTx = touches.clientX,
                endTy = touches.clientY;
            // 在部分设备上 touch 事件比较灵敏，导致按下和松开手指时的事件坐标会出现一点点变化
            if( Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6 ){
                fn();
            }
        }, false );
    }
}