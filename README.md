# running locally

1. install using npm

   `npm install`

2. run dev

   `npm run start`


```
import "./App.css";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

const USER_NO = "ME00001";
const LIMIT = 5;

const INITIAL_SUMMARY = {
  count: 0,
  minute: 0,
  distance: 0,
  carbonReduction: 0,
};

const INITIAL_USAGE = {
  list: [],
};

const meterToKilometer = (value = 0) => {
  return (value / 1000).toFixed(1);
};

const getTotalPaymentString = (cardPay = 0, pointPay = 0) => {
  let totalPayment = "";
  if (cardPay !== 0 && pointPay !== 0) {
    totalPayment = `카드 ${cardPay}원 + 포인트 ${pointPay}P`;
  } else if (cardPay !== 0 && pointPay === 0) {
    totalPayment = `카드 ${cardPay}원`;
  } else if (cardPay === 0 && pointPay !== 0) {
    totalPayment = `포인트 ${pointPay}P`;
  } else {
    totalPayment = "";
  }
  return totalPayment;
};

function App() {
  const [ptype, setPtype] = useState(1);

  const [userName, setUserName] = useState("");
  const [summary, setSummary] = useState(INITIAL_SUMMARY);
  const [usage, setUsage] = useState(INITIAL_USAGE);

  const getUserName = () => {
    axios
      .get(`http://localhost:8080/api/v1/user/${USER_NO}`)
      .then((response) => {
        setUserName(response.data?.name);
      });
  };

  const getSummary = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/${USER_NO}/usage/summary?ptype=${ptype}`
      )
      .then((response) => {
        const newSummary = {
          count: response.data?.usage_count ?? 0,
          minute: response.data?.usage_minute ?? 0,
          distance: meterToKilometer(response.data?.usage_meter),
          carbonReduction: response.data?.carbon_reduction?.toFixed(1) ?? 0,
        };
        setSummary(newSummary);
      });
  };

  const getUsage = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${ptype}&offset=0&limit=${LIMIT}`
      )
      .then((response) => {
        const data = response.data;
        const newUsage = {
          list: data.list,
        };
        setUsage(newUsage);
      });
  };

  const handleTabClick = (e) => {
    const _ptype = +e.target.dataset.ptype;
    setPtype(_ptype);
  };

  useEffect(() => {
    getSummary();
    getUsage();
    // eslint-disable-next-line
  }, [ptype]);

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div>
      <div className="main-title">
        <h1>서비스 이용내역</h1>
        <div>{userName}</div>
      </div>
      <hr />

      <div className="service-summary">
        <div className="service-summary-tab">
          <button
            data-ptype="1"
            className={`tablinks ${ptype === 1 ? "on" : null}`}
            onClick={handleTabClick}
          >
            1주일
          </button>
          <button
            data-ptype="2"
            className={`tablinks ${ptype === 2 ? "on" : null}`}
            onClick={handleTabClick}
          >
            1개월
          </button>
          <button
            data-ptype="3"
            className={`tablinks ${ptype === 3 ? "on" : null}`}
            onClick={handleTabClick}
          >
            3개월
          </button>
        </div>
        <div className="spacer-20"></div>
        <div className="service-summary-detail-container">
          <div className="color-gray">이용건수</div>
          <div>{summary.count}건</div>
          <div className="color-gray">이용시간</div>
          <div>{summary.minute}분</div>
          <div className="color-gray">이동거리</div>
          <div>{summary.distance}km</div>
          <div className="color-gray">탄소절감효과</div>
          <div>{summary.carbonReduction}kg</div>
        </div>
      </div>

      <hr />

      {usage.list.length > 0 ? (
        <Fragment>
          <div className="service-list-container">
            {usage.list.map((item) => {
              const distance = item?.use_distance
                ? meterToKilometer(item?.use_distance)
                : 0;
              const time = item?.use_time ?? 0;
              const timeRange = `${item?.use_start_dt} ~ ${item?.use_end_dt}`;
              const payDateTime = item?.pay_datetime;
              const totalPayment = getTotalPaymentString(
                item?.card_pay,
                item?.point_pay
              );

              return (
                <Fragment key={item.use_no}>
                  <div className="service-list-content">
                    <div className="service-list-header">
                      <span>{distance}km</span>
                      <span className="color-gray ml-10">{time}분</span>
                    </div>
                    <div className="service-list-body">
                      <div className="color-gray">이용시간</div>
                      <div>{timeRange}</div>
                      <div className="color-gray">결제일시</div>
                      <div>{payDateTime}</div>
                      <div className="color-gray">결제수단</div>
                      <div>{totalPayment}</div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <div className="service-empty">
          <div className="service-empty-container">
            <div className="service-empty-message">조회된 정보가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

```
/*공통*/
.spacer-20 {
  width: 100%;
  height: 20px;
}

.color-gray {
  color:gray
}

.ml-10 {
  margin-left: 10px;
}

/*제목*/
.main-title {
  padding: 0px 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

/*요약영역*/
.service-summary {
  padding: 10px
}

.service-summary-tab {
  display: flex;
}

.service-summary-tab button {
  width: 33.33%;
  background-color: lightgray;
  cursor: pointer;
  padding: 12px 24px; 
  border: 1px solid black;
  border-right: transparent;
  box-sizing: border-box; 
  font-size: 1.125rem;
  text-align: center;
}

.service-summary-tab button:last-child {
  border-right: 1px solid black;
}

.service-summary-tab button.on {
  color: white;
  background-color: black;
}

/*요약영역 내용*/
.service-summary-detail-container {
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 10px;
  border: 1px solid gray;
  padding: 10px 20px;
}

.service-summary-detail-container div:nth-child(even) {
  text-align: right;
}

@import url(reset.css);

/*상세내용 영역*/
.service-list-content {
  padding: 10px;
}

.service-list-body {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  padding: 10px;
}

/*더보기 버튼 영역*/
.service-more {
  display: flex;
  justify-content: center;
  align-items: center;
}

.more-button {
  background-color: gray;
  border: none;
  color: white;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  cursor: pointer;
}

/*영역구분*/
.divider {
  width: 100%;
  height: 1px;
  background-color: gray;
}

/*조회결과 없음 영역*/
.service-empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.service-empty-message {
  width: 100%;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
}
