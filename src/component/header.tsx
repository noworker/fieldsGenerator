import React, { useMemo } from "react"

type HeaderProps = {
    name: string;
    age: number;
}

const Header: React.FC = () =>{
    return useMemo(() => {
        return (
            <header>
                FieldsGenerator
            </header>
        )
    },[])
    
}

export default Header;