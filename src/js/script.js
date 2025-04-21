jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  //ドロワーメニュー
  // $(function () {
  //   $(".hamburger").click(function () {
  //     $(this).toggleClass("active");

  //     if ($(this).hasClass("active")) {
  //       $(".js-sp-nav").addClass("active");
  //       $(".header__inner").addClass("active");
  //     } else {
  //       $(".js-sp-nav").removeClass("active");
  //       $(".header__inner").removeClass("active");
  //     }
  //   });
  // });
  $(function () {
    // ハンバーガーメニューがクリックされたとき
    $(".hamburger").click(function () {
      $(this).toggleClass("active");

      if ($(this).hasClass("active")) {
        // メニューを表示
        $(".js-sp-nav").addClass("active");
        $(".header__inner").addClass("active");
      } else {
        // メニューを非表示
        $(".js-sp-nav").removeClass("active");
        $(".header__inner").removeClass("active");
      }
    });

    // ナビゲーションのリンクがクリックされたとき
    $(".js-sp-navlink").click(function () {
      // メニューを閉じる処理
      $(".hamburger").removeClass("active");
      $(".js-sp-nav").removeClass("active");
      $(".header__inner").removeClass("active");
    });
  });

  // ヘッダー下に移動したら色変える
  $(document).ready(function () {
    var headerHeight = $(".header").outerHeight(); // ヘッダーの高さを取得
    var triggerPoint = $(".article").offset().top - headerHeight; // ヘッダーの高さ分だけトリガーポイントを調整

    $(window).on("scroll", function () {
      var scrollPosition = $(this).scrollTop(); // 現在のスクロール位置を取得

      if (scrollPosition > triggerPoint) {
        $(".header__inner").addClass("header__inner--scrolled"); // トリガーポイントを超えたらクラスを追加
      } else {
        $(".header__inner").removeClass("header__inner--scrolled"); // トリガーポイント未満のときはクラスを削除
      }
    });
  });
  // アコーディオン
  jQuery(function ($) {
    // アコーディオンのタイトルがクリックされたときにトグル処理
    $(".accordion__titleWrapper").on("click", function () {
      var $content = $(this).next(".accordion__content");

      // 同じセクションをクリックしたときに表示をトグル
      $content.slideToggle();

      // 他のセクションは閉じる
      $(".accordion__content").not($content).slideUp();

      // アイコンのアニメーションをトグル（`active`クラスを切り替え）
      $(this).find(".accordion__plus").toggleClass("active");

      // 他のアイコンを閉じる
      $(".accordion__plus")
        .not($(this).find(".accordion__plus"))
        .removeClass("active");
    });
  });
  // 年を表示
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // 一番上に移動する矢印
  $(document).ready(function () {
    // 特定のセクション（ブロック）の下端の位置を取得
    var targetSectionBottom =
      $("#targetSection").offset().top + $("#targetSection").outerHeight();

    // スクロール時の処理
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop();

      // スクロール位置が特定のブロック（セクション）の下端を超えたら矢印ボタンを表示
      if (scrollTop > targetSectionBottom) {
        $("#backToTop").addClass("show");
      } else {
        $("#backToTop").removeClass("show");
      }
    });

    // 矢印ボタンをクリックしたらページの一番上にスムーズにスクロール
    $("#backToTop").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600); // 600ミリ秒でスムーズにスクロール
    });
  });
  // ナビ遷移
  jQuery(document).ready(function ($) {
    // スムーズスクロール
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault(); // デフォルトのアンカーリンク動作を無効化

      var target = $(this.hash); // リンクのhref属性で指定されたターゲットを取得
      if (target.length) {
        var headerHeight = $("header").outerHeight(); // ヘッダーの高さを取得
        var margin;

        // 特定のIDに対してのみ50pxの余白を設定、それ以外は100px
        if (target.is("#section-Latest-information")) {
          margin = 0; // 特定の要素には50px
        } else {
          margin = 50; // それ以外は100px
        }

        var position = target.offset().top - headerHeight - margin; // ヘッダー分と余白を引いた位置にスクロール
        $("html, body").animate(
          {
            scrollTop: position,
          },
          500, // 500ミリ秒でスクロール
          "swing"
        );
      }
    });
  });
  /* --------------------------------------------
   * 　バナーフェードイン表示
   * -------------------------------------------- */
  $(document).ready(function () {
    const $trigger = $(".js-banner-trigger");
    const $banner = $(".banner");

    // 要素の存在を確認
    if ($trigger.length === 0) {
      console.error("Error: .js-banner-trigger element not found.");
      return;
    }

    if ($banner.length === 0) {
      console.error("Error: .banner element not found.");
      return;
    }

    let isBannerVisible = false; // バナーが表示されているかどうかのフラグ

    // スクロールイベントで監視
    const onScroll = function () {
      const triggerRect = $trigger[0].getBoundingClientRect(); // 画面内での位置を取得
      const windowHeight = $(window).height();

      // 下にスクロールして .js-banner-trigger が画面内に入ったら表示
      if (triggerRect.top <= windowHeight && triggerRect.bottom >= 0) {
        if (!isBannerVisible) {
          $banner.addClass("visible");
          isBannerVisible = true; // バナー表示状態を更新
        }
      }
      // 上にスクロールして .js-banner-trigger より上に来たら非表示
      else if (triggerRect.top > windowHeight) {
        if (isBannerVisible) {
          $banner.removeClass("visible");
          isBannerVisible = false; // バナー非表示状態を更新
        }
      }
    };

    // スクロールイベントの登録
    $(window).on("scroll", onScroll);

    // 初期チェック
    onScroll();
  });
  /* --------------------------------------------
   * 　料金プランのスライド
   * -------------------------------------------- */
  let swiperCampaignTop; // Swiperのインスタンスをグローバルに定義

  function initSwiper() {
    // 画面幅が768px以下である場合
    if (window.innerWidth <= 768 && !swiperCampaignTop) {
      swiperCampaignTop = new Swiper(".js-fee-swiper", {
        // loop: true, // ループ
        // speed: 3000, // 少しゆっくり
        slidesPerView: 1.2, // デフォルトは1枚表示
        spaceBetween: "16px", // スライド間の余白
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      });
    }
  }

  function destroySwiper() {
    // Swiperインスタンスが存在し、画面幅が768pxを超える場合はSwiperを破棄
    if (swiperCampaignTop && window.innerWidth > 768) {
      swiperCampaignTop.destroy(true, true);
      swiperCampaignTop = null; // インスタンスをリセット
    }
  }

  // 初期化とリサイズ時の監視
  $(document).ready(function () {
    initSwiper(); // ページロード時にスライダーを初期化

    // リサイズ時にSwiperの状態を再チェック
    $(window).on("resize", function () {
      destroySwiper();
      initSwiper();
    });
  });
});
