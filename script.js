document.addEventListener('DOMContentLoaded', () => {
    
    // Daftar emoji romantis
    const loveEmojis = ['❤️', '💖', '💕', '💗', '🌹', '🥀', '🌸', '🌺', '💞'];

    // Deteksi preferensi user (penting untuk aksesibilitas & performa di HP)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function createFallingItem() {
        // Skip jika user minta reduced motion
        if (prefersReducedMotion) return;

        const item = document.createElement('div');
        item.classList.add('falling');
        
        item.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
        
        item.style.left = Math.random() * 100 + 'vw';
        
        // Ukuran lebih kecil di mobile supaya tidak berat
        const size = (Math.random() * 1.8 + 1.2).toFixed(1); // 1.2em – 3em (lebih kecil dari sebelumnya)
        item.style.fontSize = size + 'em';
        
        // Durasi lebih panjang & variatif di mobile (kurangi jumlah animasi aktif)
        const duration = Math.random() * 12 + 10; // 10–22 detik → lebih lambat, lebih elegan & hemat CPU
        item.style.animation = `fallRealistic ${duration}s linear forwards`;
        
        item.style.animationDelay = Math.random() * 6 + 's';
        
        const startRotate = Math.random() * 80 - 40; // rotasi lebih halus
        item.style.transform = `rotateZ(${startRotate}deg)`;
        
        // Tambah will-change untuk GPU acceleration (bantu performa mobile)
        item.style.willChange = 'transform, opacity';
        
        document.body.appendChild(item);
        
        setTimeout(() => item.remove(), duration * 1000 + 4000);
    }

    // Interval lebih lambat di mobile → deteksi lebar layar
    let intervalTime = 350; // default desktop
    if (window.innerWidth <= 768) {
        intervalTime = 600; // HP: muncul 1 item setiap ~0.6 detik → kurangi lag
    }

    let fallingInterval;

    function startFalling() {
        if (prefersReducedMotion) return; // respect user setting

        fallingInterval = setInterval(createFallingItem, intervalTime);
    }

    // Jalankan hanya setelah user interaksi pertama (klik heart atau tombol)
    // Ini hindari auto-play heavy animation di background (browser mobile sering throttle)
    function startOnInteraction() {
        startFalling();
        // Bisa tambah event listener lain jika perlu
    }

    // Mulai setelah interaksi (klik heart di index)
    const mainLove = document.getElementById('mainLove') || document.getElementById('heart');
    if (mainLove) {
        mainLove.addEventListener('click', () => {
            window.location.href = 'photos.html';
            startOnInteraction(); // mulai di halaman selanjutnya jika perlu
        });
    }

    // Untuk halaman lain: mulai falling setelah load (tapi dengan interval lambat)
    startFalling(); // mulai langsung, tapi interval sudah disesuaikan

    // Navigasi antar halaman (tetap sama)
    const nextToMusic = document.getElementById('next-to-music');
    if (nextToMusic) {
        nextToMusic.addEventListener('click', () => {
            window.location.href = 'music.html';
        });
    }

    const nextToLetter = document.getElementById('next-to-letter');
    if (nextToLetter) {
        nextToLetter.addEventListener('click', () => {
            window.location.href = 'letter.html';
        });
    }

    // Flip card tetap (klik untuk balik)
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Optional: pause falling saat tab tidak aktif (hemat baterai di HP)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(fallingInterval);
        } else {
            startFalling();
        }
    });
});