import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import App from './App';

const data = {
  myInput: 'test input',
  mySelect: ['A', 'B'],
  myCheckbox: true,
  myRadio: 'apple',
  myInputNumber: 4,
  myTextArea: 'test text area',
  myDatePicker: undefined,
  myRangePicker: [
    moment().subtract(1, 'days').format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
  ],
  mySwitch: true,
};

test('antd form components', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  const { container } = render(<App onSubmit={onSubmit} />);
  const button = screen.getByRole('button', { name: 'Submit' });

  // Input
  await user.type(screen.getByRole('textbox', { name: 'Input' }), data.myInput);
  // Select
  await user.click(screen.getByRole('combobox', { name: 'Select' }));
  await user.click(screen.getByTitle('Label A'));
  await user.click(screen.getByTitle('Label B'));
  // Checkbox: name should be label + checkbox text , can also use regex expression /Checkbox/i
  await user.click(
    screen.getByRole('checkbox', {
      name: 'Checkbox Check me',
    })
  );
  // Radio
  const radio = screen.getByRole('radio', {
    name: 'Apple',
  });
  await user.click(radio);

  // DatePicker
  const datePicker = screen.getByRole('textbox', { name: 'DatePicker' });
  //   await user.click(datePicker);
  //   await user.click(screen.getByTitle(data.myDatePicker.format('YYYY-MM-DD')));
  // RangePicker
  const rangePicker = screen.getByRole('textbox', { name: 'RangePicker' });
  await user.click(rangePicker);
  await user.click(screen.getByTitle(data.myRangePicker[0]));
  await user.click(screen.getByTitle(data.myRangePicker[1]));

  // InputNumber
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role
  const inputNumber = screen.getByRole('spinbutton', { name: 'InputNumber' });
  await user.type(inputNumber, data.myInputNumber.toString());

  // TextArea
  await user.type(
    screen.getByRole('textbox', { name: 'TextArea' }),
    data.myTextArea
  );

  // Switch
  await user.click(screen.getByRole('switch', { name: 'Switch' }));

  // Submit
  await user.click(button);
  expect(onSubmit).toHaveBeenCalledWith(data);
});
