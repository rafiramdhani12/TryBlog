import {createClient} from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "r8nk9drp",
  useCdn: false,
});

const builer = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builer.image(source);
}
