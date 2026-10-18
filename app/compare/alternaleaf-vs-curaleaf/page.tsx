import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { alternaleafVsCuraleafData as data } from "@/lib/alternaleafVsCuraleafData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
