import { createElement } from "react";
import EmptyListPlaceholderComponent from "./components/EmptyListPlaceholderComponent";

import { EmptyListPlaceholderContainerProps } from "../typings/EmptyListPlaceholderProps";

import "./ui/EmptyListPlacholder.css";

const EmptyListPlaceholder = (props: EmptyListPlaceholderContainerProps): JSX.Element => {
    return (
        <EmptyListPlaceholderComponent
            listClass={props.listClass ? props.listClass : ""}
            includeParent={props.includeParent}
            placeholder={props.placeholder ? props.placeholder : <div />}
            widgetMode={props.widgetMode}
        />
    );
};

export default EmptyListPlaceholder;
