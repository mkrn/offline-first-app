import React from "react";
import { RouteComponentProps } from "react-router";
import { Drawer, Classes } from "@blueprintjs/core";

interface WraperProps {
  children: JSX.Element;
  title: string;
}

export type PanelWrapperProps = RouteComponentProps & WraperProps;

// Wrap an element into sidebar Drawer
const PanelWrapper = (props: PanelWrapperProps) => (
  <Drawer
    isOpen={true}
    lazy={true}
    usePortal={true}
    title={props.title}
    onClose={() => props.history.push("/")}
    canOutsideClickClose={true}
    canEscapeKeyClose={true}
  >
    <div className={Classes.DRAWER_BODY}>
      <div className={Classes.DIALOG_BODY}>{props.children}</div>
    </div>
  </Drawer>
);

export default PanelWrapper;
