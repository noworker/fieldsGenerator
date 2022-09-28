import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/config";
import "./language-area.scss";

const LanguageArea: React.FC = () => {
  const { t } = useTranslation();
  type ACTIONTYPE = {
    type: string
  }
  const reducerChangeLang = (state: string, action: ACTIONTYPE) => {
    switch (action.type) {
      case "CHANGE_JA":
        i18n.changeLanguage("ja");
        return "ja";
      case "CHANGE_EN":
        i18n.changeLanguage("en");
        return "en";
      default:
        return state;
    }
  };
  const [langState, langDispatch] = useReducer(reducerChangeLang, "ja");

  return (
    <>
      <div className="container">
        <p className="lng-sent">{t("language-area.sent")}</p>
        <div className="lng-container">
          <button
            className="lngButton bg-blue"
            onClick={() => langDispatch({ type: "CHANGE_JA" })}
          >
            日本語
          </button>
          <button
            className="lngButton bg-red"
            onClick={() => langDispatch({ type: "CHANGE_EN" })}
          >
            English
          </button>
        </div>
      </div>
    </>
  );
};

export default LanguageArea;
