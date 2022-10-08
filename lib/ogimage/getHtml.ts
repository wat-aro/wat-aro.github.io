import { profileSource } from './profileSource';

type Params = { title: string };
type GetHtml = (params: Params) => string;

export const getHtml: GetHtml = ({ title }) => `
<html>
<head>
  <style>
   @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
   @font-face {
       font-family: 'NotoColorEmoji';
       src: url('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf') format('truetype');
  }
   body {
       font-family: 'Noto Sans JP', 'NotoColorEmoji';
   }
   * {
       box-sizing: border-box;
   }
   .main {
       height: 100%;
       padding: 0 0 20px 0;
   }
   .title-container {
       height: 90%;
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .title {
       font-size: 100px;
       margin: 0;
       text-align: center;
       word-break: break-word;
   }
   .footer {
       display: flex;
       justify-content: flex-end;
       font-size: 40px;
       padding: 0 20px;
   }
   .blog {
       display: flex;
       gap: 20px;
   }
   .profile {
       height: 60;
       border-radius: 100%;
   }
   .name {
       display: flex;
       align-items: center;
   }
  </style>
</head>
<body>
  <div class="main">
    <div class="title-container">
      <h1 class="title">${title}</h1>
    </div>
    <div class="footer">
      <div class="blog">
        <img class="profile" src="${profileSource}" />
        <div class="name">(wat-aro)</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
