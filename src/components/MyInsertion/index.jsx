import { Form, Button, Input, Select, InputNumber } from "antd";

const { Option } = Select;

// MyInsertion：手動插入資料的區塊
export default function MyInsertion(props) {
  // 送出資料的處理
  function onFinish(item) {
    if (item.tags === undefined) item.tags = [];
    item.classId = Math.random();

    let newTags = {};
    for (let i = 0; i < item.tags.length; i++) {
      if (props.tags[item.tags[i]] === undefined)
        newTags[item.tags[i]] = { count: 1 };
      else
        newTags[item.tags[i]] = { count: props.tags[item.tags[i]].count + 1 };
    }

    props.setTags({ ...props.tags, ...newTags });
    props.setData([...props.data, item]);
    form.resetFields();
  }

  const [form] = Form.useForm();

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        schoolYear: 110,
        semester: 0,
        score: 100,
        credit: 0,
      }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item label="學年" name="schoolYear">
        <InputNumber />
      </Form.Item>
      <Form.Item label="學期" name="semester">
        <Select>
          <Option value={0}>未選擇</Option>
          <Option value={1}>上</Option>
          <Option value={2}>下</Option>
        </Select>
      </Form.Item>
      <Form.Item label="開課單位" name="unit">
        <Input />
      </Form.Item>
      <Form.Item label="課程名稱" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="分數" name="score">
        <InputNumber />
      </Form.Item>
      <Form.Item label="標籤" name="tags">
        <Select mode="tags">
          {Object.keys(props.tagsStandard).map((item) => {
            if (item === "全部修課" || item === "未分類") return "";
            else return <Option key={item}>{item}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item label="學分" name="credit">
        <InputNumber />
      </Form.Item>
      <Form.Item label="教授" name="teacher">
        <Input />
      </Form.Item>
      <Form.Item colon={false} label=" ">
        <Button type="primary" block htmlType="submit">
          新增
        </Button>
      </Form.Item>
    </Form>
  );
}
