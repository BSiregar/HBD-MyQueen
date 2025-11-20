(function() {
    // --- KONFIGURASI ---
    const birthDateString = '2003-11-21T00:00:00';
    const nextPageUrl = 'cause.html'; // Halaman tujuan

    const birth = new Date(birthDateString);
    const today = new Date();
    
    const ageEl = document.getElementById('age');
    const noteEl = document.getElementById('note');
    const giftBtn = document.getElementById('giftBtn');
    const giftBox = document.getElementById('gift');
    const confettiBtn = document.getElementById('confettiBtn');
    const proceedBtn = document.getElementById('proceedBtn');
    
    // Ambil elemen Audio
    const audio = document.getElementById('musik-ku');

    // --- FUNGSI UMUR ---
    function calculateAge(birthDate, currentDate) {
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // --- LOGIKA TAMPILAN UMUR ---
    if (ageEl) {
        const realAge = calculateAge(birth, today);
        ageEl.textContent = realAge;

        if (today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate()) {
            if (noteEl) noteEl.textContent = "Happy Birthday!! Hari ini harinya! 🎂";
        } else if (today.getMonth() === birth.getMonth() && today.getDate() + 1 === birth.getDate()) {
            if (noteEl) noteEl.textContent = "(Besok hari H-nya! Siap-siap ya! 🥳)";
        }
    }

    // --- FUNGSI CONFETTI ---
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6fa3', '#ff8bb3', '#ffd6e6']
            });
        }
    }

    // --- EVENT LISTENERS ---

    if (giftBtn && giftBox) {
        giftBtn.addEventListener('click', () => {
            const isHidden = giftBox.classList.contains('hidden');
            if (isHidden) {
                giftBox.classList.remove('hidden');
                giftBtn.textContent = "Tutup Hadiah 🎁";
                triggerConfetti();
            } else {
                giftBox.classList.add('hidden');
                giftBtn.textContent = "Buka Hadiah 🎁";
            }
        });
    }

    if (confettiBtn) {
        confettiBtn.addEventListener('click', () => {
            triggerConfetti();
        });
    }

    // --- LOGIKA PINDAH HALAMAN & MUSIK ---
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            proceedBtn.textContent = "Loading Surprise... 🚀";
            proceedBtn.disabled = true;
            triggerConfetti();

            // 1. SIMPAN WAKTU LAGU TERAKHIR
            if (audio) {
                localStorage.setItem('musicTime', audio.currentTime);
                // Opsional: Fade out audio sedikit (biar smooth)
                // audio.volume = 0.5; 
            }

            setTimeout(() => {
                window.location.href = nextPageUrl;
            }, 1500);
        });
    }
})();