import nodemailer from "nodemailer";

export async function sendMail(to, link) {
  console.log("보내는 대상 이메일:", to);
  const password = "hfzchitesrjrhyxx";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "softwhisperfortune@gmail.com",
      pass: password,
    },
  });

  const mailOptions = {
    from: `"Soft Whisper" <softwhisperfortune@gmai>`,
    to,
    subject: "🔮 당신의 운세가 도착했어요!!",
    html: `<p>아래 링크를 눌러 확인하세요: <a href="${link}">${link}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
}
