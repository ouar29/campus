// add styles
import './style.css';
// three.js
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Mesh,
  BoxGeometry,
  DirectionalLight,
  MeshBasicMaterial,
  Vector2,
  Color,
  GridHelper,
  Vector3,
  Texture,
  SpriteMaterial,
  Sprite,
  Raycaster,
} from 'three';

import * as tbc from 'three/examples/jsm/controls/TrackballControls';
import * as obc from 'three/examples/jsm/controls/OrbitControls';
import { DCircle } from './view/shapes/dcircle';
import { DPolygon } from './view/shapes/dpolygon'
import { CampusDataProvider } from './dataprovider/campus-data';
import { BuildingView } from './view/building-view';
import { GpuPickHelper } from './gpu-pick-helper';
import { InfoCardBuilder } from './view/infocard/infocard';
import { Room, Campus } from './model/model';
import { DataSearch } from './data-search';
import { CampusView } from './view/campus-view';
import { RoomProcessData } from './view/processdata/room-processdata';

export class App {

  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private pickingScene: Scene;
  private campus: Campus;
  private lastSelectedRoom: Room;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.up.set(0, 0, 1);
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.pickingScene = new Scene();
    this.pickingScene.background = new Color(0);

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    }

    const pickPosition = { x: -100000, y: -100000 };
    const pickHelper = new GpuPickHelper(this.renderer);
    // clearPickPosition();

    var getCanvasRelativePosition = (event) => {
      const canvas = this.renderer.domElement;
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height,
      };
    }

    var setPickPosition = (event) => {
      const pos = getCanvasRelativePosition(event);
      pickPosition.x = pos.x;
      pickPosition.y = pos.y;
    };

    var clearPickPosition = () => {
      // unlike the mouse which always has a position
      // if the user stops touching the screen we want
      // to stop picking. For now we just pick a value
      // unlikely to pick something
      pickPosition.x = -100000;
      pickPosition.y = -100000;
    };

    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);

    this.attachRenderer();

    const controls = this.createControls();

    const axis = new AxesHelper(10);
    this.scene.add(axis);

    // add lights
    const light = new DirectionalLight(0xffffff, 1.0);
    light.position.set(100, 100, 100);
    this.scene.add(light);
    const light2 = new DirectionalLight(0xffffff, 1.0);
    light2.position.set(-100, 100, -100);
    this.scene.add(light2);

    const material = new MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });

    var grid = new GridHelper(200, 10, 0xffffff, 0x888888);
    grid.geometry.rotateX(Math.PI / 2);
    this.scene.add(grid);

    this.camera.position.x = 0;
    this.camera.position.y = 10;
    this.camera.position.z = 20;

    this.camera.lookAt(0, 0, 0);

    var animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      render();

    };

    var mouse = {
      x: 0,
      y: 0
    };

    var raycaster = new Raycaster();

    var render = () => {
      // // update the picking ray with the camera and mouse position
      // raycaster.setFromCamera(mouse, this.camera);

      // // calculate objects intersecting the picking ray
      // var intersects = raycaster.intersectObjects(this.scene.children, true);

      // for (var i = 0; i < intersects.length; i++) {
      //   if ( (<Mesh> intersects[i].object).isMesh ){
      //     const mesh = <Mesh>intersects[i].object;
      //     (<any>mesh.material).color.set(0xff0000);

      //   }

      // }

      this.renderer.render(this.scene, this.camera);
    }


    this.load();
    animate();


    var onSearch = () => {
      const searchedText = (<HTMLInputElement>document.getElementById("searchbox")).value;

      const foundRoom = DataSearch.findRoom(searchedText, this.campus, true);
      if (undefined !== foundRoom) {
        foundRoom.room.selected = true;
        if(undefined !== this.lastSelectedRoom){
          this.lastSelectedRoom.selected = false;
        }
        this.lastSelectedRoom = foundRoom.room;
        this.modelToView();

        const lastInfoCard = document.getElementsByClassName("infocard")[0];
        if (undefined !== lastInfoCard) {
          document.body.removeChild(lastInfoCard);
        }

        const infoCard = InfoCardBuilder.newInfoCard({
          roomName: foundRoom.room.name,
          roomLocation: foundRoom.building + " / " + foundRoom.floor,
          restrictedAccess: true
        });
        document.body.appendChild(infoCard);
      }

      // const object = this.scene.getObjectByName(searchedText);
      // if (undefined !== object) {
      //   (<any>(<Mesh>object).material).color = new Color("red");
      // }
    };

    document.getElementsByClassName("searchbtn")[0].addEventListener('click', onSearch);
    document.getElementById("searchbox").addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        onSearch();
      }
    });

  }

  private modelToView(){
    this.campusView.modelToView(this.campus);
  }


  private createControls(): obc.OrbitControls {
    const controls = new obc.OrbitControls(this.camera, this.renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 10;
    controls.maxDistance = 500;

    // controls.enableRotate = false;
    controls.minAzimuthAngle = - Math.PI / 4;
    controls.maxAzimuthAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 4;
    controls.minPolarAngle = - Math.PI / 4;
    return controls
  }

  private campusView: CampusView;

  private load() {
    const dataProvider = new CampusDataProvider();
    this.campus = dataProvider.getCampus();

    const roomMaterial = new MeshBasicMaterial({ color: 0xff0000 });

    this.campusView = new CampusView(this.campus);

    this.scene.add(this.campusView.getMesh());
  }

  private attachRenderer() {
    // add canvas to dom
    document.body.appendChild(this.renderer.domElement);
  }

}

// Start APP !!
const app = new App();
