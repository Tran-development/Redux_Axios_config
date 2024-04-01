import React from 'react'

const Home = () => {
    return (
        <div className='container'>
            <h3>Yêu cầu:</h3>
            <div>- Sử dụng API từ trang web https://reqres.in/ để tạo website</div>
            <div>-	Sử dụng framework ReactJS để tạo một màn hình website cơ bản bao gồm các chức năng:</div>
            <br />
            <ul>
            <li>1.	Đăng nhập</li>
            <li>2.	Thêm User</li>
            <li>3.	Sửa User</li>
            <li>4.	Xoá User</li>
            <li>5.	Hiển thị tất cả các User</li>
            <li>6.	Tìm kiếm User theo email</li>
            <li>7.	Sắp xếp theo FirstName</li>
            <li>8.	Import User từ file .csv</li>
            <li>9.	Export User ra file .csv</li>
            </ul>
            <div>-	Tự do điều chỉnh html, css, để có một website nhẹn nhàng, khoa học và đẹp</div>
            <div>-	Commit và đẩy source code lên github public</div>
            <div>-	Triển khai website lên Vercel</div> <br />
            <h3>Result:</h3>
            <div>-	Thời gian hoàn thành: 1-3 ngày</div>
            <div>-	Gửi link Heroku và Github link qua email</div>
            <div>-	Yêu cầu backend (option): sử dụng python django rest framework tạo các api như trên trang web https://reqres.in/  (sau này có thời gian tìm hiểu)</div>
            <div>eve.holt@reqres.in</div>
        </div>
    )
}

export default Home