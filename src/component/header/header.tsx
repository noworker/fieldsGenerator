import React, { useMemo } from "react"
import './header.css'

const Header: React.FC = () =>{
    return useMemo(() => {
        return (
            <header className="">
                FieldsGenerator
            </header>
        )
    },[])
    
}

export default Header;