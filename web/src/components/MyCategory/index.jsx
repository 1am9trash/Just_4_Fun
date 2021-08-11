import { Row, Col, Card, Divider } from "antd";
import MyItem from "../MyItem";
import MyStatistic from "../MyStatistic";

// Category：類別區塊，包含統計跟課程列表
export default function Category(props) {
  return (
    <Card bordered={false} style={{ overflow: "scroll" }}>
      <Row
        style={{
          minWidth: "600px",
          overflow: "scroll",
        }}
      >
        <Col span={4}>
          <MyStatistic {...props} />
        </Col>
        <Col span={2}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={18}>
          <MyItem {...props} />
        </Col>
      </Row>
    </Card>
  );
}
