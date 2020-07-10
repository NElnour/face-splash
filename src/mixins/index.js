import * as faceAPI from "face-api.js";

// eslint-disable-next-line no-unused-vars

const confidenceThresh = 0.3;

faceAPI.env.monkeyPatch({
  canvas: HTMLCanvasElement,
  ImageData: ImageData,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img")
});

async function stage() {
  await faceAPI.nets.ssdMobilenetv1.load("/models");
  await faceAPI.nets.faceLandmark68Net.load("/models");
  await faceAPI.nets.ageGenderNet.load("/models");
  await faceAPI.nets.faceExpressionNet.load("/models");
}

stage();

function center(image, canvas) {
  canvas.width = image.width;
  canvas.height = image.height;
}

/// detect all faces
async function faceDetect(image, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let faces = await faceAPI.detectAllFaces(
    image,
    new faceAPI.SsdMobilenetv1Options({ confidenceThresh })
  );
  center(image, canvas);
  ctx.drawImage(image, 0, 0);
  faceAPI.draw.drawDetections(canvas, faces);
}

// detect age and gender
async function ageAndGenderDetect(image, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let ageAndGender = await faceAPI
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withAgeAndGender();

  faceAPI.draw.drawDetections(
    canvas,
    ageAndGender.map(res => res.detection)
  );
  center(image, canvas);
  ctx.drawImage(image, 0, 0);
  ageAndGender.forEach(result => {
    const { age, gender, genderProbability } = result;
    new faceAPI.draw.DrawTextField(
      [
        `${faceAPI.utils.round(age, 0)} years`,
        `${gender} (${faceAPI.utils.round(genderProbability)})`
      ],
      result.detection.box.bottomLeft
    ).draw(canvas);
  });
}

// detect sentiment
async function sentimentDetect(image, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let sentiment = await faceAPI
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceExpressions();
  center(image, canvas);
  ctx.drawImage(image, 0, 0);
  faceAPI.draw.drawDetections(
    canvas,
    sentiment.map(res => res.detection)
  );
  faceAPI.draw.drawFaceExpressions(canvas, sentiment);
}

export { faceDetect, ageAndGenderDetect, sentimentDetect };
