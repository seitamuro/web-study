# データベースの種類

一般にデータベースというのはデータを管理する構造のことをいう｡MySQLやPostgreSQLなどはデータベースではなく､DBMSである｡

1. 階層型データベース

データをヒエラルキー構造で管理するデータベース｡最も古い｡今でも使われることがある｡

2. リレーショナル・データベース

二次元表の形式でデータを管理するデータベース｡主流｡

3. オブジェクト指向データベース

オブジェクトを利用してデータを管理するデータベース｡かなりマイナー｡

4. XMLデータベース

XMLを利用してデータを管理するデータベース｡かなりマイナー｡

5. NoSQLデータベース

SQLを使わないデータベース｡リレーショナル・データベースの一部の機能を捨てることで処理速度を向上させている｡
大量データを高速に処理する必要のあるWebサービスでよく使われる｡

# DBMSとは

データベースの機能を提供するソフトウェアのことを｢DBMS(Data Base Management System)｣という｡
代表的なのはOracle､SQL Server､DB2､MySQL､PostgreSQL｡

# リレーショナル･データベースとは

現在主流なデータベース｡

## リレーショナルとは

リレーショナル(Relational)は｢relation(関係)｣から波形した単語｡Relationalは数学で二次元表を表すときに使われる単語｡
和訳では｢関係データベース｣｢関係型データベース｣と呼ばれる｡

## データ構造

リレーショナルデータベースはテーブル､行､列で構成されている｡

- テーブル

行と列で構成される｡日本語に訳すと｢表｣｡管理したいデータごとに作成する｡テーブル設計はパフォーマンスに大きく影響するため､
データベース設計において最も注意をしなければならない｡

- 列



- 行