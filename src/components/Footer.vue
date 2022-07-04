<template>
  <footer class="flex_box_center">
    <div class="footer_content flex_box" style="align-items: start; gap: 30px">
      <div>
        <p class="title" style="margin-bottom: 24px">GET IN TOUCH</p>
        <p class="body1" style="color: #767676">
          First International Consulting Sdn Bhd<br />
          No. 16-1-1A, First Floor, Jalan Medan PB 2A Section 9, Pusat Bandar
          Bangi<br />
          43650 Bandar Baru Bangi<br />
          Selangor Darul Ehsan, Malaysia
        </p>
      </div>
      <div>
        <p class="title" style="margin-bottom: 24px">CONTACTS</p>
        <p class="body1" style="color: #767676">
          Tel : +6 03 8925 8454<br />
          Fax : +6 03 8926 8454<br />
          Email : khudus@fic-isfin.my<br />
          Contact person : Abdul Khudus Mohd Naaim
        </p>
        <div class="flex_box" style="gap: 20px; margin-top: 20px">
          <img
            class="social_media_icon"
            src="@/assets/icons8-gmail.svg"
            alt="gmail icon"
          />
          <a href="https://t.me/akylmanchik" target="_blank">
            <img
              class="social_media_icon"
              src="@/assets/icons8-telegram-app.svg"
              alt="gmail icon"
          /></a>
          <a
            href="https://api.whatsapp.com/send?phone=996701110483&text=&source=&data=&app_absent="
            target="_blank"
          >
            <img
              class="social_media_icon"
              src="@/assets/icons8-whatsapp.svg"
              alt="gmail icon"
          /></a>
          <a
            href="https://api.whatsapp.com/send?phone=996701110483&text=&source=&data=&app_absent="
            target="_blank"
          >
            <img
              class="social_media_icon"
              src="@/assets/icons8-skype.svg"
              alt="gmail icon"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    padding: 95px 0px;
    background-color: #252525;
    border-bottom: 30px solid #1c1c1c;
  }
  .footer_content {
    width: 100%;
    max-width: 1140px;
  }
  .title {
    font-family: "Raleway", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #c5c5c5;
    text-transform: uppercase;
  }
  .social_media_icon {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
