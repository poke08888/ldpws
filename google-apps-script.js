/**
 * HƯỚNG DẪN CÀI ĐẶT GOOGLE APPS SCRIPT
 * =======================================
 * 1. Mở Google Sheet bạn muốn lưu dữ liệu đăng ký.
 * 2. Vào menu: Extensions → Apps Script.
 * 3. Xoá code mặc định, paste toàn bộ nội dung file này vào.
 * 4. Bấm "Save" (Ctrl+S).
 * 5. Bấm "Deploy" → "New deployment".
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Bấm "Deploy" → copy URL vừa tạo.
 * 6. Mở file "Workshop Lam Thuong Hieu.html", tìm dòng:
 *      var SCRIPT_URL = "";
 *    Dán URL vào giữa hai dấu ngoặc kép.
 * 7. Push lên Netlify lại là xong.
 *
 * Mỗi lần submit form, 1 hàng mới sẽ được thêm vào Sheet với các cột:
 * Thời gian | Họ tên | SĐT | Email | Công ty | Chức vụ | Ghi chú | Đã CK
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Tạo header nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian', 'Họ và tên', 'Số điện thoại', 'Email',
        'Công ty / Thương hiệu', 'Chức vụ', 'Ghi chú', 'Đã chuyển khoản'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#d11f2a').setFontColor('#ffffff');
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.thoigian   || new Date().toLocaleString('vi-VN'),
      data.hoten       || '',
      data.sdt         || '',
      data.email       || '',
      data.congty      || '',
      data.chucvu      || '',
      data.ghichu      || '',
      data.dachuyenkhoan || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm test — chạy thủ công trong Apps Script editor để kiểm tra
function test_doPost() {
  var mock = {
    postData: {
      contents: JSON.stringify({
        thoigian: '03/06/2026, 10:00:00',
        hoten: 'Nguyễn Văn A',
        sdt: '0901234567',
        email: 'test@example.com',
        congty: 'Công ty ABC',
        chucvu: 'CEO / Nhà sáng lập',
        ghichu: '',
        dachuyenkhoan: 'Đã chuyển khoản'
      })
    }
  };
  Logger.log(doPost(mock).getContent());
}
