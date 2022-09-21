import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';
import './App.css';
import fileDownload from 'js-file-download';

function App() {

  const [count, setCount] = useState(3);
  const [generatedText, setGeneratedText] = useState("");

  const typeComboList = [
    {
      value: "Text",
      label: "テキスト"
    },
    {
      value: "LongTextArea",
      label: "ロングテキストエリア"
    }
  ];

  const [rowList, setRowList] = useState([
    {
      Id: 1,
      Type: "Text",
      Label: "",
      APIName: "",
      Length: 0,
      RowCount: 0,
      Disabled: "disabled"
    },
    {
      Id: 2,
      Type: "LongTextArea",
      Label: "",
      APIName: "",
      Length: 0, 
      RowCount: 0,
      Disabled: ""
    }
  ]);

  const onClickAddRow = () => {
    let newRow = {
      Id: count,
      Type: "Text",
      Label: "",
      APIName: "",
      Length: 0,
      RowCount: 0,
      Disabled: "disabled"
    }
    setRowList([...rowList, newRow]);
    console.log(count);
    setCount(count + 1);
  }

  const onClickGenerate = () => {
    let generatedText = [];
    for(let row of rowList) {
      if(row.Type == "Text") {
        generatedText.push("<fields>\n");
        generatedText.push(`\t<fullName>${row.APIName}</fullName>\n`)
        generatedText.push(`\t<externalId>false</externalId>\n`)
        generatedText.push(`\t<label>${row.Label}</label>\n`)
        generatedText.push(`\t<length>${row.Length}</length>\n`)
        generatedText.push(`\t<required>false</required>\n`)
        generatedText.push(`\t<trackTrending>false</trackTrending>\n`)
        generatedText.push(`\t<type>Text</type>\n`)
        generatedText.push(`\t<unique>false</unique>\n`)
        generatedText.push(`</fields>\n`)
      } else if(row.Type == "LongTextArea") {
        generatedText.push("<fields>\n");
        generatedText.push(`\t<fullName>${row.APIName}</fullName>\n`)
        generatedText.push(`\t<externalId>false</externalId>\n`)
        generatedText.push(`\t<label>${row.Label}</label>\n`)
        generatedText.push(`\t<length>${row.Length}</length>\n`)
        generatedText.push(`\t<required>false</required>\n`)
        generatedText.push(`\t<trackTrending>false</trackTrending>\n`)
        generatedText.push(`\t<type>LongTextArea</type>\n`)
        generatedText.push(`\t<unique>false</unique>\n`)
        generatedText.push(`\t<visibleLines>${row.RowCount}</visibleLines>\n`)
        generatedText.push(`</fields>\n`)
      }
      let text = generatedText.join("");
      console.log(text);

      let blob = new Blob([text], {"type": "text/plain"});
      fileDownload(blob, 'fields.txt');
    }
  }

  const onChangeType = (id, e) => {
    console.log("onChangeType");
    console.log(e.target.value);

    setRowList(
      rowList.map((row) => {
        if(row.Id === id) {
          row.Type = e.target.value; 
          if(row.Type == "LongTextArea") {
            row.Disabled = "";
            row.RowCount = 0;
          } else if(row.Type == "Text") {
            row.Disabled = "disabled";
            row.RowCount = 0 
          }
        }
        return row;
      })
    )
  }

  const onChangeLabel = (id, e) => {
    setRowList(
      rowList.map((row) => {
        if(row.Id === id) {
          row.Label = e.target.value;
        }
        return row;
      })
    )
  } 

  const onChangeAPIName = (id, e) => {
    setRowList(
      rowList.map(row => {
        if(row.Id === id) {
          row.APIName = e.target.value;
        }
        return row
      })
    )
  }

  const onChangeLength = (id, e) => {
    setRowList(
      rowList.map(row => {
        if(row.Id === id) {
          row.Length = e.target.value;
        }
        return row
      })
    )
  }

  const onChangeRowCount = (id, e) => {
    setRowList(
      rowList.map(row => {
        if(row.Id === id) {
          row.RowCount = e.target.value;
        }
        return row
      })
    )
  }


  return (
    <>
      <header>
        FieldsGenerator
      </header>
      <div className='container'>
        <table className='w-100'>
          <thead>
            <tr className='w-100'>
              <th className='w-25'>データ型</th>
              <th className='w-25'>ラベル</th>
              <th className='w-25'>API名</th>
              <th className='w-10'>文字数</th>
              <th className='w-10'>行数</th>
            </tr>
          </thead>
          <tbody>
          {
            rowList.map((row) => (
              <tr>
                <td>
                  <select className='select' onChange={(e) => onChangeType(row.Id, e)} defaultValue={row.Type}>
                    {
                      typeComboList.map((type) => (
                        <option value={type.value}>{type.label}</option>
                      ))
                    }
                  </select>
                </td>
                <td><input type="text" className='no-border' value={row.Label} onChange={(e)=> onChangeLabel(row.Id, e)} /></td>
                <td><input type="text" className='no-border' value={row.APIName} onChange={(e)=> onChangeAPIName(row.Id, e)} /></td>
                <td><input type="number" min="0" className='no-border' value={row.Length}onChange={(e) => onChangeLength(row.Id, e)} /></td>
                <td className={row.Disabled}><input type="number" min="0" className='no-border' value={row.RowCount} disabled={row.Disabled} onChange={(e) => onChangeRowCount(row.Id, e)} /></td>
              </tr>
            ))
          }
          </tbody>
        </table> 
        <p className="addButton" onClick={() => onClickAddRow()}>+</p>
        <p className="generateButton" onClick={() => onClickGenerate()}>xml作成</p>
      </div>
    </>
  );
}

export default App;
