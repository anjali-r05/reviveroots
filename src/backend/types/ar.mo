import Common "common";

module {
  public type ARCapture = {
    id : Text;
    userId : Common.UserId;
    sceneId : Text;
    imageData : Text;
    title : Text;
    description : Text;
    timestamp : Common.Timestamp;
  };
};
