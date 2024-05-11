import { compressToBase64, decompressFromBase64 } from "lz-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function compressStateObjectForUrl(state: any) {
  if (!state || Object.keys(state).length === 0) {
    return;
  }
  const string = JSON.stringify(state);
  const compressed = compressToBase64(string);
  return compressed;
}

export function decompressStateObjectForUrl(state: string) {
  const decompressed = decompressFromBase64(state);
  return JSON.parse(decompressed);
}

export function useStateInUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  );

  function getStateFromUrlParam(param: string) {
    const selectedViaUrl = searchParams.get(param);
    if (selectedViaUrl) {
      return decompressStateObjectForUrl(selectedViaUrl);
    }
  }

  function syncStateToUrl(state: any) {
    const compressed = compressStateObjectForUrl(state);
    let urlString = pathname;
    if (compressed && compressed.length) {
      urlString = pathname + '?' + createQueryString('t', compressed);
    }
    router.push(urlString, { scroll: false });
  }

  return {
    getStateFromUrlParam,
    syncStateToUrl
  };

}