import App from './app/app';

import './styles.less';

const enableReorder = (listElement: HTMLElement, callback: (items: string[]) => void ): () => void => {

    let app: App = new App(listElement, callback);

    let disableReorder = (app: App) => () => {
        app.destroy();
    };

    return disableReorder(app);
};

const listElement: HTMLElement = document.getElementById("listElements");

const disableReorder = enableReorder(listElement,(items: string[]) => {
    console.log(items);
});

/*
setTimeout(() => {
    disableReorder()
}, 5000);*/
