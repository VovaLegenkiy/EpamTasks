let info = `[
    {
        "ФИО": "Иванов И.М.",
        "Математика": "12",
        "Физика": "10",
        "Биология": "6"
    }, {
        "ФИО": "Петров А.Е.",
        "Математика": "10",
        "Физика": "11",
        "Биология": "11"
    }, {
        "ФИО": "Легенький В.С.",
        "Математика": "12",
        "Физика": "12",
        "Биология": "12"
    }
]`;
addEventListener("load", function () {


    function getData(data) {
        if (typeof data === "string") {
            return JSON.parse(data);
        }
        return data;
    }


    function createHeads(arr) {
        let thArr = [];
        let keys = Object.keys(arr[0]);
        let length = keys.length;
        for (let i = 0; i < length; i++) {
            let th = document.createElement("th");
            th.appendChild(document.createTextNode(keys[i]));
            thArr.push(th);
        }
        return thArr;
    }

    function createRows(arr, rowsAmount) {
        let trArr = [];
        for (let i = 0; i < rowsAmount; i++) {
            let tr = document.createElement("tr");
            trArr.push(tr);
        }
        return trArr;
    }

    function createCells(arr, cellAmount,data) {
        if(data) {
            let keys = Object.keys(arr[0]);
            let tdArr = [];
            for (let i = 0; i < cellAmount; i++) {
                let td = document.createElement("td");
                let text = data[keys[i]];
                let textNode = document.createTextNode(text);
                td.appendChild(textNode);
                tdArr.push(td);
            }
            return tdArr;
        }
        return;
    }


    function createTHead(arr) {
        let tr = document.createElement("tr");
        let thArr = createHeads(arr);
        for (let i = 0; i < thArr.length; i++) {
            tr.appendChild(thArr[i]);
        }
        return tr;
    }


    function createTBody(arr) {
        let arrLength = arr.length;
        let keys = Object.keys(arr[0]);
        let keysLength = keys.length;
        let cellsAmount = arrLength * keysLength;
        let rowIndex = 0;
        let cellIndex = 0;
        let trArr = createRows(arr, arrLength);
        let tdArr = createCells(arr, keysLength,arr[rowIndex]);
        //add cells in rows
        for (let i = 0; i < cellsAmount; i++) {
            trArr[rowIndex].appendChild(tdArr[cellIndex]);
            cellIndex++;
            if (cellIndex % keysLength === 0) {
                rowIndex++;
                cellIndex = 0;
                tdArr = createCells(arr, keysLength,arr[rowIndex]);
            }
        }
        return trArr;
    }


    function createTable(arr) {
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let thead = document.createElement("thead");
        let tHeadData = createTHead(arr);
        let tBodyData = createTBody(arr);
        thead.appendChild(tHeadData);

        for (let i = 0; i < tBodyData.length; i++) {
            tbody.appendChild(tBodyData[i]);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }


    function showResult(arr) {
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(createTable(arr));
    }

    let data = getData(info);
    showResult(data);

})