const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".vue", ".js"], // vue, js 확장자 생략 가능
    alias: {
      "~": path.resolve(__dirname, "src"),
      // 경로 별칭. 주변에서 찾는 상대 경로가 아닌 루트 경로에서 src 폴더를 찾게 됨.
      // 절대적인 위치부터 찾게 된다. 통상적으로 ~나 @ 사용
    },
  },
  // webpack이 어떤 파일로 진입해서 파일을 해석하고
  // 해석이 완료되면 어디에 결과물을 반환해줄지 설정하는 부분
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true, // dist에 쓸모없는 파일 제거해줌.
    // filename: 'hello.js' // 생략하면 entry 파일과 이름 동일
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // .vue로 끝나는 파일들 찾는 정규표현식
        use: "vue-loader",
      },
      {
        test: /\.s?css$/, // scss도 되고, css도 되는 정규표현식
        use: ["vue-style-loader", "css-loader", "sass-loader"],
        // 순서 중요! 나중에 작성된 것부터 해석하기 때문에 css-loader가 먼저 해석되어야 함.
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: "./src/index.html",
      // path.resolve 사용해야 하는데 내장되어 있어서 생략 가능
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          // to: 'dist'
          // // 기본적으로 output 경로를 참고. 따라서 따로 지정하지 않아도 dist
        },
      ],
    }),
  ],
  // devServer: {
  //   port: 8080, // 기본으로 8080으로 설정되어 있음.
  // },
};
