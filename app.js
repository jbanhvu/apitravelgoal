const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// Cấu hình kết nối đến cơ sở dữ liệu SQL Server
const config = {
  user: 'vufabio_SQLLogin_1', // Thay đổi username và password của bạn
  password: 'd1dukosx22',
  server: 'vufabio_db.mssql.somee.com', // Thay đổi server và database của bạn
  database: 'vufabio_db',
  options: {
    enableArithAbort: true,
    encrypt: true, // Sử dụng mã hóa (encrypt) nếu cần thiết
    trustServerCertificate: true
  }
};

// Kết nối đến SQL Server
sql.connect(config)
  .then(() => {
    console.log('Đã kết nối đến SQL Server');
  })
  .catch((err) => {
    console.error('Lỗi kết nối đến SQL Server:', err);
  });

// Middleware để bật CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Định nghĩa route để lấy danh sách từ bảng "Region"
app.get('/regions', (req, res) => {
  const request = new sql.Request();

  request.query('SELECT * FROM Region')
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    });
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại cổng ${port}`);
});
