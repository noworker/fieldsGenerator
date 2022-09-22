import React, { useMemo } from "react"
import './header.css'

const Header: React.FC = () =>{
    return useMemo(() => {
        return (
            <header className="">
                <div className="header-container">
                  FieldsGenerator
                </div>
            </header>
        )
    },[])
    
}

export default Header;