import { Button, Input } from "antd";

// MyData：導入成績的區塊
export default function MyData(props) {
  // 處理數據
  function getData() {
    // 使用tab跟空白分割後，篩除空字串
    let rawData = refData.split(/[ \t]/).filter((str) => str !== "");

    let tags = {};
    let data = [];

    // 讀到"向度"後，代表開始讀入資料
    let start = false;
    let cur = 0;
    while (!start && cur < rawData.length) {
      if (rawData[cur] === "向度") start = true;
      cur++;
    }

    for (let i = cur; i < rawData.length; i++) {
      if (!isNaN(rawData[i])) {
        if (
          isNaN(rawData[i + 7]) &&
          rawData[i + 7] !== "通過" &&
          rawData[i + 7] !== "W"
        ) {
          i += 9;
          continue;
        }

        let item = {};

        item["schoolYear"] = parseInt(Number(rawData[i + 1]) / 10);
        item["semester"] = Number(rawData[i + 1]) % 10;
        item["classId"] = Number(rawData[i + 2]);
        item["unit"] = rawData[i + 3];
        item["name"] = rawData[i + 4];
        item["credit"] = Number(rawData[i + 6]);
        item["score"] = isNaN(rawData[i + 7])
          ? rawData[i + 7]
          : Number(rawData[i + 7]);
        item["teacher"] = rawData[i + 11];

        item["tags"] = [];
        if (props.tagsStandard[rawData[i + 5]] !== undefined)
          item["tags"].push(rawData[i + 5]);
        if (isNaN(rawData[i + 12])) {
          if (props.tagsStandard[rawData[i + 12]] !== undefined) {
            let exist = false;
            for (let j = 0; j < item["tags"].length; j++)
              if (item["tags"][j] === rawData[i + 12]) {
                exist = true;
                break;
              }
            if (!exist) item["tags"].push(rawData[i + 12]);
          }
          i += 12;
        } else {
          i += 11;
        }

        for (let j = 0; j < item["tags"].length; j++) {
          if (tags[item["tags"][j]] !== undefined)
            tags[item["tags"][j]].count += 1;
          else tags[item["tags"][j]] = { count: 1 };
        }

        data.push(item);
      } else {
        break;
      }
    }

    props.setTags(tags);
    props.setData(data);
  }

  let refData = "";

  return (
    <>
      <div>可導入陽明交通大學的成績，於學籍成績系統全選複製貼上即可。</div>
      <Input
        type="text"
        onChange={(e) => (refData = e.target.value)}
        style={{ marginTop: "8px" }}
      />
      <Button
        type="primary"
        block
        onClick={getData}
        style={{ marginTop: "8px" }}
      >
        導入
      </Button>
    </>
  );
}
