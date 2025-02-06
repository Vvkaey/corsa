"use client"

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";


type PageThemeType = 'dark'| 'light';

type GlobalUiType = {

pageTheme: PageThemeType;
setPageTheme : (theme : PageThemeType) => void;

headerCollapsable?: boolean;
setHeaderCollapsable: (value : boolean) => void;

headerVisible?: boolean;
setHeaderVisible: (value: boolean) => void;

headerHeight?: number;

liteUI?: boolean;
setLiteUI : (value : boolean) => void;

footerDisabled?: boolean;
setFooterDisabled: (value : boolean) => void;
}


export const GlobalUIContext = createContext<GlobalUiType>({
pageTheme : 'dark',
setPageTheme : () => undefined,

headerCollapsable : false,
setHeaderCollapsable :  () => undefined,

headerVisible: true,
setHeaderVisible : () => undefined,

headerHeight : 48,

liteUI: false,
setLiteUI : () => undefined,

footerDisabled: false,
setFooterDisabled: () => undefined,
})


export const GlobalUIProvider = ({
    children,
} : {
    children?: React.ReactNode;
}) => {
const [pageTheme, setPageTheme] = useState<PageThemeType>('dark');   
const [headerCollapsable, setHeaderCollapsable] = useState<boolean>(false);
const [liteUI, setLiteUI]= useState<boolean>(false);
const headerHeight = 48;
const [headerVisible, setHeaderVisible] = useState<boolean>(true);
const [footerDisabled, setFooterDisabled] = useState<boolean>(false) 

const pathName = usePathname()

useEffect(() => {
// set default on page change
setPageTheme('dark');
setHeaderCollapsable(false);
setLiteUI(false);
setHeaderVisible(true);
}, [pathName]);


const value = useMemo(() => (
    {
        pageTheme,
        setPageTheme,

        headerCollapsable,
        setHeaderCollapsable,

        headerVisible,
        setHeaderVisible,

        headerHeight,

        liteUI,
        setLiteUI,

        footerDisabled,
        setFooterDisabled
    } as const
),
[
    pageTheme,
    setPageTheme,

    headerCollapsable,
    setHeaderCollapsable,

    headerVisible,
    setHeaderVisible,

    headerHeight,

    liteUI,
    setLiteUI,

    footerDisabled,
    setFooterDisabled
])

return <GlobalUIContext.Provider value={value}>
    {children}
</GlobalUIContext.Provider>
}

export const useGloblUI = (
    params?: 
    {
      pageTheme?: PageThemeType;
      headerCollapsable?: boolean;
      liteUI?: boolean;
      footerDisabled?: boolean;
    }|
    undefined
) => {
    const GlobalUIClient = useContext(GlobalUIContext);
    const pathname = usePathname();

    useEffect(() => {
     if(params){
        if(params.pageTheme){
            GlobalUIClient.setPageTheme(params.pageTheme);
        }else{
            GlobalUIClient.setPageTheme('dark');
        }

        if(params.liteUI){
            GlobalUIClient.setLiteUI(params.liteUI);
        }else{
            GlobalUIClient.setLiteUI(false);
        }

        if(params.headerCollapsable){
            GlobalUIClient.setHeaderCollapsable(params.headerCollapsable);
        }else{
            GlobalUIClient.setHeaderCollapsable(false);
        }

        if(params.footerDisabled){
            GlobalUIClient.setFooterDisabled(params.footerDisabled);
        }else{
            GlobalUIClient.setFooterDisabled(false);
        }

        
     }else{
        GlobalUIClient.setPageTheme('dark');
        GlobalUIClient.setHeaderCollapsable(false);
        GlobalUIClient.setLiteUI(false);
        GlobalUIClient.setHeaderVisible(true);
     }
    }, [params, pathname, GlobalUIClient ])

return GlobalUIClient;
}