import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import { JSX } from "react";
export default function Document(props:any) {
  return (
    <Html lang="en">
      <Head>
      
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          type="text/javascript"
          src="chart/charting_library.js"
          defer
        ></script>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
Document.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
