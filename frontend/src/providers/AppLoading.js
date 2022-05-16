import {createContext, useContext, useMemo, useState} from "react";

const AppLoadingContext = createContext({
    appLoading: false, setAppLoading: () => {
    }
});


export const useAppLoading = () => {
    const {appLoading, setAppLoading} = useContext(AppLoadingContext);
    return setAppLoading;
}


export const useAppLoadingState = () => {
    const {appLoading, setAppLoading} = useContext(AppLoadingContext);
    return appLoading;
}

export default function AppLoadingProvider({children}) {
    const [appLoading, setAppLoading] = useState(false);
    const value = useMemo(() => ({appLoading, setAppLoading}), [appLoading]);
    return (<AppLoadingContext.Provider value={value}>
            {children}
        </AppLoadingContext.Provider>);
}


