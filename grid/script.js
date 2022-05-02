PixelArt("grid", 10, 10)
            function PixelArt(el, rows, cols) {
                let blockColorCode = -1;
                let draw = false;
                const main_grid = document.getElementById(el) 
                const fragment = document.createDocumentFragment();
                const temp_row = rows - 1; 
                //const colors_arr = ['cerulean', 'Navy', 'red', 'aqua', 'black', 'pear', 'blue', 'orange', 'green', 'cerulean_blue']
                const colors_code = ['2a52be', '000080', 'FF0000', '00FFFF', '000000', 'd1e231', '0000FF', 'FFA500', '00FF00', '2a52be']
                main_grid.style = 'grid-template-columns : repeat('+cols+', 1fr)'
                for(let i = 1; i <= temp_row * cols; i++){
                    const grid_row = document.createElement('div')
                    grid_row.classList.add('grid-row')
                    grid_row.id = 'grid_' + i
                    fragment.appendChild(grid_row)
                }
                for(let j = 1; j <= rows; j++){
                    const color = colors_code[j - 1]
                    const colored_row = document.createElement('div')
                    colored_row.dataset.rowColor = color
                    colored_row.dataset.rowNum = j;
                    colored_row.style.backgroundColor = color;
                    colored_row.classList.add('rows_color')
                    colored_row.classList.add('grid-row')
                    colored_row.id = color
                    fragment.appendChild(colored_row)
                }
                main_grid.appendChild(fragment)
                main_grid.addEventListener('click', onClickGrid)
                main_grid.addEventListener('mouseover', onDragoverGrid)
                main_grid.addEventListener('mousdown', onDragGrid)
                
                window.addEventListener("mousedown", function(){
                    draw = true
                })
                window.addEventListener("mouseup", function(){
                    draw = false
                })

                function onClickGrid(e){
                    console.log('onclick')
                    const blockColorId = e.target.id
                    console.log(blockColorId)
                    if( !blockColorId.includes("grid")){
                        blockColorCode = e.target.id
                    }else{
                        document.getElementById(blockColorId).style.backgroundColor = blockColorCode
                    }
                    console.log(blockColorCode)   
                }

                function onDragGrid(e){
                    console.log('inside ondragGrid')
                    const blockColorId = e.target.id
                    console.log(blockColorId)
                    if( !blockColorId.includes("grid")){
                        blockColorCode = e.target.id
                    }else{
                        document.getElementById(blockColorId).style.backgroundColor = blockColorCode
                    }
                }

                function onDragoverGrid(e){
                    if(!draw) return
                    onDragGrid(e)
                }
            }