import React, {useState} from "react";
import SubTest from "./subTest";
import {Link} from 'react-router-dom'
import {useLocalStorage} from 'usehooks-ts'

const Test: React.FC = () => {
    const [test , setTest] = useState("aaa") 
    let obj = {
        hello: "world",
        hoge: "piyo"
    }
    const onClickStorage = () => {
        setStorage("gegegege")
    }
    let parseObj = JSON.stringify(obj)
    const [storage, setStorage] = useLocalStorage("storage", parseObj);
    return (
        <>
            <Link to={`/v1`}>V1へ遷移</Link> 
            <Link to={`/v2`}>V2へ遷移</Link> 
            <Link to={`/v3`}>V3へ遷移</Link> 
            <SubTest title="title" setTest={setTest}></SubTest>
            <input type={`text`} value={test} />
            <div>{storage}</div>
            <button onClick={onClickStorage}>StorageButton</button>
        </>
    )
}

export default Test;