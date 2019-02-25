export default {
  apiUrl: 'https://api.kobiton.com/wd/hub',
  testServer: {
    url: process.env.KOBITON_REPORT_SERVER_URL,
    secretKey: process.env.KOBITON_REPORT_SECRET_KEY
  }
}
