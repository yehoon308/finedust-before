// import Button, { ButtonProps } from '../components/Button';
// import { Meta, StoryObj } from '@storybook/react';

// const meta = {
//   title: 'Button',
//   component: Button,
//   argTypes: { clickHandler: { action: 'clicked' } },
// } satisfies Meta<ButtonProps>;
// export default meta;

// type Story = StoryObj<typeof meta>;

// const Template: any = (args: any) => <Button {...args} />;

// //case1
// // export const RedButton: Story = {
// //   args: {
// //     label: 'Red',
// //     backgroundColor: 'red',
// //     size: 'md',
// //     color: 'white',
// //     borderRadius: '3px',
// //   },
// // };
// //case2
// export const RedButton = Template.bind({});
// RedButton.args = {
//   label: 'Red',
//   backgroundColor: 'red',
//   size: 'lg',
//   color: 'white',
//   borderRadius: '3px',
// };
// export const BlueButton = Template.bind({});
// BlueButton.args = {
//   label: 'Blue',
//   backgroundColor: 'blue',
//   size: 'lg',
//   color: 'white',
// };
// export const SmButton = Template.bind({});
// SmButton.args = {
//   label: 'Small Button',
//   backgroundColor: 'gray',
//   size: 'sm',
//   color: 'white',
// };
// export const LgButton = Template.bind({});
// LgButton.args = {
//   label: 'Large Button',
//   backgroundColor: 'gray',
//   size: 'lg',
//   color: 'white',
// };
// export const MainButton = Template.bind({});
// MainButton.args = {
//   label: 'Main Button',
//   backgroundColor: 'brown',
//   size: 'lg',
//   color: 'white',
// };
// // export const SmButton: Story = {
// //   args: {
// //     label: 'Red',
// //     backgroundColor: 'red',
// //     size: 'md',
// //     color: 'white',
// //     borderRadius: '3px',
// //   },
// // };
// // export const LgButton: Story = {
// //   args: {
// //     label: 'Red',
// //     backgroundColor: 'red',
// //     size: 'md',
// //     color: 'white',
// //     borderRadius: '3px',
// //   },
// // };
// // export const MainButton: Story = {
// //   args: {
// //     label: 'Red',
// //     backgroundColor: 'red',
// //     size: 'md',
// //     color: 'white',
// //     borderRadius: '3px',
// //   },
// // };
