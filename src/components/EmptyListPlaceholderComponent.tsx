import { Component, ReactNode, createElement, ReactFragment } from "react";

export interface EmptyListComponentProps {
    listClass: string;
    includeParent: boolean;
    placeholder: ReactFragment;
    widgetMode: string;
}

export class EmptyListPlaceholderComponent extends Component<EmptyListComponentProps> {
    observer!: MutationObserver;
    componentId = "EmptyList" + Math.floor(Math.random() * 1000000);

    componentDidMount(): void {
        const listView = document.querySelector("." + this.props.listClass) as HTMLElement;
        if (!listView) {
            console.error("EmptyListPlaceholder: No element found with class " + this.props.listClass);
            return;
        }
        const element = this.props.includeParent ? listView.parentElement : listView;
        if (!element) {
            console.error("EmptyListPlaceholder: Element with class " + this.props.listClass + "has no parent element");
            return;
        }
        const displayType = element.style.display;
        element.style.display = "none";
        const callback = (mutationsList: any): void => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const placeholder = document.getElementById(this.componentId) as HTMLElement;
                    if (this.displayPlaceholder(listView)) {
                        placeholder.style.display =  this.props.widgetMode === "notemptylist" ? "block" : "none";
                        element.style.display = "none";
                    } else {
                        placeholder.style.display =  this.props.widgetMode === "notemptylist" ? "none" : "block";
                        if (displayType !== "none") {
                            element.style.display = displayType;
                        }
                    }
                }
                break;
            }
        };
        const config = { attributes: true, childList: true, subtree: true };
        this.observer = new MutationObserver(callback);
        this.observer.observe(element, config);
    }

    displayPlaceholder(listView: HTMLElement): boolean {
        return !!(
            (listView.classList.contains("mx-listview") && listView?.querySelector(".mx-listview-empty")) ||
            (listView.classList.contains("mx-templategrid") && listView?.querySelector(".mx-templategrid-empty"))
        );
    }

    componentWillUnmount(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render(): ReactNode {
        return <div id={this.componentId}>{this.props.placeholder}</div>;
    }
}
