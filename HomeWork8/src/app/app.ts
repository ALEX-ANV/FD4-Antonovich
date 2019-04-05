import DraggingItem from '../item';

interface IDraggableList {
    destroy: () => void;
    handleDragEnd: () => void;
    dragOverItemHandler: (elem: DraggingItem) => void;
    draggingItem: (elem: DraggingItem) => void;
}


export default class App implements IDraggableList {

    private elements: DraggingItem[] = new Array<DraggingItem>();
    private activeItem: DraggingItem;

    constructor(
        private rootElement: HTMLElement,
        private callback: (items: string[]) => void) {
        rootElement.querySelectorAll('[data-value]')
            .forEach(item => {
                this.elements.push(new DraggingItem(item, this.dragOverItemHandler, this.draggingItem));
            });

        this.rootElement.addEventListener("dragend", this.handleDragEnd, false);
    }

    public destroy = (): void => {
        this.elements.forEach(item => {
            item.destroy();
        })
    };

    handleDragEnd = (): void => {
        let tmpArray = new Array<DraggingItem>();
        this.rootElement.querySelectorAll('[data-value]').forEach((item: Element) => {
            let draggingElement = this.elements.find(x => x.dataValue === item.getAttribute("data-value"));
            tmpArray.push(draggingElement);
        });
        this.elements = tmpArray;
        this.callback(this.elements.map(t => t.dataValue))
    };

    dragOverItemHandler = (elem: DraggingItem): void => {
        this.replaceItems(elem);
    };

    draggingItem = (elem: DraggingItem): void => {
        this.activeItem = elem;
    };

    private replaceItems = (elem: DraggingItem): void => {
        this.replaceElements(elem);
    };

    private replaceElements = (elem: DraggingItem): void => {
        if (this.activeItem != elem) {
            if (this.isBefore(this.activeItem.element, elem.element))
                this.rootElement.insertBefore(this.activeItem.element, elem.element);
            else
                this.rootElement.insertBefore(this.activeItem.element, elem.element.nextSibling);
        }
    };

    private isBefore = (el1: Element, el2: Element): boolean => {
        if (el2.parentNode === el1.parentNode)
            for (let cur = el1.previousSibling; cur; cur = cur.previousSibling)
                if (cur === el2)
                    return true;
        return false;
    };
};