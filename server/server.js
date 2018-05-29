const path = require('path'),
      express = require('express'),
      app = express();

const staticFilesPath = path.join(__dirname, '../public'),
      PORT = process.env.PORT || 3000;

app.use(express.static(staticFilesPath));
app.set("x-powered-by", false);

app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});
