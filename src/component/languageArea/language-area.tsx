import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/config.ts";
import "./language-area.scss";

const LanguageArea: React.FC = () => {
  const { t } = useTranslation();
  const reducerChangeLang = (state, action) => {
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
        <p>{t("language-area.sent")}</p>
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
