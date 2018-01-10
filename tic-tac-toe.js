addEventListener("load", function () {
    let row = 0;
    let tmp = 0;
    let cell = 0;
    let body = document.getElementsByTagName("body")[0];
    let div = document.createElement("div");
    class TicTacToe {
        constructor(number) {
            this.area = TicTacToe.createArea();
            this.number = number;
            this.moves = 0;

        }

        play(number) {
            let self = this;
            let sysNumber = Math.round(Math.random() * 8 + 1);
            let move = number ? "Player" : "System";
            self.number = number || sysNumber;
            row = Math.ceil(self.number / 3) - 1;
            tmp = self.number % 3;
            cell = tmp === 0 ? 2 : tmp - 1;
            let result = "";
            if (move === "Player") {
                if (!checkCell(self.area, row, cell)) {
                    self.play(+prompt("Клетка занята, повторите ввод", ""));
                }
                self.moves++;
                self.area[row][cell] = "X";
                drawArea(self.area);
                result = whoWin(self.area, self.moves);
                if (result) {
                    return result;
                }
                self.play();

            } else if (move === "System") {
                if (!checkCell(self.area, row, cell)) {
                    self.play();
                }
                self.area[row][cell] = "O";
                console.log(sysNumber);
                console.log(self.area);
                drawArea(self.area);
                self.moves++;
                result = whoWin(self.area, self.moves);
                if (result) {
                    return result;
                }
                return sysNumber;
            }


            function drawArea(area) {
                div.innerHTML = "";
                let table = document.createElement("table");
                for (let i = 0; i < area.length; i++) {
                    let tr = document.createElement("tr");
                    for (let j = 0; j < area[i].length; j++) {
                        let td = document.createElement("td");
                        let value = document.createTextNode(area[i][j]);
                        td.appendChild(value);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                div.appendChild(table);
                body.appendChild(div);
            }

            function whoWin(area, moves) {
                let result = "";
                if (moves >= 5 && moves <= 9) {
                    for (let i = 0; i < area.length; i++) {
                        if (area[i][0] === area[i][1] && area[i][1] === area[i][2]) {
                            result = area[i][0] === "X" ? "Player win" : area[i][0] === "O" ? "System win" : "";
                        } else if (area[0][i] === area[1][i] && area[1][i] === area[2][i]) {
                            result = area[0][i] === "X" ? "Player win" : area[0][i] === "O" ? "System win" : "";
                        }
                    }

                    if (area[0][0] === area[1][1] && area[1][1] === area[2][2]) {
                        result = area[0][0] === "X" ? "Player win" : area[0][0] === "O" ? "System win" : "";
                    } else if (area[0][2] === area[1][1] && area[1][1] === area[2][0]) {
                        result = area[0][2] === "X" ? "Player win" : area[0][2] === "O" ? "System win" : "";
                    }
                } else if (moves === 9) {
                    result = "Draw";
                }

                return result;
            }

            function checkCell(area, row, cell) {
                return typeof area[row][cell] !== "string";
            }


        }

        static createArea() {
            let area = [];
            let index = 1;
            for (let i = 0; i < 3; i++) {
                area[i] = [];
                for (let j = 0; j < 3; j++) {
                    area[i][j] = index;
                    index++;
                }
            }
            return area;
        }

    }

    console.log(`Task tic-tac-toe`);
    let game = new TicTacToe();

    function letsPlay() {
        let number = +prompt("Введите число для вашего хода или пусто для хода системы", "");
        let result = game.play(number);
        if (!(result === "Player win" || result === "System win" || result === "Draw")) {
            setTimeout(letsPlay, 1000);
        }
        console.log(result);
    }

    letsPlay();

});
