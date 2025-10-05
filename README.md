# e-Bebek Ürün Carousel Case

Bu proje, e-bebek.com ana sayfasına özel olarak geliştirilen, kullanıcıya öneri sunan bir ürün carousel bileşenidir. Carousel içerisinde ürünler favorilenebilir, fiyat indirimi gösterilir ve ürün detayına yönlendirme yapılabilir.

## Nasıl Kullanılır?

1. Script yalnızca `e-bebek.com` ana sayfasında (`/`) çalışacak şekilde yapılandırılmıştır.
2. Sayfada `.hero.banner` öğesinin hemen altına ürün carousel’i ekler.
3. Ürün verileri dış bir JSON endpoint’ten çekilir ve LocalStorage’a kaydedilir.

## Teknik Özellikler

- API'den ürün verisi çekimi (`fetch`)
- Ürün verisinin `localStorage` ile cache'lenmesi
- Favori ürün yönetimi (localStorage ile)
- Responsive tasarım
- Scrollable carousel yapısı
- Özel CSS stilleri ve hover efektleri
- % indirim hesaplaması
- SVG ile kalp ikonları (aktif ve pasif)

