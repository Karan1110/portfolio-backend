const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000

app.use(cors())
app.use(express.json())

const LimMailer = require("lim-mailer")

app.post("/", (req, res) => {
  const mailer = new LimMailer(
    {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "gowdakaran939@gmail.com", // generated Gmail user
        pass: "spywobbvhtbkswyi", // generated Gmail password
      },
      alias: `Portfolio ${req.body.from}`,
    },
    {
      to: ["karan5ipsvig@gmail.com"], // list of receivers
      cc: [],
    }
  )

  // or set the outbox and inbox separately:
  mailer.setOutbox({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gowdakaran939@gmail.com",
      pass: "spywobbvhtbkswyi",
    },
    alias: `Portfolio ${req.body.from}`,
  })

  mailer.setInbox({
    to: ["karan5ipsvig@gmail.com"],
    cc: [],
  })

  mailer
    .sendMail({
      subject: `${req.body.subject}`, // Subject line
      html: `<b>${req.body.body}</b>`, // HTML body
    })
    .then((info) => {
      console.log(
        "\x1B[2m" +
          new Date().toLocaleString() +
          "\x1B[0m \x1B[32msuccess: \x1B[0m"
      )
      console.log(info)
    })
    .catch((err) => {
      console.log(
        "\x1B[2m" +
          new Date().toLocaleString() +
          "\x1B[0m \x1B[31merror: \x1B[0m" +
          err
      )
    })
  res.send("email sent.")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
