import { createElement, ReactFragment, useEffect, useRef } from "react";

export interface EmptyListComponentProps {
    listClass: string;
    includeParent: boolean;
    placeholder: ReactFragment;
    widgetMode: string;
}

const EmptyListPlaceholderComponent = (props: EmptyListComponentProps): JSX.Element => {
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listView = document.querySelector("." + props.listClass) as HTMLElement;

        if (!listView) {
            console.error("EmptyListPlaceholder: No element found with class " + props.listClass);
            return;
        }

        const element = props.includeParent ? listView.parentElement : listView;
        if (!element) {
            console.error("EmptyListPlaceholder: Element with class " + props.listClass + "has no parent element");
            return;
        }

        const displayType = element.style.display;
        element.style.display = "none";

        const callback = (mutationsList: any): void => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const placeholder = placeholderRef.current as HTMLElement;
                    if (isEmptyList(listView)) {
                        placeholder.style.display = props.widgetMode === "emptylist" ? "block" : "none";
                        element.style.display = "none";
                    } else {
                        placeholder.style.display = props.widgetMode === "notemptylist" ? "block" : "none";
                        if (displayType !== "none") {
                            element.style.display = displayType;
                        }
                    }
                }
                break;
            }
        };
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(callback);
        observer.observe(element, config);

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    const isEmptyList = (listView: HTMLElement): boolean => {
        return !!(
            (listView.classList.contains("mx-listview") && listView?.querySelector(".mx-listview-empty")) ||
            (listView.classList.contains("mx-templategrid") && listView?.querySelector(".mx-templategrid-empty"))
        );
    };

    return <div ref={placeholderRef}>{props.placeholder}</div>;
};

export default EmptyListPlaceholderComponent;
