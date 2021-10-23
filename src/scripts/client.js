//@ts-check
const avengerNames = [
  "Thor",
  "Cap",
  "Tony Stark",
  "Black Panther",
  "Black Widow",
  "Hulk",
  "Spider-Man",
];
let randomName = avengerNames[Math.floor(Math.random() * avengerNames.length)];
const main = async () => {
  VoxeetSDK.initialize(
    "XXXXXXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    // process.env.DOLBY_IO_CONSUMER_KEY,
    // process.env.DOLBY_IO_CONSUMER_SECRET
  );
  try {
    await VoxeetSDK.session.open({ name: randomName });
    initUI();
  } catch (e) {
    alert("Something went wrong : " + e);
  }

  VoxeetSDK.conference.on("streamAdded", (participant, stream) => {
    if (stream.type === "ScreenShare") return addScreenSahreNode(stream);
    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
    }
    addParticipantNode(participant);
  });

  VoxeetSDK.conference.on("streamUpdated", (participant, stream) => {
    if (stream.type === "ScreenShare") return;

    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
    } else {
      removeVideoNode(participant);
    }
  });

  VoxeetSDK.conference.on("streamRemoved", (participant, stream) => {
    if (stream.type === "ScreenShare") return removeScreenShareNode();

    removeVideoNode(participant);
    removeParticipantNode(participant);
  });
};

main();
