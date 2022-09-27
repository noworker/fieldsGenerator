import { useState } from "react";
import "./App.css";
import fileDownload from "js-file-download";
import Header from "./component/header/header.tsx";
import Note from "./component/note/note.tsx";
import LanguageArea from "./component/languageArea/language-area.tsx";
import { useTranslation } from "react-i18next";

function App() {
  const [count, setCount] = useState(3);
  const [addNumber, setAddNumber] = useState(1);
  const {t} = useTranslation();

  const typeDefinition = [
    {
      value: "Text",
      label: t("options.Text"),
    },
    {
      value: "LongTextArea",
      label: t("options.LongTextArea"),
    },
    {
      value: "Number",
      label: t("options.Number"),
    },
  ];

  const [rowList, setRowList] = useState([
    {
      Id: 1,
      Type: "Text",
      Label: "",
      APIName: "",
      Length: 0,
      RowCount: 0,
      Scale: 0,
      Disabled: {
        RowLength: "disabled",
        Scale: "disabled",
      },
    },
    {
      Id: 2,
      Type: "LongTextArea",
      Label: "",
      APIName: "",
      Length: 0,
      RowCount: 0,
      Scale: 0,
      Disabled: {
        RowLength: "",
        Scale: "disabled",
      },
    },
  ]);

  const onClickAddRow = () => {
    let newRows = [];
    let newCount = count;
    for (let i = 0; i < addNumber; i++) {
      let newRow = {
        Id: newCount,
        Type: "Text",
        Label: "",
        APIName: "",
        Length: 0,
        RowCount: 0,
        Scale: 0,
        Disabled: {
          RowLength: "disabled",
          Scale: "disabled",
        },
      };
      newRows.push(newRow);
      newCount++;
    }
    setRowList([...rowList, ...newRows]);
    setCount(newCount);
  };

  const onClickGenerate = () => {
    let generatedText = [];
    console.log(rowList);
    for (let row of rowList) {
      if (row.Type === "Text") {
        generatedText.push("<fields>\n");
        generatedText.push(`\t<fullName>${row.APIName}</fullName>\n`);
        generatedText.push(`\t<externalId>false</externalId>\n`);
        generatedText.push(`\t<label>${row.Label}</label>\n`);
        generatedText.push(`\t<length>${row.Length}</length>\n`);
        generatedText.push(`\t<required>false</required>\n`);
        generatedText.push(`\t<trackTrending>false</trackTrending>\n`);
        generatedText.push(`\t<type>Text</type>\n`);
        generatedText.push(`\t<unique>false</unique>\n`);
        generatedText.push(`</fields>\n`);
      } else if (row.Type === "LongTextArea") {
        generatedText.push("<fields>\n");
        generatedText.push(`\t<fullName>${row.APIName}</fullName>\n`);
        generatedText.push(`\t<externalId>false</externalId>\n`);
        generatedText.push(`\t<label>${row.Label}</label>\n`);
        generatedText.push(`\t<length>${row.Length}</length>\n`);
        generatedText.push(`\t<required>false</required>\n`);
        generatedText.push(`\t<trackTrending>false</trackTrending>\n`);
        generatedText.push(`\t<type>LongTextArea</type>\n`);
        generatedText.push(`\t<unique>false</unique>\n`);
        generatedText.push(`\t<visibleLines>${row.RowCount}</visibleLines>\n`);
        generatedText.push(`</fields>\n`);
      } else if (row.Type === "Number") {
        generatedText.push("<fields>\n");
        generatedText.push(`\t<fullName></fullName>\n`);
        generatedText.push(`\t<externalId>false</externalId>\n`);
        generatedText.push(`\t<label>${row.Label}</label>\n`);
        generatedText.push(`\t<precision>${row.Length}</precision>\n`);
        generatedText.push(`\t<scale>${row.Scale}</scale>\n`);
        generatedText.push(`\t<required>false</required>\n`);
        generatedText.push(`\t<trackTrending>false</trackTrending>\n`);
        generatedText.push(`\t<type>Number</type>\n`);
        generatedText.push(`\t<unique>false</unique>\n`);
        generatedText.push("</fields>\n");
      }
    }
    let text = generatedText.join("");
    console.log(text);

    let blob = new Blob([text], { type: "text/plain" });
    fileDownload(blob, "fields.txt");
  };

  const onClickDelete = (id) => {
    console.log(id);
    setRowList(
      rowList.filter((row) => {
        return row.Id !== id;
      })
    );
  };

  const onChangeType = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.Type = e.target.value;
        }
        return row;
      })
    );

    setDisable();
  };

  const setDisable = () => {
    setRowList(
      rowList.map((row) => {
        switch (row.Type) {
          case "Text":
            row.Disabled.RowLength = "disabled";
            row.Disabled.Scale = "disabled";
            row.RowCount = 0;
            break;
          case "LongTextArea":
            row.Disabled.RowLength = "";
            row.Disabled.Scale = "disabled";
            row.RowCount = 0;
            break;
          case "Number":
            row.Disabled.RowLength = "disabled";
            row.Disabled.Scale = "";
            break;
          default:
            console.log("そのデータ型は開発中です");
            break;
        }
        return row;
      })
    );
  };

  const onChangeLabel = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.Label = e.target.value;
        }
        return row;
      })
    );
  };

  const onChangeAPIName = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.APIName = e.target.value;
        }
        return row;
      })
    );
  };

  const onChangeLength = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.Length = e.target.value;
        }
        return row;
      })
    );
  };

  const onChangeRowCount = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.RowCount = e.target.value;
        }
        return row;
      })
    );
  };

  const onChangeScale = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if (row.Id === id) {
          row.Scale = e.target.value;
        }
        return row;
      })
    );
  };

  const onChangeAddNumber = (e) => {
    setAddNumber(e.target.value);
    console.log(addNumber);
  };

  return (
    <>
      <Header></Header>
      <div className="container">
        <LanguageArea></LanguageArea>
        <Note></Note>
        <div className="table-container">
          <table className="w-900px">
            <thead>
              <tr>
                <th className="w-50px">{t("table.deleteButton")}</th>
                <th className="w-150px">{t("table.dataType")}</th>
                <th className="w-150px">{t("table.Label")}</th>
                <th className="w-150px">{t("table.APIName")}</th>
                <th className="w-50px">{t("table.Length")}</th>
                <th className="w-50px">{t("table.RowCount")}</th>
                <th className="w-50px">{t("table.Scale")}</th>
              </tr>
            </thead>
            <tbody>
              {rowList.map((row) => (
                <tr>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => onClickDelete(row.Id)}
                    >
                      {t("table.deleteButton")}
                    </button>
                  </td>
                  <td>
                    <select
                      className="select"
                      onChange={(e) => onChangeType(row.Id, e)}
                    >
                      {typeDefinition.map((type) => (
                        <option
                          value={type.value}
                          selected={type.value === row.Type}
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="no-border"
                      value={row.Label}
                      onChange={(e) => onChangeLabel(row.Id, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="no-border"
                      value={row.APIName}
                      onChange={(e) => onChangeAPIName(row.Id, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="no-border"
                      value={row.Length}
                      onChange={(e) => onChangeLength(row.Id, e)}
                    />
                  </td>
                  <td className={row.Disabled.RowLength}>
                    <input
                      type="number"
                      min="0"
                      className="no-border"
                      value={row.RowCount}
                      disabled={row.Disabled.RowLength}
                      onChange={(e) => onChangeRowCount(row.Id, e)}
                    />
                  </td>
                  <td className={row.Disabled.Scale}>
                    <input
                      type="number"
                      min="0"
                      className="no-border"
                      value={row.Scale}
                      disabled={row.Disabled.Scale}
                      onChange={(e) => onChangeScale(row.Id, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-container">
          <input
            type="number"
            min="0"
            max="100"
            className="row-number"
            value={addNumber}
            onChange={(e) => onChangeAddNumber(e)}
          />
          {t("rowAdd")}
          <p className="kakeru">×</p>
          <p className="addButton" onClick={() => onClickAddRow()}>
            +
          </p>
        </div>
        <p className="generateButton" onClick={() => onClickGenerate()}>
          {t("buttons.createXML")}
        </p>
      </div>
    </>
  );
}

export default App;
