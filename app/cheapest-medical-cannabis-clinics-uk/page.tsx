import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { cheapestClinicsData as data } from "@/lib/cheapestClinicsData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
