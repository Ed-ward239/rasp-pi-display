import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css'
import './Time.css';

function Time() {
  const [time, setTime] = useState({
    local: new Date(),
    YGN: moment().tz("Asia/Yangon"),
    TKY: moment().tz("Asia/Tokyo"),
    TPE: moment().tz("Asia/Taipei"),
    LDN: moment().tz("Europe/London")
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime({
        local: new Date(),
        YGN: moment().tz("Asia/Yangon"),
        TKY: moment().tz("Asia/Tokyo"),
        TPE: moment().tz("Asia/Taipei"),
        LDN: moment().tz("Europe/London")
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderClock = (label, timeZone, localTime) => {
    const timeZoneDate = timeZone.toDate();
    const timeDiff = (timeZone.utcOffset() - moment(localTime).utcOffset()) / 60;
    const timeDiffLabel = timeDiff >= 0 ? `+${timeDiff} hours` : `${timeDiff} hours`;
    return (
      <div className="clock-container-small">
        <Clock value={timeZoneDate} size={100} />
        <div>{label}</div>
        <div>{moment(timeZone).format("hh:mm A")}</div>
        <div>{timeDiffLabel} hours</div>
      </div>
    );
  };

  return (
    <div>
      <div className="clock-container">
        <Clock value={time.local} size={150} />
        <div>{moment(time.local).format("hh:mm:ss A")}</div>
      </div>
      <div className="worldClock-container">
        {renderClock("TPE", time.TPE, time.local)}
        {renderClock("YGN", time.YGN, time.local)}
        {renderClock("TKY", time.TKY, time.local)}
        {renderClock("LDN", time.LDN, time.local)}
      </div>
    </div>
  );
}
export default Time