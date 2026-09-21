# 🔐 Udemy Course Authentication & Sync Reference

Dokumen ini menyimpan konfigurasi autentikasi, token sesi, cookie aktif, serta perintah cURL resmi untuk menyinkronkan kurikulum kursus Udemy **"IELTS Band 7+ Complete Prep Course"** (Instruktur: Keino Campbell, Esq.) ke dalam repositori lokal.

---

## 📌 Metadata Akun & Kursus

| Parameter | Nilai | Keterangan |
| :--- | :--- | :--- |
| **Nama Pengguna** | `Aditya Catur` | Akun pembeli resmi kursus |
| **Email Pengguna** | `adityacaturputra25@gmail.com` | Google One-Tap Auth |
| **User ID Udemy** | `106900578` | ID akun internal Udemy |
| **Course ID** | `684272` | ID kursus *IELTS Band 7+ Complete Prep Course* |
| **Course Slug** | `ielts-band-7-preparation-course` | Path URL resmi kursus |
| **Last Accessed Lecture** | `55461173` | *"IELTS Preparation Course Books Used to Teach This Course"* |

---

## 🚀 Perintah cURL Lengkap (Sesi Aktif)

Gunakan perintah cURL berikut (atau salin ke terminal / API client seperti Postman atau Insomnia) untuk mengakses materi kursus:

```bash
curl --url 'https://www.udemy.com/course/ielts-band-7-preparation-course/learn/lecture/55461173?start=1' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: id,en-US;q=0.9,en;q=0.8,ja;q=0.7' \
  -H 'cache-control: no-cache' \
  -b '__udmy_2_v57r=94c6f1f3f9164f73979cf1008681dba0; ud_firstvisit=2026-09-04T06:42:15.883810+00:00:1x2Ncu:3NeaPju2yfohlkWRBZLpP4-owmY_RfXoHH0kl9PyoLo; EXP_7269f546a4_identity=JTIyJTdCJTVDJTIyd2ViX2V4cF9pZF92MiU1QyUyMiUzQSU1QyUyMjUwYzAwOTQzLWM5ZjUtNDA3YS1hYzhmLTc1OGRkMzcwNjQ2OSU1QyUyMiUyQyU1QyUyMmZpcnN0X3NlZW4lNUMlMjIlM0ElNUMlMjIxNzg0MjExNTAzLjk3OSU1QyUyMiU3RCUyMg==; _gcl_au=1.1.1244785625.1788504152; _twpid=tw.1788504151791.216609977583297486; _yjsu_yjad=1788504152.a2dfbf1c-6a21-4667-abcb-2ec1b28b1f34; IR_gbd=udemy.com; brwsr=cee8f6fd-a82b-11f1-8bdd-f7907bb99b8d; _fbp=fb.1.1788504154477.83800500851833739; FPAU=1.1.1244785625.1788504152; g_state={"i_l":0,"i_ll":1788504151533,"i_e":{"enable_itp_optimization":24},"i_et":1788504151533}; ud_credit_last_seen=None; csrftoken=vyvqeM5a13BZzj98ZN9o0sbDmcK239Yp; ud_locale=id_ID; client_id=bd2565cb7b0c313f5e9bae44961e8db2; access_token="z+hadBykZvzlNCUimhMZcym41u/WiF9KpmcSzbz3Vqo:MV76np9/7z6IhEgfCoVvnaGhHMyjkxFKiKwhWvCkPVI"; ud_last_auth_information="{\"backend\": \"google-one-tap\"\054 \"suggested_user_email\": \"adityacaturputra25@gmail.com\"\054 \"suggested_user_name\": \"Aditya Catur\"\054 \"suggested_user_avatar\": \"https://img-c.udemycdn.com/user/50x50/anonymous_3.png\"\054 \"suggested_user_phone_number\": null}:1x2NdT:1oGlUfVn6I3FfyfyQTwwM8GQQKyhJVoRS-PLnpcB6fA"; dj_session_id=2v8pdbejllr45fkpi1bwxhfqipsgkl1u; ud_user_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA2OTAwNTc4LCJlbWFpbCI6ImFkaXR5YWNhdHVycHV0cmEyNUBnbWFpbC5jb20iLCJpc19zdXBlcnVzZXIiOmZhbHNlLCJncm91cF9pZHMiOltdfQ.xyEQ87Lls4rQguUxc0r2O-FcE_Zou6bwawXQ15ZTHlA; ud_cart_bs=21d0ab2ae94e40019cf47d44b533b6a0; __ssid=af48aa20-5348-4455-969c-86f4d22cf65c; muxData==undefined&mux_viewer_id=6c9097e7-97c1-405c-ba76-47576b29581d&msn=0.05204127085272481&sid=7f3a8491-efa7-41b9-93df-0b576b295a55&sst=1788504267349&sex=1788505822151; dashboard_tab_684272=overview; cte-color-scheme=light; _ga_DFDMXRYPXY=GS2.1.s1788505107$o1$g0$t1788505115$j52$l0$h0; ud_country_code=ID; ab.storage.sessionId.5cefca91-d218-4b04-8bdd-c8876ec1908d=%7B%22g%22%3A%225e06cff5-2de9-4c2e-d174-8d89ac327e5b%22%2C%22e%22%3A1790006979604%2C%22c%22%3A1790005179604%2C%22l%22%3A1790005179604%7D; ab.storage.deviceId.5cefca91-d218-4b04-8bdd-c8876ec1908d=%7B%22g%22%3A%2236bf3306-bb1e-c293-e8ac-adaaf3888587%22%2C%22c%22%3A1784211503850%2C%22l%22%3A1790005179604%7D; ab.storage.userId.5cefca91-d218-4b04-8bdd-c8876ec1908d=%7B%22g%22%3A%22106900578%22%2C%22c%22%3A1788504174684%2C%22l%22%3A1790005179605%7D; cf_clearance=XZKWWUIOxGp.EGIo4xRjXud0HUzb9j9qotDCdgn9mic-1790005179-1.2.1.1-Pws0BnTl2gZ6Z1yy9WxHNjfs95FQCeXpCEWCTbHEBCJBKs36hZIJk.fVsnQD2SrX.4TWttnhVpJb9qAPvNuwT6UjZn49Yp5Effuulz.99co84llJxQCx4JEMLLWoPdDYMb2FYXWnKpKkAxlp.2DHLv.8zE3HFs7m1pWCKm.78TpOJ5rWkw8ILiFdGDeltOZ529jMzckrRB507lk_q5UcdmeOR7AiXfr38zAWPTogz.TwNtpKGnuglJj6zAy.KOiWPwVhQ_DjzfAWb7Ut5BHYaAwE4FlYIOwyfdBeuDzKBUZhNFUITZ4o8LjQ0licVU4p7GmBalYnwhwtQn_cusil8X0ZlVMdfUsysWzzDwiLPM8; __cf_bm=plCb2QFAO7XH014REdQNDSkWnjHCeyQwk95ZepTfbY0-1790005179.7157848-1.0.1.1-_SVTQq4hU8JNvamqOTxAakaNCHq9tZslCoi6_cdKtg7qwmtSf1NiZfVfZP092G6j3uTXi.kEVEtNE.4O3b3s93ig8pd3bYBOm1mONe6RqWYvTBLn3jrwIuRA78LnAovy; ud_cache_brand=IDid_ID; ud_cache_marketplace_country=ID; ud_cache_price_country=ID; ud_cache_release=ea40685fbc5d2825d151; ud_cache_user=106900578; ud_cache_version=1; ud_cache_language=id; ud_cache_device=None; ud_cache_logged_in=1; ud_cache_campaign_code=26BBPAA2MX; ud_credit_unseen=0; _gid=GA1.2.196112005.1790005202; _gat=1; blisspoint_fpc=d4a4c840-9d5c-48c6-9504-2b63cdcf88f1; irtps=1; ud_cmp_ctp_vc=2; ud_cmp_ctp_vclts=1790005208; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Sep+21+2026+22%3A40%3A08+GMT%2B0700+(Western+Indonesia+Time)&version=202509.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=d8997cd9-8754-44c2-ae72-0a4ffcb2dc60&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0003%3A1%2CC0004%3A1%2CC0005%3A1%2CC0002%3A1%2CC0001%3A1%2CM0001%3A1&AwaitingReconsent=false; IR_PI=cee8f6fd-a82b-11f1-8bdd-f7907bb99b8d%7C1790091612900; IR_39854=1790005212901%7C0%7C1790005212901%7C%7C; _ga_7YMFEFLR6Q=GS2.1.s1790005204$o4$g1$t1790005212$j52$l0$h0; _ga=GA1.2.1304956013.1788504155; _dc_gtm_UA-12366301-1=1; _uetsid=b75c7510b5d211f1a3ba3377e03cbb39|k6sa4z|2|g9n|0|2455; _uetvid=8898b710233911f195b2f5d6af6cb8ce|nwqqkz|1790005213697|2|1|bat.bing.com/p/insights/c/l; AMP_7269f546a4=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjI1OGIxNjI5NC01NmQ1LTRiZTEtYmQ1NS1lYmExMDViMzYxYjMlMjIlMkMlMjJ1c2VySWQlMjIlM0ExMDY5MDA1NzglMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzkwMDA1MTgyNDU5JTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTc5MDAwNTIzMTA1MSUyQyUyMmxhc3RFdmVudElkJTIyJTNBNTklMkMlMjJwYWdlQ291bnRlciUyMiUzQTMlN0Q=; evi="3@iRB4bZkov5Fz6b9E3JkuzOer6qsWq2oluRSn_oN767QiDjcR7xmz9_3k"; ud_rule_vars="eJxtjUEOgyAUBa9i2Laa_xFQOIsJQQRL2pQU0I3x7rVpm3TR7cubmY0Uk2ZX3KTXkEOJSUlmhUffeomC-a6VnbQeAXrR4zQaUDbGa3BEVWQbiA8plzerJ1PccOwDoUBFDbIGVoFQjCrkTf9S8ROAAhjI-XjdzIGWuNiLLsl4H6zOcUnW6dWkYMbbxxbTbO7B_kDJPRaX_xUpVsgVA9ViIzhFpN_iTvYnm-RHvg==:1x8g87:pnfAKVOT4v0UbDdOq2dJwncyCTFTRFHKU7xcapZbaGg"; _twsid=1790005204672-829250036.1.1790005238868; eventing_session_id=NWQ1MmQ2M2UtNjBlYS00Zm-1790007038875; _dd_s=rum=0&expire=1790006160626' \
  -H 'pragma: no-cache' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Not=A?Brand";v="99", "Google Chrome";v="151", "Chromium";v="151"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36'
```

---

## 🔑 Endpoint Penting Udemy API 2.0

### 1. Kurikulum Kursus (*Subscriber Curriculum Items*)
Endpoint untuk menarik seluruh bab, kuliah, kuis, dan latihan:
```http
GET https://www.udemy.com/api-2.0/courses/684272/subscriber-curriculum-items/?page_size=200&page=1
Authorization: Bearer <access_token>
```
*Parameter Query:*
- `page_size`: Maksimal 200 item per halaman.
- `page`: Nomor halaman (kursus ini memiliki total 613 item, membutuhkan 4 halaman).
- `curriculum_types`: `chapter,lecture,practice,quiz,role-play`

### 2. Detail Materi Kuliah (*Lecture Asset & Stream*)
Endpoint untuk menarik aset, transkrip, durasi video, dan slide presentasi:
```http
GET https://www.udemy.com/api-2.0/users/me/subscribed-courses/684272/lectures/{lecture_id}/?fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,media_sources,captions,slides,slide_urls
Authorization: Bearer <access_token>
```

---

## 🔄 Prosedur Refresh Cookie/Token Jika Kedaluwarsa

Token sesi Udemy dan token Cloudflare (`cf_clearance`) memiliki masa aktif terbatas. Jika permintaan API menghasilkan status `401 Unauthorized` atau `403 Forbidden` (Cloudflare Challenge):

1. **Buka Google Chrome** di laptop Anda dan kunjungi halaman kursus:
   `https://www.udemy.com/course/ielts-band-7-preparation-course/learn/lecture/`
2. **Buka DevTools**:
   - Tekan `F12` atau `Cmd + Option + I`.
   - Pilih tab **Network**.
3. **Filter Permintaan**:
   - Ketik `subscriber-curriculum-items` atau `lectures` pada kotak filter input.
4. **Copy as cURL**:
   - Klik kanan pada permintaan yang muncul di tabel jaringan.
   - Pilih **Copy** ➔ **Copy as cURL**.
5. **Perbarui Dokumen Ini**:
   - Timpa string cURL pada bagian *"Perintah cURL Lengkap"* dengan nilai yang baru disalin.
