import React from "react";
import styles from "./button.module.css";
import {Link} from "react-router-dom";

const Button = ({type="button", to = null, children, onClick, ...rest}) => {
    switch(type) {
        case "link": 
            return <LinkButton to={to} {...rest}>{children}</LinkButton>
        default:
            return <DefaultButton to={to} onClick={onClick} {...rest}>{children}</DefaultButton>
    }
}

const LinkButton = ({to, children}) => {
    return(
        <Link to={to} className={`${styles.button} ${styles.button__link}`}>
            {children}
        </Link>
    )
}

const DefaultButton = ({children, onClick, ...rest}) => {
    return (
        <div className={`${styles.button}`} onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export default Button;