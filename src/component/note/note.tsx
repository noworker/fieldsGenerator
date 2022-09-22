import React, { useMemo } from "react"
import './note.css'

const Note: React.FC = () => {
    return useMemo(() => {
        return (
            <>
                <div className="note-frame">
                   <h3>・ノート</h3>
                   <p>salesforceのオブジェクトの項目定義XMLファイルを出力することができるアプリです。
                    <br/>ご意見感想は twitter: <a href="https://twitter.com/sayonaraNoStep">@sayonaraNoStep</a>までお願いします。<br/>
                プルリクエストはこちらまで　<a href="https://github.com/noworker/fieldsGenerator">github.com/noworker/fieldsGenerator</a>
                   </p>
                </div>
            </>
        )
    },[])
}

export default Note;