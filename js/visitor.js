
    const binId = '681892908561e97a500e23e3'; // BIN ID
    const apiKey = '$2a$10$i1l81AJctANJasEfWHI72O2KAqNQ0tDEwmTpjvZfHN2jePuCCtYuW'; // API Key

    // التحقق مما إذا زار المستخدم الموقع من قبل في هذه الجلسة
    const hasVisited = sessionStorage.getItem('hasVisited');
sessionStorage.setItem('hasVisited', 'true');

    function incrementCounter() {
      fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        method: 'GET',
        headers: { 'X-Master-Key': apiKey }
      })
      .then(res => res.json())
      .then(data => {
        const newCount = data.record.visits + 1;
        return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
          },
          body: JSON.stringify({ visits: newCount })
        });
      })
      .then(() => {
        console.log("تم تحديث عدد الزوار");
        localStorage.setItem('hasVisited', 'true'); // وضع علامة أن الزائر قد زار
      })
      .catch(err => console.error("فشل في تحديث العدد", err));
    }

    function fetchCounter() {
      fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        method: 'GET',
        headers: { 'X-Master-Key': apiKey }
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("counter").innerText = data.record.visits + " visitor";
      })
      .catch(err => {
        console.error("فشل في جلب البيانات:", err);
        document.getElementById("counter").innerText = "فشل تحميل عدد الزائرين";
      });
    }

    // أول استدعاء لجلب العدد الحالي
    fetchCounter();

    // تحديث العداد كل ثانية
    setInterval(fetchCounter, 1000);

    // زيادة العداد فقط إذا لم يسبق للمستخدم الزيارة في هذه الجلسة
    if (!hasVisited) {
      incrementCounter();
    }