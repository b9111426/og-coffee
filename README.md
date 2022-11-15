# OG-Coffee訂餐網站

 <img width="300" src="https://i.imgur.com/LlZtJzM.png"/>

這是一個虛擬的咖啡品牌「橘子咖啡」，以家中貓咪命字名。網站分為前台和後台系統，前台供使用者使用，後台供管理者使用。
使用者可在前台完成(加入購物車、刪除訂單、訂購等等)等體驗； 管理者可在後台商品、訂單、優惠卷、文章等頁面做新增、刪除、編輯等權限編輯。

👉 https://b9111426.github.io/og-coffee/#/

👉 登入後台帳密: 帳號b9111426@gmail.com、密碼123456

- 前台
  - 商品分業: 商品分類、商品收尋、價格排序、商品完售樣式、商品加減填按鈕元件、動態路由切換商品內頁
  - 優惠卷: Localstorage存取優惠卷、優惠卷逾期樣式變換
  - 文章專欄頁面: 動態路由切換商品內頁
  - 購物車: 外送、內用區分，預約外送時間、流程進度條樣式變換、表單submit驗證
  - 登入後台 :密碼隱藏顯示、Localstorage存取帳密、cookie存取
  - 聯絡我們: modal開關、表單submit驗證
- 後台: 商品總數計算
  - 商品 :圖片上傳
  - 訂單
  - 優惠卷
  - 文章
 ---
# 技術使用 
<a href="">
    <img height="50" src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"/>
</a>
<a href="">
    <img height="50" src="https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg"/>
</a>
<a href="">
    <img height="50" src="https://www.vectorlogo.zone/logos/sass-lang/sass-lang-icon.svg"/>
</a>
<a href="">
    <img height="50" src="https://upload.vectorlogo.zone/logos/getbootstrap/images/987f8f6c-263a-47b1-a85d-853cfca215d9.svg"/>
</a>
<a href="">
    <img height="50" src="https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg"/>
</a>
<a href="">
    <img height="50" src="https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg"/>
</a>

Html、CSS、Bootstrap、Scss、javascript、Vue3、Vuex、Vue Router、Vue Cli
- 此專案使用vuex、搭配props、emit做資料傳遞
- 運用directive做數字千分位轉換、日期轉換、圖片的 lazyload 效果

## 套件使用
- vue3-loading-overlay
- CKEditor

    CKEditor-toolbar套用
    
    <img width="500" src="https://i.imgur.com/LFOOpju.png"/>
- vee-validation 

    <img width="500" src="https://i.imgur.com/4v2I3ZB.png"/>
- lodash函式庫的debounce事件延遲(防抖)
- Lottie動畫套用
