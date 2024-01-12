import Image from "next/image";
import logo from "../images/LogoUTC.webp";
import styles from "../styles/tab-info.module.css";

const TabInfo = () => {
  return (
    <div className={styles.containerTabInfo}>
      <div className={styles.contentTabInfo}>
        <div className={styles.containerLogo}>
          <Image alt="logo" src={logo} width={200} height={"auto"} />
          <h1>TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI. </h1>
        </div>
      </div>
      <br />
      <h2>
        ĐỀ TÀI: Thiết kế mô hình hệ thống tự động điểm danh sinh viên bằng công
        nghệ RFID
      </h2>
      <div className={styles.des}>
        <h4>Họ và tên: Ngô Văn Tuấn.</h4>
        <h4>Lớp: Tự động hóa 1.</h4>
        <h4>Khóa: 60.</h4>
        <h4>GVHH: TS. Nguyễn Hoàng Vân. </h4>
      </div>
    </div>
  );
};

export default TabInfo;
