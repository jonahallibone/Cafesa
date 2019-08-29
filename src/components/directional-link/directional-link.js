import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import styles from "./directional-link.module.css";
import sharedStyles from "../../shared-styles/shared-styles.module.css";

const DirectionalLink = ({direction = "left", size, children, ...rest}) => {
    return (
        <span className={`${styles.directional_link} ${sharedStyles.directional_link} ${sharedStyles.text_grey} d-flex align-items-center`}>
            { direction === "left" 
                ? 
                <ChevronLeft size={size} className={styles.directional_link__icon} /> 
                : 
                <ChevronRight size={size} className={styles.directional_link__icon} /> 
            }
            {children}
        </span>
    )
}

export default DirectionalLink;