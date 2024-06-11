class SketchPad{
    constructor(container,size=400){
        this.canvas = document.createElement('canvas');
        this.canvas.width =  size ;
        this.canvas.height = size;
        // Styles for the canvas
        this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 10px 2px black;
        `;

        container.appendChild(this.canvas);

        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);


        this.undoBtn = document.createElement('button');
        this.undoBtn.innerHTML = 'UNDO';
        container.appendChild(this.undoBtn);



        // To draw on this contex, use 2d contex, and store inside the object
        this.ctx = this.canvas.getContext('2d')


        this.reset();

        // add event listeners to ditect mouse actions
        // Use private function here

        this.#addEventListeners()



    }

    reset(){
        this.paths = [];
        this.isDrawing =  false;
        // To disable the button when refresh
        this.#redraw();
    }

    #addEventListeners(){
        this.canvas.onmousedown = (evt)=>{
            const mouse = this.#getMouse(evt)
            // Initialize the mouse path with starting point
            this.paths.push([mouse]);
            this.isDrawing =  true
        }
        this.canvas.onmousemove = (evt)=>{
            if(this.isDrawing){
                const mouse = this.#getMouse(evt)
                const lastPath = this.paths[this.paths.length-1]
                // Add mouse to the path
                lastPath.push(mouse);
                this.#redraw()
            }
        }


        // Here if we use canvas.onmouseup, then when I click and drag outside of the canvas,then it
        // still will draw even after I release the mouse
        document.onmouseup = ()=>{
            this.isDrawing =  false;
        }

        // write event listeners to handle touching

        this.canvas.ontouchstart=(evt)=>{
            // we get location from first touch since multiple touches are
            // possible in mobile devices
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove=(evt)=>{
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        document.ontouchend=()=>{
            document.onmouseup();
        }

        this.undoBtn.onclick =()=>{
            this.paths.pop();
            this.#redraw();
        }

    }
    
    #redraw(){
        // Here we clear the canvas in every click.
        // Modify If you want
        this.ctx.clearRect(0,0,
            this.canvas.width,this.canvas.height
        );

        draw.paths(this.ctx,this.paths);

        // Disabled th undo btn if the length is 0;

        if(this.paths.length > 0){
            this.undoBtn.disabled = false;
        }else{
            this.undoBtn.disabled = true;
        }
    }

    #getMouse=(evt)=>{
        // getBoundingClientRect is used to get the position of the canvas relative to the viewport.
        const rect = this.canvas.getBoundingClientRect();
        return [
                // X cordinate of the mouse relative to the canvas
                // We just use integers, so use Math.round
                Math.round(evt.clientX-rect.left),
                // Y coordinates
                Math.round(evt.clientY - rect.top)
            ];
    }


}