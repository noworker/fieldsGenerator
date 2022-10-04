import React, {useState} from "react"
import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/config";

const V3: React.FC = () => {
    const {t} = useTranslation()
    type Data = {
        dataType: string
        id: number
        content: string
    }

    const [lan, setLan]= useState("ja")

    const onClickChangeEN = () => {
        alert("change en")
        i18n.changeLanguage("en")
        setLan("en")
    }

    const onClickChangeJA = () => {
        alert("change ja")
        i18n.changeLanguage("ja")
        setLan("ja")
    }

    
    const typeDefinitions: string[] = [
        "Text",
        "LongText"
    ]

    const [data, setData] = useState<Data[]>([
        {
            dataType: "Text",
            id: 1,
            content: "Hello"
        },
        {
            dataType: "LongText",
            id: 2,
            content: "world"
        }
    ])

    const columns = useMemo(()=> {
        return [
            {
                name: t("table.dataType"),
                selector: (row:Data) => row.dataType,
                cell: (row: Data) => {
                    const onChangeDataType = (id: number, e: React.ChangeEvent<HTMLSelectElement>) =>  {
                        let newData = data.map((d) => {
                            if(d.id === id) {
                                d.dataType = e.target.value;
                            }
                            return d
                        })
                        setData([...newData])
                    }

                    return (
                        <>
                            <select onChange={(e) => onChangeDataType(row.id, e)}>
                                {
                                    typeDefinitions.map((type) => (
                                         <option value={type} selected={type === row.dataType}>{type}</option>
                                    ))
                                }
                            </select>
                        </>
                    )
                }
            },
            {
                name: "id",
                selector: (row: Data) => row.id
            },
            {
                name:"content",
                selector: (row:Data) => row.content,
                cell: (row:Data) => {
                    return (
                        <>
                            <input type="text" value={row.content} disabled={row.dataType === "Text"} />
                        </>
                    )
                }
            }
        ]
        //eslint-disable-next-line
    }, [data, lan])



    return (
        <>
            <div onClick={onClickChangeJA}>日本語</div>
            <div onClick={onClickChangeEN}>English</div>
            <DataTable
            columns={columns}
            data={data}></DataTable>
            <div>
                {
                    data.map((d) => (
                        <>
                            <p>{d.id}</p>
                            <p>{d.dataType}</p>
                            <p>{d.content}</p>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default V3;