import React from "react";
import styles from "./button.module.css";
import {Link} from "react-router-dom";

const Button = ({type="button", to = null, children, style="", onClick}) => {
    switch(type) {
        case "link": 
            return <LinkButton style={style} to={to}>{children}</LinkButton>
        default:
            return <DefaultButton style={style} to={to} onClick={onClick}>{children}</DefaultButton>
    }
}

const getStyle = style => {
    return style.length ? styles[style] : "";
}

const LinkButton = ({to, children, style}) => {
    return(
        <Link to={to} className={`${styles.button} ${styles.button__link} ${ getStyle(style) }`}>
            {children}
        </Link>
    )
}

const DefaultButton = ({children, style, onClick}) => {
    return (
        <div className={`${styles.button} ${ getStyle(style) }`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button;