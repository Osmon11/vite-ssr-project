import internal from "stream";

export type Component = any;
// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  Page: Component;
  pageProps: Record<string, unknown>;
  initialStoreState: any;
  stream: internal.Readable;
  redirectTo: string;
  exports: {
    documentProps?: {
      title: string;
      description: string;
    };
  };
};
