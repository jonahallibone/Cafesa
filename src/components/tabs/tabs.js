import React, { 
    useContext, 
    useState, 
    useEffect
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./tabs.module.css";
import { TabContext } from "./tab-context";

export const TabHeader = ({children}) => {

    return (
        <Col xs="12">
            <div className={`${styles.tab_header} p-0 d-flex`}>
                {children}
            </div>
        </Col>
    )
}

export const TabTitle = ({children, title = "", selected = false}) => {
    const context = useContext(TabContext);
    const [isSelected, setIsSelected] = useState(false); 

    useEffect(() => {
        title === context.selectedTab ? setIsSelected(true) : setIsSelected(false);
    }, [title, context])
    
    return (
        <span 
        onClick={() => context.setSelectedTab(title)}
        className={`
        ${styles.tab_title} 
        ${isSelected ? styles.tab_title__selected : ""}
        `}>
            {children}
        </span>
    )
}  

export const TabContent = ({children}) => {
    return (
        <div className={styles.tab_content}>
            {children}
        </div>
    )
}

export const TabSection = ({children, title}) => {
    const context = useContext(TabContext);
    const [isSelected, setIsSelected] = useState(false); 

    useEffect(() => {
        title === context.selectedTab ? setIsSelected(true) : setIsSelected(false);
    }, [title, context])

    return (
        <Col xs="12" hidden={isSelected ? false : true}>
            {children}
        </Col>
    )
}


const Tabs = ({children, selected}) => {
    const [selectedTab, setSelectedTab] = useState(null);

    useEffect(() => {
        setSelectedTab(selected);
    }, [selected])

    const initialState = {
        selectedTab: selectedTab,
        setSelectedTab: setSelectedTab
    }
    
    return (
        <TabContext.Provider value={initialState}>
            <Container fluid="true" className="p-0">
                <Row>
                    {children}
                </Row>
            </Container>
        </TabContext.Provider>
    )
}

export default Tabs;