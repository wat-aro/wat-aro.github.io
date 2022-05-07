import type { NextPage } from 'next';
import Head from 'next/head';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>wat-aro.dev | About</title>
        <meta name="description" content="wat-aro のサイト" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-4">
        <h1>wat-aro</h1>

        <p>SNS</p>
        <ul>
          <li>
            <a href="https://twitter.com/wat_aro">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/wat-aro">GitHub</a>
          </li>
        </ul>

        <p>Blog</p>
        <ul>
          <li>
            <a href="https://wat-aro.hatenablog.com/">(wat-aro)</a>
          </li>
        </ul>

        <p>Slides</p>
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th></th>
              <th>日時</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="https://wat-aro.dev/recommendation-of-hook">
                  React Hooksのすすめ
                </a>
              </td>
              <td>えにしテック永和技術交流会</td>
              <td>2020/10/23</td>
            </tr>
            <tr>
              <td>
                <a href="https://wat-aro.dev/feeling-to-type-ruby">
                  Rubyに型をつけるお気持ち
                </a>
              </td>
              <td>ESM Real Rounge#4</td>
              <td>2020/01/15</td>
            </tr>
            <tr>
              <td>
                <a href="https://wat-aro.dev/getting-started-with-elm">
                  Elmことはじめ
                </a>
              </td>
              <td>ESM Real Rounge#2</td>
              <td>2019/10/28</td>
            </tr>
            <tr>
              <td>
                <a href="https://wat-aro.dev/pipeline-operator/">
                  パイプライン演算子
                </a>
              </td>
              <td>2019/06 みんなの時間</td>
              <td>2019/06/20</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default About;
