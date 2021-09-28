export class CacheUtilities {
  public static SemverGreaterThan(
    latestVersion: string,
    currentVersion: string
  ): boolean {
    if (
      typeof latestVersion === "string" &&
      typeof currentVersion === "string"
    ) {
      const latestV = latestVersion.split(/\./g);
      const currentV = currentVersion.split(/\./g);
      while (latestV.length || currentV.length) {
        const a = Number(latestV.shift());
        const b = Number(currentV.shift());
        if (a === b) continue;
        return a > b || isNaN(b);
      }
    } else return false;
    return false;
  }

  public static async UnregisterServiceWorker(): Promise<void> {
    if (navigator.serviceWorker.controller != null) {
      const registrations: readonly ServiceWorkerRegistration[] =
        await navigator.serviceWorker.getRegistrations();
      registrations.forEach(registration => registration.unregister());
    }
  }

  public static async ClearCaches(): Promise<void> {
    if ("caches" in window) {
      const keys: string[] = await caches.keys();
      keys.forEach(async name => await caches.delete(name));
    }
  }
  public static async ReloadPage(): Promise<void> {
    window.location.reload();
  }

  public static async FetchMetaFile(): Promise<string | null> {
    try {
      const response = await fetch(`/meta.json?${new Date().getTime()}`, {
        cache: "no-cache"
      });
      const meta = await response.json();
      return meta.version;
    } catch (error) {
      console.error(`fetch error: ${error}`);
      return null;
    }
  }
}
