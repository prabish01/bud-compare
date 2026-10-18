import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { eligibilityCheckerData as data } from "@/lib/eligibilityCheckerData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
