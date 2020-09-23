(function () {
    window.addEventListener('load', function () {
        var entryPoint = document.querySelector('.wrapper');// cамый внешний прямоугольник
        if (entryPoint === null) return;
        var contrBlock = createDomElement('div', {// верхний прямоугольник
            class: 'controls-block'
        }, entryPoint);

        var inputBlock = createDomElement('div', {
            class: 'data-block center-div'
        }, entryPoint);

        var dataTableBlock = createDomElement('div', {//жирный нижний прямоугольник 
            class: 'data-block'
        }, entryPoint);

        contrBlock.appendChild(Controls.ADD);//делаем детьми верхнего прямоугольника
        contrBlock.appendChild(Controls.EDIT);
        contrBlock.appendChild(Controls.DELETE);
        contrBlock.appendChild(Controls.UP);
        contrBlock.appendChild(Controls.DOWN);

        var nameInput = createDomElement('input', {
            class: 'inputs',
            placeholder: 'ФИО'
        }, inputBlock);
        var emailInput = createDomElement('input', {
            class: 'inputs',
            placeholder: 'Email'
        }, inputBlock);
        var phoneInput = createDomElement('input', {
            class: 'inputs',
            placeholder: 'Контактный телефон'
        }, inputBlock);
        var okButton = createDomElement('button', {
            class: 'inputs'
        }, inputBlock);
        okButton.innerHTML = 'OK';

        var dataTable = createDomElement('table', {//тонкая таблица
            class: 'data-block-table'
        }, dataTableBlock);

        var headRow = createDomElement('tr', {}, dataTable);//первая строка таблицы, заголовочна. там где ФИО, номер и т.д.
        var headCells = [];//создаем заголовочные столбцы, первой заголовочной строки, th - отвечает за столбец
        for (var i = 0; i < DataList.header.length; i++) {
            headCells[i] = createDomElement('th', {}, headRow);// создаем заполняем массив столбцов, которые будут хранится внутри заголовчной строки, там где ФИО, номер и т.д.
            headCells[i].innerHTML = DataList.header[i];// запоняем достаем название для стобца заголовочной строки
        }

        var bodyRow = [];
        var bodyCells = [];

        DataList.list.forEach(function (item, index) {
            bodyRow[index] = createDomElement('tr', {}, dataTable);
            bodyCells[index] = [];

            bodyCells[index][0] = createDomElement('td', {}, bodyRow[index]);//ПЕтров єто 1 первій єлемент столбца первой строки, там где ПЕтров
            bodyCells[index][0].innerHTML = index + 1;//разные строки первый столбец индекс это строка

            for (const key in DataList.list[index]) {
                var td = createDomElement('td', {}, bodyRow[index]);
                td.innerHTML = DataList.list[index][key];
                bodyCells[index].push(td);
            }
        });
        var selectedRow = null;
        bodyRow.forEach(function (item, index) {
            item.addEventListener('click', function (e) {
                if (selectedRow == null) {
                    item.classList.add('selectedRow');
                    selectedRow = item;
                } else if (selectedRow == item) {
                    item.classList.remove('selectedRow');
                    selectedRow = null;
                } else {
                    selectedRow.classList.remove('selectedRow');
                    item.classList.add('selectedRow');
                    selectedRow = item;
                }
            });
        });

        let bodyRowLength = bodyRow.length - 1;

        okButton.addEventListener('click', function(e) {
            if (!nameInput.value ||
                !emailInput.value ||
                !phoneInput.value) return; // проверка на входные данные

            const index = bodyRowLength;

            bodyRow[index] = createDomElement('tr', {}, dataTable);
            
            bodyCells[index][0] = createDomElement('td', {}, bodyRow[index]);
            bodyCells[index][0].innerHTML = index + 2;

            const values = [nameInput.value, emailInput.value, phoneInput.value];

            for (const value of values) {
                const td = createDomElement('td', {}, bodyRow[index]);
                td.innerHTML = value;
                bodyCells[index].push(td);
            }
        });

        Controls.DELETE.addEventListener('click', function () {
            if (selectedRow != null) {
                
                var next = selectedRow.nextSibling;
                while(next != null){
                    next.firstChild.innerHTML = parseInt(next.firstChild.innerHTML) -1;       
                    
                    next = next.nextSibling;
                }
                dataTable.removeChild(selectedRow);
                selectedRow = null;
            }
        });
        Controls.UP.addEventListener('click', function(){
            if(selectedRow == null) return;
            if(selectedRow.previousSibling == headRow) return;
            
            selectedRow.previousSibling.classList.add('selectedRow');
            selectedRow.classList.remove('selectedRow');
            //for
            selectedRow = selectedRow.previousSibling;
        });
        Controls.DOWN.addEventListener('click', function() {
            if(selectedRow == null) return;
            if(selectedRow.nextSibling == headRow) return;
            
            selectedRow.nextSibling.classList.add('selectedRow');
            selectedRow.classList.remove('selectedRow');
            //for
            selectedRow = selectedRow.nextSibling;
        })
    });
})()
