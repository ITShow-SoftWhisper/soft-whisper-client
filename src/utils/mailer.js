import nodemailer from "nodemailer";

export async function sendMail(to, link) {
  console.log("보내는 대상 이메일:", to);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seoyoun8879@gmail.com",
      pass: "szqczwlbmwfatfyr",
    },
  });

  const mailOptions = {
    from: "seoyoun8879@gmail.com",
    to,
    subject: "🔮 당신의 운세가 도착했어요!!",
    html: `<p>아래 링크를 눌러 확인하세요: <a href="${link}">${link}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
}
