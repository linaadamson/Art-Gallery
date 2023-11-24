import { imageDetails } from "./imageDetails.js";

function objectToPos(object) {
  return object.x + " " + object.y + " " + object.z;
}

function objectToRot(object) {
  return object.x + " " + object.y + " " + object.z;
}
function cameraToRot(object) {
  return object.x + " " + object.y + " " + object.z;
}

function cameraToPos(object) {
  if (object.x < 0) {
    return object.x + 1.2 + " " + 0 + " " + object.z;
  }
  return object.x - 1.2 + " " + 0 + " " + object.z;
}

function clickHandler() {
  let rig = document.querySelector("#cameraRig");
  let camera = document.querySelector("#camera");
  camera.setAttribute("look-controls", "enabled", false);
  camera.setAttribute("wasd-controls", "enabled", false);
  camera.setAttribute("position", "0 1.6 0");
  camera.setAttribute("rotation", "0 0 0");

  let targetPos = cameraToPos(this.getAttribute("position"));
  let targetRot = cameraToRot(this.getAttribute("rotation"));
  let rigPos = objectToPos(rig.getAttribute("position"));
  let rigRot = objectToRot(rig.getAttribute("rotation"));

  rig.setAttribute(
    "animation",
    `property:position; from: ${rigPos}; to: ${targetPos}; dur: 1000`
  );

  rig.setAttribute(
    "animation__2",
    `property:rotation; from: ${rigRot}; to: ${targetRot}; dur: 1000`
  );

  camera.setAttribute(
    "animation__3",
    `property:rotation; to: 0 0 0; dur: 1000`
  );
  camera.setAttribute(
    "animation__4",
    `property:position; to: 0 1.6 0; dur: 700`
  );

  openPopup(this);

  console.log("click", objectToRot(camera.getAttribute("rotation")));
}

function popupToPos(object) {
  if (object.x < 0) {
    return object.x + 0.1 + " " + object.y + " " + (object.z - 1.34);
  }

  return object.x - 0.1 + " " + object.y + " " + (object.z - 1.34);
}

function openPopup(target) {
  let title = document.querySelector("#title");
  let description = document.querySelector("#description");
  let popup = document.querySelector("#popup");

  const selectedImg = imageDetails.elements.find((item) => item.id === target.id);

  let targetPos = popupToPos(target.getAttribute("position"));
  let targetRot = cameraToRot(target.getAttribute("rotation"));

  title.setAttribute("text", "value", selectedImg?.title);
  description.setAttribute("text", "value", selectedImg?.description);
  popup.setAttribute("animation", `property:visible; from: false; to: true;`);
  popup.setAttribute("rotation", targetRot);
  popup.setAttribute("position", targetPos);
}

function closePopupHandler() {
  let rig = document.querySelector("#cameraRig");
  let camera = document.querySelector("#camera");
  let popup = document.querySelector("#popup");
  let rigPos = objectToPos(rig.getAttribute("position"));
  let rigRot = objectToRot(rig.getAttribute("rotation"));
  camera.setAttribute("look-controls", "enabled", true);
  camera.setAttribute("wasd-controls", "enabled", true);
  camera.setAttribute(
    "animation__3",
    `property:rotation; to: 0 0 0; dur: 1000`
  );
  camera.setAttribute(
    "animation__4",
    `property:position; to: 0 1.6 0; dur: 700`
  );

  popup.setAttribute("animation", `property:visible; from: true; to: false;`);
  popup.setAttribute("position", "0 0 0");

  rig.setAttribute(
    "animation",
    `property:position; from: ${rigPos}; to: 0 0 3; dur: 1000`
  );

  rig.setAttribute(
    "animation__2",
    `property:rotation; from: ${rigRot}; to:0 0 0 ; dur: 1000`
  );

  console.log("close", objectToRot(camera.getAttribute("rotation")));
}

AFRAME.registerComponent("move-camera", {
  init: function () {
    this.el.addEventListener("click", clickHandler);
  },

  remove: function () {
    this.el.removeEventListener("click", clickHandler);
  },
});

AFRAME.registerComponent("close-popup", {
  init: function () {
    this.el.addEventListener("click", closePopupHandler);
  },

  remove: function () {
    this.el.removeEventListener("click", closePopupHandler);
  },
});
