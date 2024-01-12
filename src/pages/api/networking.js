import axios from "axios";

// var baseURL = "http://113.161.240.83:42600/api/";
var baseURL = "http://127.0.0.1:42600/api/";

const axios_mysql = axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  timeout: 5000,
  withCredentials: true,
  crossDomain: true,
});

// async function getAllHistory() {
//   const res = await axios_mysql.get(`history/all/`);
//   console.log(res);
//   const resJson = await res.json();
//   if (resJson.result.status === "success") {
//     return resJson.result.data;
//   } else {
//     return null;
//   }
// }

async function getAllHistory() {
  const res = await axios_mysql.get(`history/all/`);
  // console.log(res);
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function getHistory(limit) {
  const res = await axios_mysql.get(`history/get/${limit}`);
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function getHistoryById(data) {
  const res = await axios_mysql.get(
    `history/get-by-id/${data.id_card}/${data.from}/${data.to}`
  );
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function filterHistory(data) {
  const res = await axios_mysql.get(
    `history/filter/${data.from}/${data.to}/${data.sort}`
  );
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function addHistory(data) {
  const res = await axios_mysql.post(`history/add`, data);
  if (res.data.result.status === "success") {
    return true;
  } else {
    return false;
  }
}

async function updateHistory(data) {
  const res = await axios_mysql.put(`history/update`, data);
  if (res.data.result.status === "success") {
    return true;
  } else {
    return false;
  }
}

async function getAllUser() {
  const res = await axios_mysql.get(`user/all/`);
  // console.log(res);
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function getUserByIdCard(idCard) {
  const res = await axios_mysql.get(`user/get-by-id-card/${idCard}`);
  if (res.data.result.status === "success") {
    return res.data.result.data;
  } else {
    return null;
  }
}

async function addUser(data) {
  const res = await axios_mysql.post(`user/add/`, data);
  if (res.data.result.status === "success") {
    return true;
  } else {
    return false;
  }
}

async function editUser(data) {
  const res = await axios_mysql.put(`user/update/`, data);
  if (res.data.result.status === "success") {
    return true;
  } else {
    return false;
  }
}

async function deleteUser(id) {
  const res = await axios_mysql.delete(`user/delete/${id}`);
  if (res.data.result.status === "success") {
    return true;
  } else {
    return false;
  }
}

export {
  getAllHistory,
  getHistory,
  getHistoryById,
  filterHistory,
  addHistory,
  updateHistory,
  getAllUser,
  getUserByIdCard,
  addUser,
  editUser,
  deleteUser,
};
