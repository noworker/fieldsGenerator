import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import './v2.scss'
import Header from '../../component/header/header'
import LanguageArea from '../../component/languageArea/language-area'
import {useTranslation} from 'react-i18next'



const V2: React.FC = () => {

    function setType(value : string): Type{
        if(value === "Text") {
            return "Text";
        } else if(value === "LongTextArea") {
            return "LongTextArea";
        } else if(value === "Number") {
            return "Number"
        } else {
            return "Default"
        }
    }

    const {t} = useTranslation()
    type Type = "Text" | "LongTextArea" | "Number" | "Default"
    type TypeDefinitions = {
        Type: Type 
        Label: string
    }
    
    const Types: TypeDefinitions[] = [
        {
            Type: "Text",
            Label: t("options.Text")
        },
        {
            Type: "LongTextArea",
            Label: t("options.LongTextArea")
        },
        {
            Type: "Number",
            Label: t("options.Number")
        }
    ]
    
    type Row = {
        DataType: Type 
        Label: string 
        APIName: string
        Length: number
        RowCount: number
        Scale: number
    }
    
    type Data = {
        Id: number
        DataType: Type 
        Label: string
        APIName: string
        Length: number
        RowCount: number
        Scale: number
    }
    const [columns, setColumns] = useState([
        {
            name: t("table.dataType"),
            selector: (row: Row) => row.DataType,
            cell: (row:Data) => {
                const onChangeType = (id: number, e: React.ChangeEvent<HTMLSelectElement>) => {
                    if(row.DataType === "Text") {
                    }
                    let newData;
                    data.map(d => {
                        if(d.Id === id) {
                            d.DataType = setType(e.target.value);
                        }
                        return d
                    })
                    newData = [...data]
                    setData(newData);
                }
                return (
                    <>
                        <select onChange={(e) => onChangeType(row.Id, e)}>
                            {
                                Types.map((type) => (
                                    <option value={type.Type} selected={row.DataType === type.Type}>{type.Label}</option>
                                ))
                            }
                        </select>
                    </>
                )
            }
        },
        {
            name: t("table.Label"),
            selector: (row: Row)=> row.Label
        },
        {
            name: t("table.APIName"),
            selector: (row: Row)=> row.APIName
        },
        {
            name: t("table.Length"),
            selector: (row: Row)=> row.Length
        },
        {
            name: t("table.RowCount"),
            selector: (row: Row)=> row.RowCount,
            cell: (row: Data) => {
                const onChangeRowCount = (id:number, e: React.ChangeEvent<HTMLInputElement>) => {
                   setData(
                        data.map((d) => {
                            if(d.Id === id) {
                                d.RowCount = parseInt(e.target.value);
                            }
                            return d;
                        })
                   ) 
                } 
                return (
                    <input type="number" onChange={(e) => onChangeRowCount(row.Id, e)} disabled={row.DataType === "Text" || row.DataType === "Number"}/>
                )
            }
        },
        {
            name: t("table.Scale"),
            selector: (row: Row)=> row.Scale
        }
    ])

    const [data, setData] = useState<Data[]>(
        [
            {
                Id: 1,
                DataType: "Text", 
                Label: "", 
                APIName: "",
                Length: 100, 
                RowCount: 0, 
                Scale: 0 
            },
            {
                Id: 2,
                DataType: "LongTextArea", 
                Label: "", 
                APIName: "",
                Length: 100, 
                RowCount: 0, 
                Scale: 0 
            },
            {
                Id: 3,
                DataType: "Number", 
                Label: "", 
                APIName: "",
                Length: 100, 
                RowCount: 0, 
                Scale: 0 
            },
        ]
    )


    return (
        <>
            <Header></Header>
            <LanguageArea></LanguageArea>
            <div className='container'>
                <Link to={`/v1`}>V1へ遷移</Link>
                <Link to={`/v2`}>V2へ遷移</Link>
                <DataTable
                data={data}
                columns={columns} 
                ></DataTable>
            </div>
        </>
    )
}

export default V2;