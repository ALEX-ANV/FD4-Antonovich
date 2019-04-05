import './styles.less'

interface IDraggableItem {
    readonly dataValue: string;
    readonly element: Element;
    handleDragLeave: (e: DragEvent) => void;
    handleDragEnter: (e: DragEvent) => void;
    destroy: () => void;
}


export default class DraggingItem implements  IDraggableItem {
    constructor(private htmlElement: Element,
                private dragOverHandler: (e: DraggingItem) => void,
                private draggingItem: (elem: DraggingItem) => void) {
        this.htmlElement.setAttribute("draggable", "true");
        this.htmlElement.addEventListener('dragstart', this.handleDragStart, false);
        this.htmlElement.addEventListener('dragenter', this.handleDragEnter, false);
        this.htmlElement.addEventListener('dragleave', this.handleDragLeave, false);
    }

    get dataValue(): string {
        return this.htmlElement.getAttribute("data-value");
    };

    get element(): Element {
        return this.htmlElement;
    }

    handleDragLeave = (e: DragEvent): void => {
        e.preventDefault();

        this.htmlElement.classList.remove('over');
    };

    handleDragEnter = (e: DragEvent): void => {
        e.preventDefault();

        this.htmlElement.classList.add('over');
        e.dataTransfer.dropEffect = 'move';
        this.dragOverHandler(this);
    };

    handleDragStart = (e: DragEvent): void => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.htmlElement.cloneNode(true).toString());
        this.draggingItem(this);
    };

    public destroy = (): void => {
        this.htmlElement.removeEventListener('dragstart', this.handleDragStart, false);
        this.htmlElement.removeEventListener('dragenter', this.handleDragEnter, false);
        this.htmlElement.removeEventListener('dragleave', this.handleDragLeave, false);
        this.htmlElement.classList.remove("over");
    };
}