import { imageDetails } from "./imageDetails.js";

const scene = document.querySelector("#scene");

class Component {
  constructor(data, elementType, parent = scene) {
    this.data = data;
    this.elementType = elementType;
    this.element = document.createElement(elementType);
    this.parent = parent;
  }

  render() {
    if (this.data) {
      for (const [key, value] of Object.entries(this.data)) {
        this.element.setAttribute(key, value);
      }
      this.parent.appendChild(this.element);
    }
  }
}

class Frame extends Component {
  constructor(data) {
    super(data.frame, "a-box");
    this.element.setAttribute("id", data.id);
  }
}

class Image extends Component {
  constructor(data) {
    super(data.image, "a-image");
    this.parentFrame = document.querySelector(`#${data.id}`);
  }

  render() {
    const selectedParent = this.parentFrame || scene;
    super.render();
    selectedParent.appendChild(this.element);
  }
}

class Plane extends Component {
  constructor(data) {
    super(data, "a-plane");
  }

  render() {
    super.render();
    this.data.children?.forEach((item) => {
      const entity = new Entity(item, this.element);
      entity.render();
    });
  }
}

class Entity extends Component {
  constructor(data, parent = scene) {
    super(data, "a-entity", parent);
  }
}

class Camera extends Component {
  constructor(data) {
    super(data, "a-entity");
    this.cameraData = data;
  }

  addCamera() {
    const cameraEntity = new Entity(this.cameraData.camera, this.element);
    cameraEntity.render();
  }

  render() {
    super.render();
    this.addCamera();
  }
}

// CREATE GALLERY
imageDetails?.gallery?.forEach((model) => {
  const galleryEntity = new Entity(model);
  galleryEntity.render();
});

// CREATE FRAMES
imageDetails?.elements?.forEach((img) => {
  const frame = new Frame(img);
  frame.render();
});

// CREATE IMAGES
imageDetails?.elements?.forEach((img) => {
  const image = new Image(img);
  image.render();
});

// CREATE POPUP
const popup = new Plane(imageDetails?.popup);
popup.render();

// CREATE RIG
const rig = new Camera(imageDetails?.camera);
rig.render();


// GET ALL IMAGES AND 3D MODELS
function getAllAssets(obj) {
  const assets = [];

  const extractFromObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        extractFromObject(obj[key]);
      } else if (
        key === "src" ||
        key === "normal-map" ||
        key === "gltf-model"
      ) {
        assets.push(obj[key]);
      }
    }
  };

  extractFromObject(obj);

  return assets;
}

const allAssets = getAllAssets(imageDetails);
console.log(allAssets);
