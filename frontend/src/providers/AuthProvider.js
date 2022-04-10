import * as React from "react";
import {Navigate, useLocation} from "react-router-dom";

const AuthContext = React.createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(false);

    const signIn = (newUser, callback) => {
        return new Promise((callback) => {
            setUser(newUser);
            callback();
        });
    };

    const signOut = () => {
        return new Promise((callback) => {
            setUser(null);
            callback();
        });
    };

    const value = {user, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({children}) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

