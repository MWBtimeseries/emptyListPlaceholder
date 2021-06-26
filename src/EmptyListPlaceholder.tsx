import { Component, ReactNode, createElement } from "react";
import { EmptyListPlaceholderComponent } from "./components/EmptyListPlaceholderComponent";

import { EmptyListPlaceholderContainerProps } from "../typings/EmptyListPlaceholderProps";

import "./ui/EmptyListPlacholder.css";

export default class EmptyListPlaceholder extends Component<EmptyListPlaceholderContainerProps> {
    render(): ReactNode {
        return (
            <EmptyListPlaceholderComponent
                listClass={this.props.listClass ? this.props.listClass : ""}
                includeParent={this.props.includeParent}
                placeholder={this.props.placeholder ? this.props.placeholder : <div />}
            />
        );
    }
}
