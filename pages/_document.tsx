import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
   var script = document.createElement('script');
   script.async = true; script.type = 'text/javascript';
   var target = 'https://www.clickcease.com/monitor/stat.js';
   script.src = target;var elem = document.head;elem.appendChild(script);
   `,
            }}
            type="text/javascript"
          ></script>
          <noscript>
            <a href="https://www.clickcease.com" rel="nofollow">
              <img
                src="https://monitor.clickcease.com/stats/stats.aspx"
                alt="ClickCease"
              />
            </a>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
