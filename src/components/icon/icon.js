import React from "react";
import styles from "./icon.module.css";

const Icon = ({name, color, children, style}) => {
    return (
        <div className={styles.icon} {...style} >
            {children}
        </div>
    )
}

export default Icon