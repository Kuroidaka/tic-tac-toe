(() => {
    const _this = this
    let currentRole = true
    let isWin = false
    let isDraw = false
    let rowArr = [
        {
            colArr : [
                {
                    id: "0",
                    check: false,
                    role: ''
                },{
                    id: "1",
                    check: false,
                    role: ''
                },{
                    id: "2",
                    check: false,
                    role: ''
                }
            ]
        },{
            colArr : [
                {
                    id: "0",
                    check: false,
                    role: ''
                },{
                    id: "1",
                    check: false,
                    role: ''
                },{
                    id: "2",
                    check: false,
                    role: ''
                }
            ]
        },{
            colArr : [
                {
                    id: "0",
                    check: false,
                    role: ''
                },{
                    id: "1",
                    check: false,
                    role: ''
                },{
                    id: "2",
                    check: false,
                    role: ''
                }
            ]
        }
    ]

    start = async () => {
        if(rowArr)
        _this.render()
        
    }

    checkDraw = () => {
        if(!rowArr.some(row => row.colArr.some(col => col.role === ''))) {
            isDraw = true
        }
        
    }

    checkVertical = (num, role, X, Y) => {
        let count = 0;
        for (let i = 0 ; i < num ; i ++) {
            if (role === rowArr[i].colArr[X].role ) count ++
        }
        console.log("|", count);
        if(count === num ) isWin = true
    }

    checkHorizontal = (num, role, X , Y) => {
        let count = 0;
        for (let i = 0 ; i < num ; i ++) {
            if (role === rowArr[Y].colArr[i].role ) count ++
        }
        console.log("-", count);
        if(count === num ) isWin = true
    }

    checkRightSlice = (num, role, X , Y) => {
        let count = 0;
        for (let i = 0 ; i < num ; i ++) {
            if (role === rowArr[i].colArr[i].role ) count ++
        }
        console.log("\\", count);
        if(count === num ) isWin = true
    }

    checkLeftSlice = (num, role, X , Y) => { 
        let count = 0;
        for (let i = 0 ; i < num ; i ++) {
            if (role === rowArr[i].colArr[num - i -1 ].role ) count ++
        }
        console.log("/", count);
        if(count === num ) isWin = true
    }

    showDraw = () => {
        const notify = document.querySelector(".notify")
         notify.querySelector(".title").textContent= "Draw"

         show = (role) => {
            console.log("role in show ", role);
            notify.setAttribute("style", "display: flex")
            notify.querySelector(".role").classList.add(role)    
           
        }

        close = () => {
            notify.setAttribute("style", "display: none")
            notify.querySelector(".role").classList.remove(role)  
        }

        this.show()
        
        _this.handleClickContinue()
    }

    showWinner = (role) => {
        const notify = document.querySelector(".notify")


        show = (role) => {
            console.log("role in show ", role);
            notify.setAttribute("style", "display: flex")
            notify.querySelector(".role").classList.add(role)    
           
        }

        close = () => {
            notify.setAttribute("style", "display: none")
            notify.querySelector(".role").classList.remove(role)  
        }

        clearData = () => {
            rowArr = rowArr.map(row => {
                const data = row.colArr.map(col => {
                    col.role = ''
                    return col
                })
                console.log("data", data);
                return data
            })
        }

        this.show(role)
       
        _this.handleClickContinue()
    }

    handleClickContinue = () => {
        const notify = document.querySelector(".notify")
        const btn = notify.querySelector(".btn")

        btn.addEventListener("click", async () => {
            // isWin = false
            // this.close()
            // this.clearData()
            // _this.start()
            location.reload();
        })
    }

    actionHandle = () => {
        const handleClickCell = () => {
            const cellList = document.querySelectorAll(".cell")
            cellList && cellList.forEach(cell => {
                if(cell ) {
                    cell.addEventListener("click", async () => {
                        const row = cell.getAttribute('data-row')
                        const col = cell.getAttribute('data-col')
    
                        if(rowArr[row].colArr[col].role === '') {
                            rowArr[row].colArr[col].check = true
        
                            if(currentRole) {
                                rowArr[row].colArr[col].role = 'X'
                            }
                            else {
                                rowArr[row].colArr[col].role = 'O'
                            }
                            if(row&&col) handleWin(row, col, rowArr[row].colArr[col].role)
                            currentRole = !currentRole
                            
                            _this.render()

                            if(isWin) {
                                setTimeout(async () => {
                                    await showWinner(rowArr[row].colArr[col].role, "win")
                                }, 0)
                            }
                            else if(isDraw) {
                                setTimeout(async () => {
                                    console.log("show draw");
                                    await showDraw()
                                }, 0)
                            }
                        }
                    })
                }
            })
        }
        const handleWin = (row, col, role) => {  
        
            const vertical = false;
            let Y = Number(row)
            let X = Number(col)
            console.log( X, Y, role );

            checkVertical(3, role, X, Y);
            checkHorizontal(3, role, X, Y);
            checkRightSlice(3, role, X, Y);
            checkLeftSlice(3, role, X, Y);
            checkDraw() 

        }

        handleClickCell()
    }

    renderCol = (colArr, row) => {
        const data = colArr.map((cell) => {
            return `
            <td data-cell = ${cell.id}>
                <span class="cell" data-col=${cell.id} data-row=${row} >
                ${
                    cell.check ? `
                        ${cell.role === 'X'
                        ?'<i class="fa-solid fa-xmark"></i>' 
                        :' <i class="fa-solid fa-o"></i>'}
                    `
                    : ''
                }
                  
                </span>
            </td>
            `
        })

        return data.join('')
    }
    render = async () => {
        console.log("handle render", rowArr);
        const tableBody = document.querySelector(".game-content")
        const result = rowArr.map((row, idx) => {

            let rowHtml = '<tr>'
            rowHtml += renderCol(row.colArr, idx)
            rowHtml += '</tr>'

            return rowHtml 
        }).join('')
        tableBody.innerHTML = result

        await _this.actionHandle()
    }


    _this.start()

    
})()