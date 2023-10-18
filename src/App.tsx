import './styles.css';
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Checkbox,
  Button,
} from 'antd';
import { Moment } from 'moment';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const options = [
  { label: 'Label A', value: 'A' },
  { label: 'Label B', value: 'B' },
  { label: 'Label C', value: 'C' },
  { label: 'Label D', value: 'D' },
];

export type FormType = {
  myInput: string;
  mySelect: string[];
  myCheckbox: boolean;
  myRadio: string;
  myInputNumber: number;
  myTextArea: string;
  myDatePicker: Moment;
  myRangePicker: Moment[];
  mySwitch: boolean;
};

export default function App(props: { onSubmit: (data: any) => void }) {
  const { onSubmit } = props;
  const [form] = Form.useForm<Partial<FormType>>();
  return (
    <div className="App">
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(value) => {
          const { myDatePicker, myRangePicker, ...rest } = value;
          onSubmit({
            ...rest,
            myDatePicker: myDatePicker && myDatePicker.format('YYYY-MM-DD'),
            myRangePicker:
              myRangePicker &&
              myRangePicker.map((d: any) => d.format('YYYY-MM-DD')),
          });
        }}
      >
        <Form.Item label="Input" name="myInput">
          <Input />
        </Form.Item>
        <Form.Item label="Select" name="mySelect">
          <Select
            options={options}
            mode="multiple"
            allowClear
            showSearch
            showArrow
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          />
        </Form.Item>
        <Form.Item label="Checkbox" name="myCheckbox" valuePropName="checked">
          <Checkbox>Check me</Checkbox>
        </Form.Item>
        <Form.Item label="Radio" name="myRadio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="DatePicker" name="myDatePicker">
          <DatePicker getPopupContainer={(triggerNode) => triggerNode} />
        </Form.Item>
        <Form.Item label="RangePicker" name="myRangePicker">
          <RangePicker getPopupContainer={(triggerNode) => triggerNode} />
        </Form.Item>
        <Form.Item label="InputNumber" name="myInputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea" name="myTextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" name="mySwitch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
