import "antd/dist/antd.css";
import { useState } from "react";
import { Collapse, Row, Col } from "antd";
import MyCategory from "./components/MyCategory";
import MyData from "./components/MyData";
import MyInsertion from "./components/MyInsertion";
import MyAccount from "./components/MyAccount";

const { Panel } = Collapse;

// tagsStandard的初始值
//	 交通大學成績系統讀入的資料tag太混亂，僅使用下列較重要的標籤
//   []中前者為預設學分標準，後者為修課數量標準
const initStandard = {
  全部修課: [128, 0],
  未分類: [0, 0],
  必修: [45, 0],
  選修: [57, 0],
  通識: [18, 0],
  核心: [6, 0],
  "核心-人文": [0, 1],
  "核心-社會": [0, 1],
  "核心-自然": [0, 0],
  跨院基本素養: [2, 0],
  校基本素養: [6, 0],
  外語: [8, 0],
  體育: [0, 6],
  軍訓: [0, 0],
};

export default function App() {
  // tags：數據中各個標籤的課程數量
  const [tags, setTags] = useState({});
  // tagsStandard：初始各標籤的修課標準
  const [tagsStandard, setTagsStandard] = useState(initStandard);
  // data：所有課程數據
  const [data, setData] = useState([]);

  const props = {
    tags,
    setTags,
    data,
    setData,
    tagsStandard,
    setTagsStandard,
  };

  // Row的間隔
  const gutter = [8, 8];

  return (
    <div style={{ padding: "8px" }}>
      <Row gutter={gutter}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 10 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
        >
          <Collapse accordion>
            <Panel header="帳號" key={0}>
              <MyAccount {...props} />
            </Panel>
            <Panel header="導入成績" key={1}>
              <MyData {...props} />
            </Panel>
            <Panel header="新增成績" key={2}>
              <MyInsertion {...props} />
            </Panel>
          </Collapse>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 14 }}
          md={{ span: 16 }}
          lg={{ span: 18 }}
        >
          <Collapse>
            <Panel header={"全部修課"} key={"全部修課"}>
              <MyCategory tag={"全部修課"} filteredData={data} {...props} />
            </Panel>
            <Panel header={"未分類"} key={"未分類"}>
              <MyCategory
                tag={"未分類"}
                filteredData={data.filter((item) => item.tags.length === 0)}
                {...props}
              />
            </Panel>
            {Object.keys(tags).map((tag) => {
              return (
                <Panel header={tag} key={tag}>
                  <MyCategory
                    tag={tag}
                    filteredData={data.filter((item) =>
                      item.tags.includes(tag)
                    )}
                    {...props}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}
