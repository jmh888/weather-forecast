import {
  Table,
  Caption,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell
} from '@zendeskgarden/react-tables';
import './weathertable.css';
import { WeatherInfo } from '../interface/WeatherInfo';

interface WeatherTableProps {
  caption: string;
  weatherInfoList: Array<WeatherInfo>;
}

export const WeatherTable = ({caption, weatherInfoList}: WeatherTableProps) => {

  return (
    <div className="TempTable">
      <Table size={'small'} style={{margin: 'auto', width: '80%', fontSize: '0.3'}}>
        <Caption>{caption}</Caption>
        <Head>
          <HeaderRow>
            <HeaderCell>Time</HeaderCell>
            <HeaderCell>Temperature</HeaderCell>
            <HeaderCell>Humidity</HeaderCell>
            <HeaderCell>Wind Speed</HeaderCell>
            <HeaderCell>Wind Gusts</HeaderCell>
            <HeaderCell>Rain</HeaderCell>
            <HeaderCell>Pressure (Mean Sea Level)</HeaderCell>
            <HeaderCell>Pressure (Atmospheric)</HeaderCell>
          </HeaderRow>
        </Head>

        <Body>
          {
            weatherInfoList.map((item, i) => {
              let dateTimeStamp = new Date(item.timeStamp).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"});
              dateTimeStamp = dateTimeStamp === 'Invalid Date' ? "--------, --- --, ----, --:-- --" : dateTimeStamp;

              return (
                <Row key={'weather-info-list' + i}>
                  <Cell>{dateTimeStamp}</Cell>
                  <Cell>{item.temperature}</Cell>
                  <Cell>{item.humidity}</Cell>
                  <Cell>{item.windSpeed}</Cell>
                  <Cell>{item.windGusts}</Cell>
                  <Cell>{item.rain}</Cell>
                  <Cell>{item.pressureMsl}</Cell>
                  <Cell>{item.surfacePressure}</Cell>
                </Row>
              );
            })
          }
        </Body>
      </Table>
    </div>
  );
};
