declare module "*.vue" {
  const Component: any;
  export default Component;
}
declare module "*.svg" {
  const imageUrl: string;
  export default imageUrl;
}
declare module "vuetify/lib/components/index.mjs";
declare module "vuetify/lib/directives/index.mjs";
