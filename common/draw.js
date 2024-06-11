const draw = {};

draw.path = (ctx,path,color='#0B004D')=>{
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for(let i = 1; i < path.length; i++){
        ctx.lineTo(...path[i])
    }
    ctx.lineCap = 'round';
    ctx.linneJoin = 'round';
    ctx.stroke();
}

draw.paths =(ctx,paths,color = '#0B004D')=>{
    for (const path of paths){
        draw.path(ctx,path,color)
    }
}


if(typeof module !== 'undefined'){
    module.exports =  draw;
}
