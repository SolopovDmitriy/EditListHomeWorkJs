var createDomElement = function(tagName, options, parent = null) {
    var el = document.createElement(tagName);
    
    for (const key in options) {
        el.setAttribute(key, options[key]);
    }
 
    if(parent !== null) parent.appendChild(el);
    return el;
}

var Controls = {};
Controls.ADD = createDomElement('img', {
    class:'controls',
    src:'img/add.png',
    alt:'создать элемент',
    title:'создать новый элемент'
});
Controls.EDIT = createDomElement('img', {
    class:'controls',
    src:'img/edit.png',
    alt:'редактировать элемент',
    title:'редактировать текущий элемент'
});
Controls.DELETE = createDomElement('img', {
    class:'controls',
    src:'img/delete.png',
    alt:'удалить элемент',
    title:'удалить текущий элемент'
});
Controls.UP = createDomElement('img', {
    class:'controls',
    src:'img/up.png',
    alt:'переместить вверх',
    title:'переместить вверх'
});
Controls.DOWN = createDomElement('img', {
    class:'controls',
    src:'img/down.png',
    alt:'переместить вниз',
    title:'переместить вниз'
});