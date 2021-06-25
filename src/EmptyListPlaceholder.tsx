import { Component, ReactNode, createElement } from "react";
import { EmptyListPlaceholderComponent } from "./components/EmptyListPlaceholderComponent";

import { EmptyListPlaceholderContainerProps } from "../typings/EmptyListPlaceholderProps";

export default class EmptyListPlaceholder extends Component<EmptyListPlaceholderContainerProps> {
    render(): ReactNode {
        return (
            <EmptyListPlaceholderComponent
                listClass={this.props.listClass ? this.props.listClass : ""}
                placeholder={this.props.placeholder ? this.props.placeholder : <div />}
            />
        );
    }
}
