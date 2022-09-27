import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WeatherTable } from './WeatherTable';

export default {
  title: 'Example/WeatherTable',
  component: WeatherTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof WeatherTable>;

const Template: ComponentStory<typeof WeatherTable> = (args) => <WeatherTable {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
  weatherInfoList: [
    {
      timeStamp: new Date("Tuesday, Sep 27, 2022, 2:00 PM").toString(),
      temperature: "65",
      humidity: "70",
      windSpeed: "12",
    },
    {
      timeStamp: new Date("Tuesday, Sep 27, 2022, 3:00 PM").toString(),
      temperature: "70",
      humidity: "75",
      windSpeed: "5",
    },
    {
      timeStamp: new Date("Tuesday, Sep 27, 2022, 4:00 PM").toString(),
      temperature: "72",
      humidity: "70",
      windSpeed: "7",
    },
    {
      timeStamp: new Date("Tuesday, Sep 27, 2022, 5:00 PM").toString(),
      temperature: "76",
      humidity: "77",
      windSpeed: "10",
    }
  ]
 };
