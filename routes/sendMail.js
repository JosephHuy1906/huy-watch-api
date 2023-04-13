const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const user = require('../models/user');

router.post('/sendmaid', async (req, res) => {
    const { email } = req.body;

    user.getUS(email, (list) => {
        if (list.length <= 0) {
            res.json({ message: 'Email không tồn tại' });
            return ;
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'huydeptrai19062002@gmail.com', // generated ethereal user
                pass: 'rxfhslqxmtlimsam', // generated ethereal password
            },
        });
        const code = Math.random().toString(36).substring(2, 10);
        var content = '';
        content += `
            <div style="padding: 10px; background-color: #003375">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #0085ff">Dưới đây là mã khôi phục password</h4>
                    <span style="color: black">Mã code: ${code}</span>
                </div>
            </div>
        `;
      
        transporter.sendMail(
            {
                from: 'huydeptrai19062002@gmail.com', // sender address
                to: `${email}`, // list of receivers
                subject: 'Khôi phục mật khẩu', // Subject line
                text: 'Hello world?', // plain text body
                html: content, // html body
            },
            (err) => {
                if (err) {
                    return res.json({ message: 'Lỗi', err });
                }
                return res.json({ message: 'Đã thành công', code: code });
            },
        );

        user.updateCode(email, code,function (err, data) {
            res.json({ message: 'Update thành công' });
        })
    });
});

module.exports = router;
