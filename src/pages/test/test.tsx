import React, {useState} from "react";
import SubTest from "./subTest";
import {Link} from 'react-router-dom'
import {useLocalStorage} from 'usehooks-ts'
import xml2js from 'xml2js'


function readFileAsText(file: Blob) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(reader.error)
        reader.onload = () => resolve((reader.result as string) || '')
        reader.readAsText(file)
    })
}
const Test: React.FC = () => {
    const [test , setTest] = useState("aaa") 
    let obj = {
        hello: "world",
        hoge: "piyo"
    }
    const onClickStorage = () => {
        setStorage("gegegege")
    }

    const [files, setFiles] = useState<File[]>([])

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parser = new xml2js.Parser({
            async: false,
            explicitArray: false
        })
        if(e.target.files != null) {
            readFileAsText(e.target.files[0])
                .then(data=> {
                    parser.parseString(data, (error, result) => {
                        if(error) {
                            alert(error);
                        } else {
                            console.log(JSON.stringify(result));
                        }
                    })
                })
        }
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
            <input type={`file`} onChange={(e) => onFileInputChange(e)}/>
        </>
    )
}

export default Test;