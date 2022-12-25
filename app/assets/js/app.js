window.$ = window.jQuery = require("jquery");

document.addEventListener("DOMContentLoaded",function(event){
    window.myApp = {};
    const ar_filtered = filterModule(getAllModule());
    importModuleCommon(ar_filtered);
});

function importModuleCommon(list) {
    for (let i = 0; i < list.length; i++) {
        window.myApp[list[i]] = new(require(`./modules/common/${list[i]}`).default)()
    }
}

function filterModule(list) {
    let ar = [];
    for (let i = 0; i < list.length; i++) {
        let attr = list[i];
        if (ar.indexOf(attr.toString()) === -1) {
            ar.push(attr);
        }
    }
    return ar;
}

function getAllModule(dataSetName = 'data-module') {
    let list = document.querySelectorAll(`[${dataSetName}]`);
    let ar = [];
    for (let i = 0; i < list.length; i++) {
        let splitList = list[i].getAttribute(`${dataSetName}`).split(" ");
        for (let j = 0; j < splitList.length; j++) {
            if (splitList[j].trim().length != 0) {
                ar.push(splitList[j]);
            }
        }
    }
    return ar;
}
