import { Card, Avatar, Row, Col, Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUpcomingWeather, getCurrentWeather } from 'Apis';
import moment from 'moment';

const { Panel } = Collapse;

const Details = ({ center }) => {
  const [loading, setLoading] = useState(true);
  const [nextWeatherLoader, setNextWeatherLoaderLoading] = useState(true);
  const [details, setDetails] = useState();
  const [nextWeatherData, setNextWeatherData] = useState();
  const { Meta } = Card;

  const getWeather = async ({ lat, lng }) => {
    const data = await getCurrentWeather({ lat, lng });
    setDetails(data);
    setLoading(false);
  };

  const getNextThreeDaysWeather = async ({ lat, lng }, limit) => {
    const data = await getUpcomingWeather({ lat, lng }, limit);
    setNextWeatherData(data);
    setNextWeatherLoaderLoading(false);
  };

  useEffect(() => {
    if (!details) {
      if (center) {
        getWeather(center);
        getNextThreeDaysWeather(center, 3);
      }
    }
  }, [center, details]);

  const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const kelvinToCelcius = (kelvin) => Math.floor(kelvin - 273.15).toFixed(1);

  return (
    <div>
      <Card style={{ width: 300 }} loading={loading}>
        {details && (
          <Meta
            title={
              <Row>
                <Col className="pr-3">
                  <Avatar src={details.icon} />
                </Col>
                <Col>{details.name}</Col>
              </Row>
            }
            description={
              <Col>
                <div className="ps-3 pb-3">
                  <Row>{moment().format('hh:mm A MMM DD')}</Row>
                  <Row>{details.weather[0].description}</Row>
                  <Row>{kelvinToCelcius(details.main.temp)} &#8451;</Row>
                </div>
                <Collapse bordered={true}>
                  <Panel
                    showArrow={false}
                    header="Next 3 Days Forecast"
                    key="1"
                  >
                    <Card hoverable loading={nextWeatherLoader}>
                      {' '}
                      {!nextWeatherLoader && (
                        <Col>
                          {nextWeatherData.map((item, index) => (
                            <Row key={index} className="pb-3 border-bottom">
                              <Col className="pr-3">
                                <span className="pr-2">
                                  {
                                    weekdays[
                                      moment()
                                        .add(index + 1, 'days')
                                        .isoWeekday() - 1
                                    ]
                                  }{' '}
                                  ,
                                </span>

                                <span className="pr-3">
                                  {moment()
                                    .add(index + 1, 'days')
                                    .format('MMM DD')}{' '}
                                </span>
                              </Col>
                              <Col>
                                {kelvinToCelcius(item.temp.average)} &#8451;
                              </Col>
                            </Row>
                          ))}
                        </Col>
                      )}
                    </Card>
                  </Panel>
                </Collapse>
              </Col>
            }
          />
        )}
      </Card>
    </div>
  );
};

export default Details;
