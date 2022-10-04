import React from "react";

type Props = {
    title:string
    setTest: Function
}

const SubTest: React.FC<Props> = ({title, setTest}: Props) => {
    const onClickChangeBBB = () => {
        setTest("BBB")
    }
    
    return (
        <>
            <h1>SubTest</h1>
            <button onClick={onClickChangeBBB}>change</button>
            <p>{title}</p>
        </>
    )
}

export default SubTest;