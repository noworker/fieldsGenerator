import React, { useMemo } from "react"
import './header.css'

type HeaderProps = {
    name: string;
    age: number;
}

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