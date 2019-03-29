'use strict';

import TODOList from './TODOList'

const todoListService = new TODOList();

const todoListElement = document.getElementById('todo-list');

todoListElement.addEventListener('click', function(event) {
    let remove = getTarget(event.target, ".todo-item-remove-button");
    if (remove) {
        removeItem(getTarget(event.target));
    } else {
        let target = getTarget(event.target);
        if (target) {
            ChangeIsChecked(target);
        }
    }
});

window.addEventListener('load', function(event) {
    loadItems();
});

const addform = document.forms.addItemForm;

addform.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(addform);
    addItem(formData);
});

function getTarget(originalTarget, param = ".todo-item") {
    return originalTarget.closest(param);
}

async function addItem(formData) {
    let item = await todoListService.add(formData.get("title"), formData.get("date"));
    let todoitem = createToDoItem(item);
    todoListElement.insertBefore(todoitem, todoListElement.firstChild);
}

async function removeItem(target) {
    let id = target.getAttribute('id');
    await todoListService.delete(id);
    target.parentNode.removeChild(target);
}

async function loadItems() {
    let items = await todoListService.get();
    for (var i = 0; i < items.length; i++) {
        let todoitem = createToDoItem(items[i]);
        todoListElement.appendChild(todoitem);
    }
}

function createToDoItem({ date, title, id, isChecked }) {
    let template = getItemTemplate();
    let itTemplate = template.cloneNode(true);
    itTemplate.setAttribute("id", id);
    let titleElement = itTemplate.querySelector(".todo-item-title");
    titleElement.appendChild(getTitleElement(title));
    let dateElement = itTemplate.querySelector(".todo-item-date");
    dateElement.appendChild(getDateElement(date));
    if (isChecked) {
        toggleItem(itTemplate);
    }
    return itTemplate;
}

function getTitleElement(title) {
    var elem = document.createElement("h1");
    elem.innerHTML = title;
    return elem;
}

function getDateElement(date) {
    const formatter = new Intl.DateTimeFormat(getLang())
    var elem = document.createElement("span");
    elem.innerHTML = formatter.format(date);
    return elem;
}

function getLang() {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    } else {
        return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'ru';
    }
}

function getItemTemplate() {
    let itemTemplate = document.getElementById("todo-item-template").cloneNode(true);
    itemTemplate.removeAttribute("id");
    itemTemplate.classList.remove("hide");
    return itemTemplate;
}

async function ChangeIsChecked(target) {
    toggleItem(target);
    await todoListService.changeChecked(target.getAttribute('id'));
}

function toggleItem(target) {
    var title = target.querySelector(".todo-item-title");
    title.classList.toggle("through-text");
}
