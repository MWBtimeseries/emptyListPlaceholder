import { Component, ReactNode, createElement, ReactFragment } from "react";

export interface EmptyListComponentProps {
    listClass: string;
    placeholder: ReactFragment;
}

export class EmptyListPlaceholderComponent extends Component<EmptyListComponentProps> {
    observer!: MutationObserver;
    componentId = "EmptyList" + Math.floor(Math.random() * 1000000);

    componentDidMount(): void {
        const listView = document.querySelector("." + this.props.listClass) as HTMLElement;
        const displayType = listView.style.display;
        listView.style.display = "none";
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationsList: any): void => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const placeholder = document.getElementById(this.componentId) as HTMLElement;
                    if (listView?.querySelector(".mx-listview-empty")) {
                        placeholder.style.display = "block";
                        listView.style.display = "none";
                    } else {
                        placeholder.style.display = "none";
                        listView.style.display = displayType;
                    }
                }
            }
        };
        this.observer = new MutationObserver(callback);
        this.observer.observe(listView, config);
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
