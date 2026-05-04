import { Button, 否tification } from "@mantine/core";
import { useCallback } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export function Install更新否tification() {
  const {
    offlineReady: [_, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const on关闭 = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const on更新 = useCallback(async () => {
    updateServiceWorker(true);
  }, []);

  return needRefresh ? (
    <否tification title="更新 available!" on关闭={on关闭}>
      Click{" "}
      <Button compact onClick={on更新}>
        更新 now
      </Button>{" "}
      to get the latest version.
    </否tification>
  ) : null;
}
