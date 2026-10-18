import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { compareClinicsData as data } from "@/lib/compareClinicsData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} wide />;
}
