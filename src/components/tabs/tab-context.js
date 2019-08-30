import React from "react";

export const TabContext = React.createContext({
    selectedTab: 0,
    setSelectedTab: () => {}
});