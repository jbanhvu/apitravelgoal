// app.js

const express = require('express');
const admin = require('firebase-admin');

// Khởi tạo Firebase Admin SDK với cấu hình từ tệp serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://travelgoal-b7671.firebaseio.com' // Thay thế bằng URL Firebase của bạn
});

const app = express();
const db = admin.firestore();

// Định tuyến để lấy dữ liệu từ collection "Regions"
app.get('/regions', async (req, res) => {
  try {
    const regionsSnapshot = await db.collection('regions').get();
    const regions = [];
    
    regionsSnapshot.forEach((doc) => {
      regions.push(doc.data());
    });

    res.json(regions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
  }
});

// Khởi động máy chủ API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API đang lắng nghe trên cổng ${PORT}`);
});
