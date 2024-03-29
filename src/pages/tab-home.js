import { useEffect, useState } from "react";
import styles from "../styles/tab-home.module.css";
import {
  convertDateTime,
  getCurrentDate,
  getDateTime,
} from "./api/convert-time";
import {
  getHistory,
  addHistory,
  getHistoryById,
  updateHistory,
  getUserByIdCard,
} from "./api/networking";

const TabHome = (props) => {
  const [data, setData] = useState([]);
  const [cardId, setCardId] = useState(0);

  useEffect(() => {
    getHistoryData();
  }, [props.trigger]);

  useEffect(() => {
    if (props.cardId > 0) {
      checkExistCardId(props.cardId);
    }
  }, [props.cardId, props.triggerNewCard]);

  const getHistoryData = async () => {
    let res = await getHistory(10);
    if (res) {
      setData(res);
    }
  };

  const checkExistCardId = async (cardId) => {
    let res = await getUserByIdCard(cardId);
    console.log(res);
    if (res) {
      if (res.length > 0) {
        // setCardId(cardId);
        // setUserName(res[0].username);
        // setTimeCreate(convertDateTime(res[0].create_time));
        // props.wsSend(
        //   res[0].username.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        // );
        checkSateHistory(props.cardId);
      } else {
        // props.wsSend("The khong hop le");
        alert("Thẻ không hợp lệ");
      }
    }
  };

  const addHistoryData = async (cardId) => {
    let data = {
      id_card: cardId,
      date_time_in: getDateTime(),
      date_time_out: null,
    };
    let res = await addHistory(data);
    if (res) {
      getHistoryData();
    }
  };

  const checkSateHistory = async (cardId) => {
    let data = {
      id_card: cardId,
      from: `${getCurrentDate()} 00:00:00`,
      to: `${getCurrentDate()} 23:59:59`,
    };
    let res = await getHistoryById(data);
    if (res) {
      if (res.length > 0) {
        if (res[0].date_time_out) {
          addHistoryData(props.cardId);
        } else {
          let dataUpdate = [
            {
              date_time_out: getDateTime(),
            },
            res[0].id,
          ];
          let isSuccess = await updateHistory(dataUpdate);
          if (isSuccess) {
            getHistoryData();
          }
        }
      } else {
        addHistoryData(props.cardId);
      }
    }
  };

  return (
    <div className={styles.panelHome}>
      <div className={styles.paneRight}>
        <div className={styles.cartTitle}>Thông tin 10 sự kiện gần nhất</div>
        <div className={styles.containerTable}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">ID Card</th>
                <th scope="col">Họ và Tên</th>
                <th scope="col">Thời gian vào</th>
                <th scope="col">Thời gian ra</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.id_card}</td>
                    <td>{item.username}</td>
                    <td>
                      {item.date_time_in
                        ? convertDateTime(item.date_time_in)
                        : "--"}
                    </td>
                    <td>
                      {item.date_time_out
                        ? convertDateTime(item.date_time_out)
                        : "--"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style global jsx>{`
        tbody,
        td,
        tfoot,
        th,
        thead,
        tr {
          border-color: #643f66;
          color: #aba9a9;
          cursor: pointer;
        }

        tbody > tr:hover > th,
        tbody > tr:hover > td {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default TabHome;
