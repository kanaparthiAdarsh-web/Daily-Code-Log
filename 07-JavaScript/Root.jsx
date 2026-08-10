import { Composition } from "remotion";
import { MirakiLaunch } from "./HelloWorld/index";

export const Root = () => {
  return (
    <Composition
      id="MirakiLaunch"
      component={MirakiLaunch}
      durationInFrames={1200}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

export { Root as RemotionRoot };