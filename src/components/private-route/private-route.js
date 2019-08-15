import React from "react";
import { useSelector } from "react-redux";
import {
    Route,
    Redirect,
} from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.user);
    return (
        <>
        {
            !auth.firstLoad ?
            <></>
            :
            (
                <Route
                    {...rest}
                    render={props =>
                        auth.authenticated ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                    }
                />
            )

        }
        </>
    );
}

export default PrivateRoute;