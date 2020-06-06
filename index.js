const express      = require("express");
const app          = express();
const multer       = require("multer");
const cookieParser = require("cookie-parser");
const upload       = multer({limits: {fileSize: 5 * 10 ** 6}}); // 5 MB

const homeController             = require("./controllers/homeController");
const transcriptionJobController = require("./controllers/transcriptionJobController");
const Endpoint                   = require("./endpoints");

app.use(cookieParser());
app.set("view engine", "ejs");
app.get( Endpoint.home,                                                 homeController.home);
app.post(Endpoint.transcriptionJob.start,   upload.single("mediaFile"), transcriptionJobController.startTranscriptionJob);
app.get( Endpoint.transcriptionJob.accepted,                            transcriptionJobController.acceptedTranscriptionJob);
app.get( Endpoint.transcriptionJob.confirmProgress,                     transcriptionJobController.confirmTranscriptionJobStatus);

app.listen(4000, () => console.log("Example app listening on port 4000!"));

