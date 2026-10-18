import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { alternaleafVsMamedicaData as data } from "@/lib/alternaleafVsMamedicaData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
