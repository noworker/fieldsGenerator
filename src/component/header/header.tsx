import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import './header.css'

const Header: React.FC = () =>{
    const {t} = useTranslation();
    return useMemo(() => {
        return (
            <header className="">
                <div className="header-container">
                    {t("header.title")}
                </div>
            </header>
        )
    },[t])
    
}

export default Header;