import { useState, useRef } from "react";
import { Statistic, Input } from "antd";

// MyStatistic：計算統計資料
export default function MyStatistic(props) {
  function store() {
    let newTags = Object.assign({}, props.tagsStandard);

    // 標準
    let s0 = isNaN(ref0.current.input.value)
      ? 0
      : Number(ref0.current.input.value) > 1000
      ? 999
      : Number(ref0.current.input.value);
    let s1 = isNaN(ref1.current.input.value)
      ? 0
      : Number(ref1.current.input.value) > 1000
      ? 999
      : Number(ref1.current.input.value);
    newTags[props.tag] = [s0, s1];
    props.setTagsStandard(newTags);
  }

  const filteredData = props.filteredData.filter(
    (item) => !isNaN(item["score"])
  );

  // 總學分數
  let creditSum = filteredData.reduce((pre, cur) => pre + cur.credit, 0);
  // fail的學分數
  let failSum = filteredData.reduce(
    (pre, cur) => pre + (cur.score < 60 ? cur.credit : 0),
    0
  );
  // 總成績
  let scoreSum = filteredData.reduce(
    (pre, cur) => pre + cur.score * cur.credit,
    0
  );
  // 4.3 GPA
  let gpa43Sum = filteredData.reduce((pre, cur) => {
    return (
      pre +
      (4.3 * (cur.score >= 90) +
        4.0 * (cur.score >= 85 && cur.score < 90) +
        3.7 * (cur.score >= 80 && cur.score < 85) +
        3.3 * (cur.score >= 77 && cur.score < 80) +
        3.0 * (cur.score >= 73 && cur.score < 77) +
        2.7 * (cur.score >= 70 && cur.score < 73) +
        2.3 * (cur.score >= 67 && cur.score < 70) +
        2.0 * (cur.score >= 63 && cur.score < 67) +
        1.7 * (cur.score >= 60 && cur.score < 63) +
        1.0 * (cur.score >= 50 && cur.score < 60)) *
        cur.credit
    );
  }, 0);
  // 4.0 GPA
  let gpa4Sum = filteredData.reduce((pre, cur) => {
    return (
      pre +
      (4.0 * (cur.score >= 80) +
        3.0 * (cur.score >= 70 && cur.score < 80) +
        2.0 * (cur.score >= 60 && cur.score < 70) +
        1.0 * (cur.score >= 50 && cur.score < 60)) *
        cur.credit
    );
  }, 0);

  const [edit, setEdit] = useState(false);
  const ref0 = useRef(null);
  const ref1 = useRef(null);

  let standard = props.tagsStandard[props.tag];
  if (standard === undefined) standard = [0, 0];

  if (edit)
    return (
      <>
        <Statistic
          title="學分標準"
          value={creditSum - failSum}
          suffix={
            <>
              /{" "}
              <Input
                ref={ref0}
                defaultValue={standard[0]}
                style={{ width: "50px" }}
              />
            </>
          }
        />
        <Statistic
          title="修課數量標準"
          value={props.filteredData.length}
          suffix={
            <>
              /{" "}
              <Input
                ref={ref1}
                defaultValue={standard[1]}
                style={{ width: "50px" }}
              />
            </>
          }
        />
        <Statistic
          title="GPA 4.3"
          value={creditSum !== 0 ? gpa43Sum / creditSum : "None"}
          precision={2}
        />
        <Statistic
          title="GPA 4.0"
          value={creditSum !== 0 ? gpa4Sum / creditSum : "None"}
          precision={2}
        />
        <Statistic
          title="平均成績"
          value={creditSum !== 0 ? scoreSum / creditSum : "None"}
          precision={2}
        />
        <a
          href="# "
          onClick={(e) => {
            e.preventDefault();
            setEdit(false);
            store();
          }}
          style={{ fontSize: "16px" }}
        >
          確定
        </a>
      </>
    );
  else
    return (
      <>
        <Statistic
          title="學分標準"
          value={creditSum - failSum}
          suffix={<>/ {standard[0]}</>}
        />
        <Statistic
          title="修課數量標準"
          value={props.filteredData.length}
          suffix={<>/ {standard[1]}</>}
        />
        <Statistic
          title="GPA 4.3"
          value={creditSum !== 0 ? gpa43Sum / creditSum : "None"}
          precision={2}
        />
        <Statistic
          title="GPA 4.0"
          value={creditSum !== 0 ? gpa4Sum / creditSum : "None"}
          precision={2}
        />
        <Statistic
          title="平均成績"
          value={creditSum !== 0 ? scoreSum / creditSum : "None"}
          precision={2}
        />
        <a
          href="# "
          onClick={(e) => {
            e.preventDefault();
            setEdit(true);
          }}
          style={{ fontSize: "16px" }}
        >
          編輯
        </a>
      </>
    );
}
