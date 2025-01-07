import useScreenControl from "@/app/_store/live/useScreenControl";
import { useEffect } from "react";

/**
 * 전체 화면 핸들러
 */

const useFullscreenHandler = () => {
    const isFullscreen = useScreenControl(state => state.isFullscreen);
    const offFullScreen = useScreenControl(state => state.offFullScreen);
    
  
    useEffect(() => {
      const clearFullScreenDetect = () => {
        if (!document.fullscreenElement) offFullScreen();
      };
  
      document.addEventListener("fullscreenchange", clearFullScreenDetect);
      return () => {
        document.removeEventListener("fullscreenchange", clearFullScreenDetect);
      };
    }, [offFullScreen]);
  
    useEffect(() => {
      const handleFullscreenToggle = async () => {
        try {
          if (!isFullscreen && document.fullscreenElement) {
            await document.exitFullscreen();
          } else if (isFullscreen) {
            await document.body.requestFullscreen();
          }
        } catch (err) {
          console.error("Error fullscreen:", err);
        }
      };
      handleFullscreenToggle();
    }, [isFullscreen]);
  }

  export default useFullscreenHandler;