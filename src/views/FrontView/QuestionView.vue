<template>
  <div class="container py-5">
    <h4 class="mb-5 text-tertiary">常見問題</h4>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            預約訂餐時間
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body py-5 text-start">
            指定送達時間至少2個小時前至7天內訂餐(外送時間:am9:00~pm9:30)
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            出餐會通知嗎?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body py-5 text-start">
            您好，如果您是從官網下訂的話，餐點送出會收到email通知
            （如沒收到可能會在垃圾信件匣或是email不正確）
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            外送狀態與訂單狀態的解釋
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body py-5 text-start">
            『外送狀態』會有以下幾種狀態，煩請各位買家留意 備貨中<br />
            如訂單狀態為「已確認」，訂單狀態為「準備中」，代表餐廳已在烹煮，只是還沒將訂單出貨，還請大家耐心等候！<br />
            外送中 餐廳已經出貨了，並已發「出貨信」通知<br />
            已送出,再麻煩留意「到貨簡訊」通知<br />
            <br />
            『訂單狀態』會有以下幾種狀態，煩請各位買家留意 已確認<br />
            餐點已進入生產流程，訂單「不能取消」也「不能更改」，只能更改收件資訊已完成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
