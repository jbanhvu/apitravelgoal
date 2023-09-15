const express = require('express');
const sql = require('mssql');

const app = express();

// Cấu hình kết nối đến cơ sở dữ liệu SQL Server
const config = {
  user: 'vufabio_SQLLogin_1', // Thay đổi username và password của bạn
  password: 'd1dukosx22',
  server: 'vufabio_db.mssql.somee.com', // Thay đổi server và database của bạn
  database: 'vufabio_db',
  options: {
    encrypt: true, // Sử dụng mã hóa (encrypt) nếu cần thiết
    trustServerCertificate: true
  }
};

// Kết nối đến cơ sở dữ liệu SQL Server
sql.connect(config, err => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu: ' + err.message);
  } else {
    console.log('Đã kết nối đến cơ sở dữ liệu');
  }
});

// Định nghĩa route để lấy danh sách từ bảng "Region"
app.get('/regions', (req, res) => {
  const query = 'SELECT * FROM Region';

  sql.query(query, (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.json(result.recordset);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});
