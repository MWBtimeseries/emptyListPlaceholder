import { Component, ReactNode, createElement, ReactFragment } from "react";

export interface EmptyListComponentProps {
    listClass: string;
    includeParent: boolean;
    placeholder: ReactFragment;
}

export class EmptyListPlaceholderComponent extends Component<EmptyListComponentProps> {
    observer!: MutationObserver;
    componentId = "EmptyList" + Math.floor(Math.random() * 1000000);

    componentDidMount(): void {
        let element = document.querySelector("." + this.props.listClass) as HTMLElement;
        if (this.props.includeParent) {
            element = element.parentElement as HTMLElement;
        }
        const displayType = element.style.display;
        element.style.display = "none";
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationsList: any): void => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const placeholder = document.getElementById(this.componentId) as HTMLElement;
                    if (element?.querySelector(".mx-listview-empty")) {
                        placeholder.style.display = "block";
                        element.style.display = "none";
                    } else {
                        placeholder.style.display = "none";
                        element.style.display = displayType;
                    }
                }
            }
        };
        this.observer = new MutationObserver(callback);
        this.observer.observe(element, config);
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
