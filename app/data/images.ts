import aboutOffice from "../../public/images/about-office.jpg";
import aboutShopping from "../../public/images/about-shopping.jpg";
import borhanAvatar from "../../public/images/borhan-avatar.jpg";
import bluetoothSpeaker from "../../public/images/bluetooth-speaker.jpg";
import camera from "../../public/images/camera.jpg";
import cameraLens from "../../public/images/camera-lens.jpg";
import categoryLaptop from "../../public/images/category-laptop.jpg";
import earbudsCategory from "../../public/images/earbuds-category.jpg";
import gameController from "../../public/images/game-controller.jpg";
import gamingConsole from "../../public/images/gaming-console.jpg";
import gamingGear from "../../public/images/gaming-gear.jpg";
import galaxyPhone from "../../public/images/galaxy-phone.jpg";
import headphones from "../../public/images/headphones.jpg";
import homeAppliances from "../../public/images/home-appliances.jpg";
import macbookAir from "../../public/images/macbook-air.jpg";
import mechanicalKeyboard from "../../public/images/mechanical-keyboard.jpg";
import mobile from "../../public/images/mobile.jpg";
import monitor from "../../public/images/monitor.jpg";
import perfume from "../../public/images/perfume.jpg";
import smartBand from "../../public/images/smart-band.jpg";
import smartHome from "../../public/images/smart-home.jpg";
import smartwatch from "../../public/images/smartwatch.jpg";
import tablet from "../../public/images/tablet.jpg";
import teamAli from "../../public/images/team-ali.jpg";
import teamMina from "../../public/images/team-mina.jpg";
import teamReza from "../../public/images/team-reza.jpg";
import vacuumCleaner from "../../public/images/vacuum-cleaner.jpg";
import wirelessEarbuds from "../../public/images/wireless-earbuds.jpg";
import wirelessMouse from "../../public/images/wireless-mouse.jpg";

export const imageAssets = {
  aboutOffice,
  aboutShopping,
  borhanAvatar,
  bluetoothSpeaker,
  camera,
  cameraLens,
  categoryLaptop,
  earbudsCategory,
  gameController,
  gamingConsole,
  gamingGear,
  galaxyPhone,
  headphones,
  homeAppliances,
  macbookAir,
  mechanicalKeyboard,
  mobile,
  monitor,
  perfume,
  smartBand,
  smartHome,
  smartwatch,
  tablet,
  teamAli,
  teamMina,
  teamReza,
  vacuumCleaner,
  wirelessEarbuds,
  wirelessMouse,
} as const;

export type ProductImageKey = keyof typeof imageAssets;
