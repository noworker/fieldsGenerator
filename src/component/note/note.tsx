import { Trans } from 'react-i18next'
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import './note.css'

const Note: React.FC = () => {
    const {t} = useTranslation();
    return useMemo(() => {
        return (
            <>
                <div className="note-frame">
                   <h3>・{t("note.title")}</h3>
                   <p><Trans i18nKey="multiline">{t("note.content")}</Trans></p>
                </div>
            </>
        )
    },[t])
}

export default Note;