import { useState } from "react";
import { Tag, Row, Col, Select, Input } from "antd";

// MyItem：顯示單筆課程的區塊
export default function MyItem(props) {
  // 刪除資料
  function deleteData(schoolYear, semester, classId, tags) {
    let newTags = Object.assign({}, props.tags);
    for (let i = 0; i < tags.length; i++) {
      newTags[tags[i]].count--;
      if (newTags[tags[i]].count === 0) delete newTags[tags[i]];
    }
    props.setTags(newTags);
    props.setData(
      props.data.filter(
        (item) =>
          item.schoolYear !== schoolYear ||
          item.semester !== semester ||
          item.classId !== classId
      )
    );
  }

  // 儲存編輯結果
  function store() {
    let preTags = [];
    let newData = props.data.map((item, id) => {
      if (
        item.schoolYear === edit.schoolYear &&
        item.semester === edit.semester &&
        item.classId === edit.classId
      ) {
        preTags = item.tags !== undefined ? item.tags : preTags;
        return Object.assign(item, {
          name: refName !== undefined ? refName : item.name,
          credit:
            refCredit !== undefined && !isNaN(refCredit)
              ? Number(refCredit)
              : item.credit,
          score:
            refScore !== undefined && !isNaN(refScore)
              ? Number(refScore)
              : item.score,
          tags: refTags !== undefined ? refTags : item.tags,
        });
      } else {
        return item;
      }
    });

    if (refTags !== undefined) {
      let newTags = Object.assign({}, props.tags);
      for (let i = 0; i < preTags.length; i++) {
        newTags[preTags[i]].count--;
        if (newTags[preTags[i]].count === 0) delete newTags[preTags[i]];
      }
      for (let i = 0; i < refTags.length; i++) {
        if (newTags[refTags[i]] === undefined)
          newTags[refTags[i]] = { count: 1 };
        else newTags[refTags[i]].count++;
      }
      props.setTags(newTags);
    }

    props.setData(newData);
  }

  const [edit, setEdit] = useState({});
  let refName, refCredit, refScore, refTags;

  return (
    <div
      style={{ maxHeight: "360px", overflowY: "scroll", overflowX: "hidden" }}
    >
      {props.filteredData.map((item) => {
        if (
          item.schoolYear === edit.schoolYear &&
          item.semester === edit.semester &&
          item.classId === edit.classId
        )
          return (
            <Row
              key={"" + item.schoolYear + item.semester + item.classId}
              gutter={8}
              align="middle"
              style={{
                paddingBottom: "3px",
                borderBottom: "1px #f0f0f0 solid",
                minHeight: "50px",
                fontSize: "16px",
              }}
            >
              <Col span={8}>
                <Input
                  onChange={(e) => (refName = e.target.value)}
                  defaultValue={item.name}
                />
              </Col>
              <Col span={4}>
                <Input
                  onChange={(e) => (refCredit = e.target.value)}
                  defaultValue={item.credit}
                />
              </Col>
              <Col span={4}>
                <Input
                  onChange={(e) => (refScore = e.target.value)}
                  defaultValue={item.score}
                />
              </Col>
              <Col span={4}>
                <Select
                  onChange={(v) => (refTags = v)}
                  mode="tags"
                  defaultValue={item.tags}
                  style={{ width: "100%" }}
                ></Select>
              </Col>
              <Col span={4}>
                <a
                  href="# "
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit({});
                    store();
                  }}
                >
                  確定
                </a>
                &nbsp;
                <a
                  href="# "
                  onClick={(e) => {
                    e.preventDefault();
                    deleteData(
                      item.schoolYear,
                      item.semester,
                      item.classId,
                      item.tags
                    );
                  }}
                >
                  刪除
                </a>
              </Col>
            </Row>
          );
        else
          return (
            <Row
              key={"" + item.schoolYear + item.semester + item.classId}
              gutter={8}
              align="middle"
              style={{
                paddingBottom: "3px",
                borderBottom: "1px #f0f0f0 solid",
                minHeight: "50px",
                fontSize: "16px",
              }}
            >
              <Col span={8}>{item.name}</Col>
              <Col span={4}>{item.credit} 學分</Col>
              <Col span={4}>
                {item.score}
                {isNaN(item.score) ? "" : "分"}{" "}
              </Col>
              <Col span={4}>
                {item.tags.map((tag) => (
                  <Tag key={tag} color="red">
                    {tag}
                  </Tag>
                ))}
              </Col>
              <Col span={4}>
                <a
                  href="# "
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit({
                      schoolYear: item.schoolYear,
                      semester: item.semester,
                      classId: item.classId,
                    });
                  }}
                >
                  編輯
                </a>
                &nbsp;
                <a
                  href="# "
                  onClick={(e) => {
                    e.preventDefault();
                    deleteData(
                      item.schoolYear,
                      item.semester,
                      item.classId,
                      item.tags
                    );
                  }}
                >
                  刪除
                </a>
              </Col>
            </Row>
          );
      })}
    </div>
  );
}
