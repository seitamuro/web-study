# はじめに

~~このフォルダは｢React.js&Next.js超入門｣をFunctional Componentで書き直したものです｡~~

第2版の4章でHookが紹介されていました｡

# コンテキスト

functional componentではuseContextを使う｡コンテキストの生成はReact.createContext｡これを使うことでファイルを超えて共通の値を使用することができる｡主にテーマを全体で共有するために使われる｡Providerを使うことでProvider内のコンテキストはProviderで渡された値になる｡