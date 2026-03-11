import React, { useCallback } from "react";
import { darkStyles, JsonView } from "react-json-view-lite";
import { Drawer } from "vaul";
import type { CoreSystemMapping } from "../types";

import s from "./SystemListElement.module.scss";
import "react-json-view-lite/dist/index.css";

function SystemListElement( props: {
    major: boolean,
    system: CoreSystemMapping
} ) {
    const shouldExpandNode: ( level: number, value: any, field?: string ) => boolean = useCallback(
        ( level ) => level <= 1,
        [],
    );

    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <li className={props.system.system.enabled ? s.enabled : ( props.major ? s.major : s.disabled )}>
                    {props.system.key}
                </li>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className={s.overlay} />
                <Drawer.Content className={s.content}>
                    <div className={s.innerContent}>
                        <Drawer.Handle />
                        <div className={s.body}>
                            <Drawer.Title className={s.title}>{props.system.key}</Drawer.Title>
                            <p className={s.description}>
                                This system is {props.system.system.enabled ? "enabled" : "disabled"}.
                            </p>
                            <p className={s.description}>
                                Raw system data:
                            </p>
                            <div className={s.json}>
                                <JsonView
                                    data={props.system.system}
                                    shouldExpandNode={shouldExpandNode}
                                    clickToExpandNode={true}
                                    style={darkStyles}
                                    compactTopLevel={true}
                                />
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

export default SystemListElement;
